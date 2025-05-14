
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionStatus, SubscriptionNotificationState } from '@/types/subscription';
import { displayUsageNotifications, displayExpiryNotification, handleUsageIncrement } from '@/utils/subscriptionUtils';

export type { SubscriptionStatus } from '@/types/subscription';

export const useSubscription = () => {
  const { user, refreshSession } = useAuth();
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
      // First ensure we have a valid session by refreshing it
      await refreshSession();
      
      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      
      if (!accessToken) {
        console.error('No access token available');
        setStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Definir cabeçalhos CORS para todas as solicitações
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      };

      // Usar supabase.functions.invoke para chamar a função Edge
      const { data, error } = await supabase.functions.invoke('mercado-pago/subscription-status', requestOptions);
      
      if (error) {
        console.error('Erro ao verificar assinatura:', error);
        toast({
          title: "Erro de verificação",
          description: "Não foi possível verificar seu status de assinatura. Tente novamente após relogar.",
          variant: "destructive"
        });
        setStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      // Se chegou até aqui, temos uma resposta válida da função Edge
      const updatedStatus: SubscriptionStatus = {
        active: data.active,
        endsAt: data.endsAt,
        planType: 'mensal', // Simplificado para um único plano
        usage: data.usage,
        remainingUses: data.remainingUses,
        limit: 80, // Limite fixo para todos os usuários
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
      
      // Atualize a sessão para garantir que tenhamos um token válido
      await refreshSession();
      
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
