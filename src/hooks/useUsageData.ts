
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
    console.log('[useUsageData] Iniciando carregamento de dados...');
    if (!user) {
      console.log('[useUsageData] Nenhum usuário encontrado, interrompendo carregamento');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Load subscription data
      console.log('[useUsageData] Buscando dados de assinatura para o usuário:', user.id);
      const subscriptionData = await fetchSubscriptionData(user.id);
      console.log('[useUsageData] Dados de assinatura:', subscriptionData);
      
      if (subscriptionData) {
        setSubscription(subscriptionData);

        // Load usage data with modified fetchUsageData that will handle null
        console.log('[useUsageData] Buscando dados de uso para o usuário:', user.id);
        const usageData = await fetchUsageData(user.id);
        console.log('[useUsageData] Dados de uso:', usageData);
        // Always set usage data - if null is returned, we'll use a default object with zeros
        setUsage(usageData || createDefaultUsage(user.id));

        // Load plan limits
        console.log('[useUsageData] Buscando limites para o plano:', subscriptionData.plan_type);
        const planLimitsData = await fetchPlanLimits(subscriptionData.plan_type);
        console.log('[useUsageData] Limites do plano:', planLimitsData);
        if (planLimitsData) {
          setPlanLimits(planLimitsData);
        } else {
          console.error("[useUsageData] Erro: Não foi possível carregar os limites do plano");
          setError("Não foi possível carregar os limites do plano");
        }
      } else {
        // Se não tem assinatura, o usuário não deve ter limites disponíveis
        console.warn('[useUsageData] Assinatura não encontrada. Sem limites carregados.');
        setPlanLimits(null);
        
        // Ensure we have usage data even without subscription
        console.log('[useUsageData] Buscando dados de uso sem assinatura para o usuário:', user.id);
        const usageData = await fetchUsageData(user.id);
        console.log('[useUsageData] Dados de uso (sem assinatura):', usageData);
        setUsage(usageData || createDefaultUsage(user.id));
      }
    } catch (err) {
      console.error('[useUsageData] Erro ao carregar dados:', err);
      setError("Erro ao carregar dados de uso e assinatura");
      // Set default usage data to prevent UI errors even if there was an error
      console.log('[useUsageData] Criando dados de uso padrão após erro');
      setUsage(createDefaultUsage(user.id));
    } finally {
      console.log('[useUsageData] Carregamento de dados finalizado');
      setLoading(false);
    }
  }, [user]);

  // Create a default usage object with zero counts
  const createDefaultUsage = (userId: string): Usage => {
    console.log('[useUsageData] Criando objeto de uso padrão para', userId);
    return {
      id: 'default',
      user_id: userId,
      keyword_count: 0,
      market_research_count: 0,
      search_funnel_count: 0,
      seo_text_count: 0,
      topic_research_count: 0,
      metadata_generation_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  // Load data on component mount and when user changes
  useEffect(() => {
    if (user) {
      console.log('[useUsageData] Usuário detectado, iniciando carregamento de dados');
      loadData();
    } else {
      console.log('[useUsageData] Nenhum usuário detectado no useEffect');
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
