
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { fetchSubscriptionData } from '@/utils/fetchSubscriptionData';
import { fetchUsageData } from '@/utils/fetchUsageData';
import { fetchPlanLimits } from '@/utils/fetchPlanLimits';
import { Usage, PlanLimit, Subscription } from '@/types/usage';

interface PlanContextValue {
  subscription: Subscription | null;
  usage: Usage | null;
  planLimits: PlanLimit | null;
  loading: boolean;
  reload: () => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [planLimits, setPlanLimits] = useState<PlanLimit | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    const sub = await fetchSubscriptionData(user.id);
    setSubscription(sub);

    const usageData = await fetchUsageData(user.id);
    setUsage(usageData);

    if (sub?.plan_type) {
      const limits = await fetchPlanLimits(sub.plan_type);
      setPlanLimits(limits);
    } else {
      setPlanLimits(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <PlanContext.Provider value={{ subscription, usage, planLimits, loading, reload: loadData }}>
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
