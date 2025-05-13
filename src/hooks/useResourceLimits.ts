import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Resource types that match backend definitions
export type ResourceType = 
  | 'market_target'
  | 'market_research'
  | 'search_funnel'
  | 'keyword'
  | 'seo_text'
  | 'topic_research'
  | 'metadata_generation'
  | 'texto_seo_lp' 
  | 'texto_seo_produto'; // Added this new resource type

interface UseResourceLimitsReturn {
  checkAndIncrementResource: (resourceType: ResourceType) => Promise<boolean>;
  isChecking: boolean;
}

/**
 * Hook to manage resource usage limits based on the user's subscription plan
 */
export function useResourceLimits(): UseResourceLimitsReturn {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  /**
   * Checks if the user has exceeded their limit and increments usage if not
   * @param resourceType The type of resource being used
   * @returns boolean indicating if the operation can proceed (true) or was blocked (false)
   */
  const checkAndIncrementResource = async (resourceType: ResourceType): Promise<boolean> => {
    setIsChecking(true);
    
    try {
      // First check if the user has exceeded their limit
      const { data: hasExceeded, error: checkError } = await supabase
        .rpc('user_has_exceeded_limit', { resource_type: resourceType });

      if (checkError) {
        console.error('Error checking resource limit:', checkError);
        toast({
          title: "Erro ao verificar limite",
          description: "Não foi possível verificar o limite do recurso. Tente novamente.",
          variant: "destructive",
        });
        return false;
      }

      // If the user has exceeded their limit, show a message and return false
      if (hasExceeded) {
        toast({
          title: "Limite excedido",
          description: "Você atingiu o limite de uso para este recurso no seu plano atual. Faça upgrade para continuar.",
          variant: "destructive",
        });
        return false;
      }

      // If within limits, increment the usage
      const { data: incrementSuccess, error: incrementError } = await supabase
        .rpc('increment_user_usage', { resource_type: resourceType });

      if (incrementError) {
        console.error('Error incrementing resource usage:', incrementError);
        toast({
          title: "Erro ao atualizar uso",
          description: "Não foi possível registrar o uso do recurso. Tente novamente.",
          variant: "destructive",
        });
        return false;
      }

      // If successful, return true
      return true;
    } catch (error) {
      console.error('Unexpected error in resource limits check:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
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
