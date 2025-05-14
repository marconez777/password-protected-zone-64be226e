
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription, SubscriptionStatus } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useSubscriptionManagement = () => {
  const { active, endsAt, remainingUses, limit, usage, checkSubscription } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, refreshSession } = useAuth();
  const { toast } = useToast();

  // Calculate usage percentage
  const usagePercentage = limit > 0 ? Math.round(((limit - remainingUses) / limit) * 100) : 0;

  const handleRenew = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await refreshSession();
      
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      
      if (!accessToken) {
        throw new Error('No valid session found. Please log in again.');
      }
      
      // In production, you would redirect to Mercado Pago payment page
      const { data, error } = await supabase.functions.invoke('mercado-pago/subscription-status', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (error) {
        console.error('Erro ao verificar pagamento:', error);
        throw new Error('Erro ao processar pagamento. Por favor, tente novamente.');
      }
      
      // After payment is processed, refresh subscription status
      await checkSubscription();
      
      toast({
        title: "Assinatura ativada",
        description: "Sua assinatura foi renovada com sucesso!",
        variant: "default"
      });
    } catch (error) {
      console.error('Erro na renovação:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido ao renovar a assinatura');
      
      toast({
        title: "Erro na renovação",
        description: error instanceof Error ? error.message : 'Erro ao renovar sua assinatura',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await checkSubscription();
      
      toast({
        title: "Status atualizado",
        description: "Seu status de assinatura foi atualizado.",
        variant: "default"
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido ao atualizar status');
      
      toast({
        title: "Erro de atualização",
        description: error instanceof Error ? error.message : 'Erro ao atualizar status',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    active,
    endsAt,
    remainingUses,
    limit,
    usage,
    usagePercentage,
    isLoading,
    error,
    handleRenew,
    handleRefreshStatus
  };
};
