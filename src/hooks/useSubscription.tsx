
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionStatus {
  active: boolean;
  endsAt: string | null;
  planType: string | null;
  usage: number;
  remainingUses: number;
  limit: number;
  isLoading: boolean;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<SubscriptionStatus>({
    active: false,
    endsAt: null,
    planType: null,
    usage: 0,
    remainingUses: 0,
    limit: 80,
    isLoading: true
  });

  const checkSubscription = async () => {
    if (!user) {
      setStatus(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('mercado-pago/subscription-status');
      
      if (error) {
        console.error('Erro ao verificar assinatura:', error);
        setStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      setStatus({
        active: data.active,
        endsAt: data.endsAt,
        planType: data.planType,
        usage: data.usage,
        remainingUses: data.remainingUses,
        limit: data.limit,
        isLoading: false
      });

      // Display notifications based on usage thresholds
      const usagePercentage = (data.usage / data.limit) * 100;

      if (usagePercentage >= 75 && usagePercentage < 90 && data.remainingUses > 0) {
        toast({
          title: "Aviso de uso",
          description: `Você já utilizou 75% do seu limite. Restam ${data.remainingUses} requisições.`,
          variant: "default"
        });
      } else if (usagePercentage >= 90 && data.remainingUses > 0) {
        toast({
          title: "Aviso crítico",
          description: `Atenção! Você está com apenas ${data.remainingUses} requisições restantes!`,
          variant: "destructive"
        });
      }

      // Check if subscription is about to expire (less than 7 days)
      if (data.active && data.endsAt) {
        const expiryDate = new Date(data.endsAt);
        const currentDate = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
          toast({
            title: "Assinatura a vencer",
            description: `Sua assinatura irá expirar em ${daysUntilExpiry} ${daysUntilExpiry === 1 ? 'dia' : 'dias'}.`,
            variant: "default"
          });
        }
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const incrementUsage = async () => {
    if (!user) return false;
    
    try {
      // Check limit before incrementing
      if (status.remainingUses <= 0) {
        toast({
          title: "Limite de uso atingido",
          description: "Você atingiu o limite de 80 requisições do seu plano.",
          variant: "destructive"
        });
        return false;
      }
      
      // Call function to increment usage
      const { error } = await supabase.rpc('increment_global_usage');
      
      if (error) {
        console.error('Erro ao incrementar uso:', error);
        toast({
          title: "Erro",
          description: "Não foi possível registrar o uso do recurso.",
          variant: "destructive"
        });
        return false;
      }
      
      // Update local state
      setStatus(prev => ({
        ...prev,
        usage: prev.usage + 1,
        remainingUses: Math.max(0, prev.remainingUses - 1)
      }));
      
      // Update usage notifications
      const newRemainingUses = status.remainingUses - 1;
      const newUsagePercentage = ((status.usage + 1) / status.limit) * 100;
      
      if (newRemainingUses === 0) {
        toast({
          title: "Limite atingido",
          description: "Você utilizou todas as requisições disponíveis no seu plano.",
          variant: "destructive"
        });
      } else if (newRemainingUses <= 5) {
        toast({
          title: "Aviso crítico",
          description: `Atenção! Restam apenas ${newRemainingUses} requisições no seu plano.`,
          variant: "destructive"
        });
      } else if (newUsagePercentage >= 90 && !toast.has90PercentNotification) {
        toast({
          title: "Aviso importante",
          description: `Você já utilizou 90% do seu limite de requisições.`,
          variant: "destructive"
        });
        toast.has90PercentNotification = true;
      } else if (newUsagePercentage >= 75 && !toast.has75PercentNotification) {
        toast({
          title: "Aviso",
          description: `Você já utilizou 75% do seu limite de requisições.`,
          variant: "default"
        });
        toast.has75PercentNotification = true;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao incrementar uso:', error);
      return false;
    }
  };

  useEffect(() => {
    checkSubscription();
    
    // Check subscription status every 10 minutes or when user changes
    const interval = setInterval(checkSubscription, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return {
    ...status,
    checkSubscription,
    incrementUsage
  };
};
