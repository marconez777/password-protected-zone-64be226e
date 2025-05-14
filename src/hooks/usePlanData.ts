
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function loadPlanData() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('plan_type, is_active, current_period_end')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching plan data:', error);
          setError('Failed to load plan data');
          setPlanData(null);
        } else {
          setPlanData(data);
        }
      } catch (err) {
        console.error('Unexpected error loading plan data:', err);
        setError('An unexpected error occurred');
        setPlanData(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlanData();
  }, [user]);

  return {
    planData,
    isLoading,
    error
  };
}
