
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

  // Function to load all usage data
  const loadData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
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
        }
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
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
    reload: loadData
  };
}

// Re-export the type definitions for backward compatibility
export type { Usage, PlanLimit, Subscription } from '@/types/usage';
