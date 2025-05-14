
// Hook for useResourceLimits with improved logic
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePlanData } from '@/hooks/usePlanData';

export type ResourceType = 
  | 'market_target'
  | 'market_research'
  | 'search_funnel'
  | 'keyword'
  | 'seo_text'
  | 'topic_research'
  | 'metadata_generation'
  | 'texto_seo_lp' 
  | 'texto_seo_produto'
  | 'texto_seo_blog'
  | 'pautas_blog';

// Corrected mapping for resource types
const RESOURCE_TYPE_MAPPING: Record<ResourceType, string> = {
  // Each resource should have its own unique mapping to avoid accounting issues
  'market_target': 'market_research',
  'market_research': 'market_research',
  'search_funnel': 'search_funnel',
  'keyword': 'keyword',
  'seo_text': 'seo_text',
  'topic_research': 'topic_research',
  'metadata_generation': 'metadata_generation',
  'texto_seo_lp': 'seo_text',
  'texto_seo_produto': 'seo_text', 
  'texto_seo_blog': 'seo_text',
  'pautas_blog': 'topic_research'
};

export function useResourceLimits() {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();
  const { planData, reload: reloadPlanData } = usePlanData();
  const navigate = useNavigate();
  
  /**
   * Recarrega os dados do plano do usuário antes de verificar o limite
   * para garantir que estamos usando dados atualizados
   */
  const refreshPlanData = async () => {
    try {
      await reloadPlanData();
    } catch (error) {
      console.error('Erro ao recarregar dados do plano:', error);
    }
  };
  
  /**
   * Only checks if a user has exceeded their resource limit without incrementing.
   * Use this for UI validation before attempting operations.
   */
  const checkResourceLimit = async (resourceType: ResourceType): Promise<boolean> => {
    console.log('=== CHECKING RESOURCE LIMIT ===');
    console.log('Resource Type:', resourceType);
    
    // Reload plan data to make sure we have the most recent data
    await refreshPlanData();
    
    console.log('Updated Plan Data:', planData);
    
    // Verify user has active plan
    if (!planData || !planData.is_active || !planData.plan_type) {
      console.log('No active plan, redirecting to subscribe');
      toast({
        title: "Plano necessário",
        description: "Você precisa de um plano ativo para usar este recurso.",
        variant: "destructive",
      });
      navigate('/subscribe');
      return false;
    }
    
    // Para planos escala, todos os recursos são ilimitados
    if (planData.plan_type === 'escala') {
      console.log('Plano Escala detectado - recursos ilimitados disponíveis');
      return true;
    }
    
    setIsChecking(true);
    
    try {
      // Map resource type correctly
      const mappedResourceType = RESOURCE_TYPE_MAPPING[resourceType] || resourceType;
      console.log('Mapped Resource Type:', mappedResourceType);
      
      // Check limit without incrementing
      const { data: hasExceeded, error: checkError } = await supabase
        .rpc('user_has_exceeded_limit', { 
          resource_type: mappedResourceType 
        });

      console.log('Limit check result:', { hasExceeded, checkError });
      
      if (checkError) {
        console.error('Error checking resource limit:', checkError);
        throw checkError;
      }

      if (hasExceeded) {
        toast({
          title: "Limite excedido",
          description: `Você atingiu o limite de uso para este recurso no seu plano ${planData.plan_type}.`,
          variant: "destructive",
        });
        return false;
      }

      console.log('Resource limit check successful - recurso disponível');
      return true;
      
    } catch (error) {
      console.error('Error in resource limits check:', error);
      toast({
        title: "Erro ao verificar limite",
        description: error.message || "Erro desconhecido ao verificar limite do recurso.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  /**
   * Increments the usage count for a resource type.
   * This should only be called AFTER the operation has successfully completed.
   */
  const incrementResourceUsage = async (resourceType: ResourceType): Promise<boolean> => {
    console.log('=== INCREMENTING RESOURCE USAGE ===');
    console.log('Resource Type:', resourceType);
    
    // Para planos escala, não precisamos incrementar pois é ilimitado
    if (planData?.plan_type === 'escala') {
      console.log('Plano Escala detectado - não é necessário incrementar');
      return true;
    }
    
    try {
      // Map resource type correctly
      const mappedResourceType = RESOURCE_TYPE_MAPPING[resourceType] || resourceType;
      
      // Increment usage
      const { error: incrementError } = await supabase
        .rpc('increment_user_usage', { 
          resource_type: mappedResourceType 
        });
      
      console.log('Increment result:', { incrementError });
      
      if (incrementError) {
        console.error('Error incrementing resource usage:', incrementError);
        throw incrementError;
      }

      return true;
    } catch (error) {
      console.error('Error incrementing resource usage:', error);
      return false;
    }
  };

  return {
    checkResourceLimit,
    incrementResourceUsage,
    isChecking
  };
}
