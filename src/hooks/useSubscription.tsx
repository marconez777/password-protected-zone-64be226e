
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionStatus, SubscriptionNotificationState } from '@/types/subscription';

export type { SubscriptionStatus } from '@/types/subscription';

export const useSubscription = () => {
  const { user, refreshSession } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<SubscriptionStatus>({
    active: true,
    usage: 0,
    remainingUses: 80, // Start with full 80 requests
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
      
      // Get usage data for the user
      const { data, error } = await supabase
        .from("user_usage")
        .select("total_usage")
        .eq("user_id", user.id)
        .single();
      
      if (error) {
        console.error('Error checking usage:', error);
        toast({
          title: "Erro de verificação",
          description: "Não foi possível verificar seu uso atual.",
          variant: "destructive"
        });
        
        setStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      // Calculate usage and remaining
      const usage = data?.total_usage || 0;
      const remainingUses = Math.max(0, 80 - usage);
      
      // Set status
      const updatedStatus: SubscriptionStatus = {
        active: true,
        usage: usage,
        remainingUses: remainingUses,
        limit: 80, 
        isLoading: false
      };
      
      setStatus(updatedStatus);

      // Show notifications based on usage percentage
      const usagePercentage = (usage / 80) * 100;
      
      // 75% warning
      if (usagePercentage >= 75 && !notificationState.has75PercentNotification) {
        toast({
          title: "Aviso de uso",
          description: `Você já utilizou 75% do seu limite de requisições (${remainingUses} restantes)`,
          variant: "destructive"
        });
        setNotificationState(prev => ({ ...prev, has75PercentNotification: true }));
      }
      
      // 90% critical warning
      if (usagePercentage >= 90 && !notificationState.has90PercentNotification) {
        toast({
          title: "Alerta crítico de uso",
          description: `Você já utilizou 90% do seu limite de requisições (${remainingUses} restantes)`,
          variant: "destructive" 
        });
        setNotificationState(prev => ({ ...prev, has90PercentNotification: true }));
      }
      
    } catch (error) {
      console.error('Erro ao verificar uso:', error);
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
          description: "Você atingiu o limite de 80 requisições.",
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
      
      // Update notification states based on new percentage
      const newUsagePercentage = ((status.usage + 1) / status.limit) * 100;
      
      if (newUsagePercentage >= 90 && !notificationState.has90PercentNotification) {
        toast({
          title: "Alerta crítico de uso",
          description: `Você está com poucas requisições restantes (${status.remainingUses - 1})!`,
          variant: "destructive"
        });
        setNotificationState(prev => ({ ...prev, has90PercentNotification: true }));
      }
      else if (newUsagePercentage >= 75 && !notificationState.has75PercentNotification) {
        toast({
          title: "Aviso de uso",
          description: `Você já utilizou mais de 75% das suas requisições (${status.remainingUses - 1} restantes)`,
          variant: "destructive"
        });
        setNotificationState(prev => ({ ...prev, has75PercentNotification: true }));
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao incrementar uso:', error);
      return false;
    }
  };

  useEffect(() => {
    checkSubscription();
    
    // Check usage every 10 minutes or when user changes
    const interval = setInterval(checkSubscription, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return {
    ...status,
    checkSubscription,
    incrementUsage
  };
};
