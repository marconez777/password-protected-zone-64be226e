
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { fetchSubscriptionData } from '@/utils/fetchSubscriptionData';
import { fetchUsageData } from '@/utils/fetchUsageData';
import { fetchPlanLimits } from '@/utils/fetchPlanLimits';
import { Usage, PlanLimit, Subscription } from '@/types/usage';
import { useToast } from '@/components/ui/use-toast';

interface PlanContextValue {
  subscription: Subscription | null;
  usage: Usage | null;
  planLimits: PlanLimit | null;
  loading: boolean;
  reload: () => Promise<void>;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [planLimits, setPlanLimits] = useState<PlanLimit | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    console.log('PlanContext - Iniciando carregamento de dados');
    if (!user) {
      console.log('PlanContext - Sem usuário, interrompendo carregamento');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // 1. Carregar dados de assinatura
      console.log('PlanContext - Carregando assinatura para:', user.id);
      const sub = await fetchSubscriptionData(user.id);
      console.log('PlanContext - Assinatura carregada:', sub);
      setSubscription(sub);

      // 2. Carregar dados de uso
      console.log('PlanContext - Carregando dados de uso');
      const usageData = await fetchUsageData(user.id);
      console.log('PlanContext - Dados de uso carregados:', usageData);
      
      // Usar dados padrão se não encontrar
      if (!usageData) {
        console.log('PlanContext - Criando dados de uso padrão');
        setUsage({
          id: 'default',
          user_id: user.id,
          keyword_count: 0,
          market_research_count: 0,
          search_funnel_count: 0,
          seo_text_count: 0,
          topic_research_count: 0,
          metadata_generation_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } else {
        setUsage(usageData);
      }

      // 3. Carregar limites do plano
      if (sub?.plan_type) {
        console.log('PlanContext - Carregando limites para plano:', sub.plan_type);
        const limits = await fetchPlanLimits(sub.plan_type);
        console.log('PlanContext - Limites carregados:', limits);
        setPlanLimits(limits);
      } else {
        console.log('PlanContext - Sem plano definido, sem limites para carregar');
        setPlanLimits(null);
      }
    } catch (error) {
      console.error('PlanContext - Erro ao carregar dados:', error);
      toast({
        title: "Erro ao carregar dados do plano",
        description: "Ocorreu um erro ao carregar os dados do seu plano. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      console.log('PlanContext - Carregamento finalizado');
      setLoading(false);
    }
  }, [user, toast]);

  // Carregar dados quando o usuário muda
  useEffect(() => {
    if (user) {
      console.log('PlanContext - Usuário detectado, carregando dados...');
      loadData();
    } else {
      console.log('PlanContext - Nenhum usuário detectado');
      setLoading(false);
    }
  }, [user, loadData]);

  return (
    <PlanContext.Provider value={{ 
      subscription, 
      usage, 
      planLimits, 
      loading, 
      reload: loadData 
    }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlanContext deve ser usado dentro de um <PlanProvider>');
  }
  return context;
};
