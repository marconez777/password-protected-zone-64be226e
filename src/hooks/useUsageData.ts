
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Usage, PlanLimit, Subscription } from '@/types/usage';
import { fetchSubscriptionData } from '@/utils/fetchSubscriptionData';
import { fetchUsageData } from '@/utils/fetchUsageData';
import { fetchPlanLimits } from '@/utils/fetchPlanLimits';

/**
 * Hook to fetch and manage user subscription and usage data
 */
export function useUsageData() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [planLimits, setPlanLimits] = useState<PlanLimit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to load all usage data
  const loadData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Load subscription data
      const subscriptionData = await fetchSubscriptionData(user.id);
      
      if (subscriptionData) {
        setSubscription(subscriptionData);

        // Load usage data
        const usageData = await fetchUsageData(user.id);
        if (usageData) {
          setUsage(usageData);
        }

        // Load plan limits
        const planLimitsData = await fetchPlanLimits(subscriptionData.plan_type);
        if (planLimitsData) {
          setPlanLimits(planLimitsData);
        } else {
          console.error("Erro: Não foi possível carregar os limites do plano");
          setError("Não foi possível carregar os limites do plano");
        }
      } else {
        // Se não tem assinatura, considerar plano "solo" como padrão
        const defaultPlanLimits = await fetchPlanLimits('solo');
        if (defaultPlanLimits) {
          setPlanLimits(defaultPlanLimits);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados de uso e assinatura");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load data on component mount and when user changes
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  return {
    subscription,
    usage,
    planLimits,
    loading,
    error,
    reload: loadData
  };
}

// Re-export the type definitions for backward compatibility
export type { Usage, PlanLimit, Subscription } from '@/types/usage';
