
import { useState, useCallback } from 'react';
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
      
      // Determine plan type based on subscription or default to 'solo'
      const planType = subscriptionData?.is_active ? subscriptionData.plan_type : 'solo';
      
      if (subscriptionData) {
        setSubscription(subscriptionData);
      } else {
        // If no subscription, set default subscription data
        setSubscription({
          id: '',
          user_id: user.id,
          is_active: false,
          plan_type: 'solo',
          current_period_end: null,
          created_at: '',
          updated_at: ''
        });
      }

      // Always load usage data, even without active subscription
      const usageData = await fetchUsageData(user.id);
      if (usageData) {
        setUsage(usageData);
      } else {
        // If no usage data, set default empty usage
        setUsage({
          id: '',
          user_id: user.id,
          keyword_count: 0,
          market_research_count: 0,
          search_funnel_count: 0,
          seo_text_count: 0,
          topic_research_count: 0,
          metadata_generation_count: 0,
          created_at: '',
          updated_at: ''
        });
      }

      // Load plan limits based on determined plan type
      const planLimitsData = await fetchPlanLimits(planType);
      if (planLimitsData) {
        setPlanLimits(planLimitsData);
      } else {
        console.error(`Erro: Não foi possível carregar os limites do plano ${planType}`);
        setError("Não foi possível carregar os limites do plano");
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados de uso e assinatura");
    } finally {
      setLoading(false);
    }
  }, [user]);

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
