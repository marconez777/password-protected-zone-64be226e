
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

type PlanData = {
  plan_type: 'solo' | 'discovery' | 'escala';
  is_active: boolean;
  current_period_end: string | null;
};

/**
 * Hook to fetch and provide user's plan data
 * @returns Object containing the user's plan data
 */
export function usePlanData() {
  const { user } = useAuth();
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlanData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      // Limpar cache forçando nova consulta
      setIsLoading(true);
      
      // Adicionar timestamp para evitar cache no Supabase
      const timestamp = new Date().getTime();
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan_type, is_active, current_period_end')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .single()
        .then(result => {
          console.log(`[usePlanData] Dados do plano carregados (timestamp: ${timestamp})`, result);
          return result;
        });

      if (error) {
        console.error('[usePlanData] Error fetching plan data:', error);
        setError('Failed to load plan data');
        setPlanData(null);
      } else {
        console.log('[usePlanData] Plan data loaded successfully:', data);
        setPlanData(data);
        setError(null);
      }
    } catch (err) {
      console.error('[usePlanData] Unexpected error loading plan data:', err);
      setError('An unexpected error occurred');
      setPlanData(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Carregar dados quando o usuário muda
  useEffect(() => {
    if (user) {
      console.log('[usePlanData] Usuário detectado, carregando dados...');
      loadPlanData();
    } else {
      console.log('[usePlanData] Nenhum usuário detectado');
      setIsLoading(false);
    }
  }, [user, loadPlanData]);

  return {
    planData,
    isLoading,
    error,
    reload: loadPlanData
  };
}
