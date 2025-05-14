// Hook corrigido para useResourceLimits
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

// Mapeamento correto dos tipos de recursos
const RESOURCE_TYPE_MAPPING: Record<ResourceType, string> = {
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
  const { planData } = usePlanData();
  const navigate = useNavigate();
  
  const checkAndIncrementResource = async (resourceType: ResourceType): Promise<boolean> => {
    console.log('=== CHECKING RESOURCE LIMIT ===');
    console.log('Resource Type:', resourceType);
    console.log('Plan Data:', planData);
    
    // Verificar se o usuário tem plano ativo
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
    
    setIsChecking(true);
    
    try {
      // Verificar sessão
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session.session) {
        console.error('Session error:', sessionError);
        throw new Error('Sessão inválida');
      }
      
      // Mapear o tipo de recurso corretamente
      const mappedResourceType = RESOURCE_TYPE_MAPPING[resourceType] || resourceType;
      console.log('Mapped Resource Type:', mappedResourceType);
      
      // Verificar limite
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

      // Incrementar uso
      const { error: incrementError } = await supabase
        .rpc('increment_user_usage', { 
          resource_type: mappedResourceType 
        });

      console.log('Increment result:', { incrementError });
      
      if (incrementError) {
        console.error('Error incrementing resource usage:', incrementError);
        throw incrementError;
      }

      console.log('Resource limit check successful');
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

  return {
    checkAndIncrementResource,
    isChecking
  };
}
