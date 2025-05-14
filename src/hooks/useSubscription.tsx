
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionStatus, SubscriptionNotificationState } from '@/types/subscription';
import { displayUsageNotifications, displayExpiryNotification, handleUsageIncrement } from '@/utils/subscriptionUtils';

export type { SubscriptionStatus } from '@/types/subscription';

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
  
  // Track notification states
  const [notificationState, setNotificationState] = useState<SubscriptionNotificationState>({
    has90PercentNotification: false,
    has75PercentNotification: false
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
      
      const updatedStatus: SubscriptionStatus = {
        active: data.active,
        endsAt: data.endsAt,
        planType: 'mensal', // Simplified to a single plan
        usage: data.usage,
        remainingUses: data.remainingUses,
        limit: 80, // Fixed limit for all users
        isLoading: false
      };
      
      setStatus(updatedStatus);

      // Display notifications based on subscription status
      displayUsageNotifications(
        updatedStatus,
        notificationState,
        toast,
        (value) => setNotificationState(prev => ({ ...prev, has75PercentNotification: value })),
        (value) => setNotificationState(prev => ({ ...prev, has90PercentNotification: value }))
      );
      
      // Check for subscription expiry
      displayExpiryNotification(updatedStatus, toast);
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
      
      // Handle notifications based on new usage
      const shouldUpdateNotifications = handleUsageIncrement(
        status,
        notificationState,
        toast
      );
      
      // Update notification states if needed
      if (shouldUpdateNotifications) {
        const newUsagePercentage = ((status.usage + 1) / status.limit) * 100;
        
        if (newUsagePercentage >= 90) {
          setNotificationState(prev => ({ ...prev, has90PercentNotification: true }));
        } else if (newUsagePercentage >= 75) {
          setNotificationState(prev => ({ ...prev, has75PercentNotification: true }));
        }
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
