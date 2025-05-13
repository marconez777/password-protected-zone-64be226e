
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// Types for usage data
export interface Usage {
  id: string;
  user_id: string;
  keyword_count: number;
  market_research_count: number;
  search_funnel_count: number;
  seo_text_count: number;
  topic_research_count: number;
  metadata_generation_count: number;
  created_at: string;
  updated_at: string;
}

export interface PlanLimit {
  id: string;
  plan_type: 'solo' | 'discovery' | 'escala';
  keyword_limit: number | null;
  market_research_limit: number | null;
  search_funnel_limit: number | null;
  seo_text_limit: number | null;
  topic_research_limit: number | null;
  metadata_generation_limit: number | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  is_active: boolean;
  plan_type: 'solo' | 'discovery' | 'escala';
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

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
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        console.error("Erro ao carregar assinatura:", subscriptionError);
        return;
      }

      if (subscriptionData) {
        setSubscription(subscriptionData);

        // Load usage data
        const { data: usageData, error: usageError } = await supabase
          .from("user_usage")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (usageError && usageError.code !== 'PGRST116') {
          console.error("Erro ao carregar dados de uso:", usageError);
        } else if (usageData) {
          setUsage(usageData);
        }

        // Load plan limits
        const { data: planLimitsData, error: planLimitsError } = await supabase
          .from("plan_limits")
          .select("*")
          .eq("plan_type", subscriptionData.plan_type)
          .single();

        if (planLimitsError) {
          console.error("Erro ao carregar limites do plano:", planLimitsError);
        } else {
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
