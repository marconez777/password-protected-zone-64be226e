
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

      // Mostrar notificações baseadas no uso
      if (data.remainingUses <= 10 && data.remainingUses > 0) {
        toast({
          title: "Aviso de limite",
          description: `Você tem apenas ${data.remainingUses} requisições restantes no seu plano.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const incrementUsage = async () => {
    if (!user) return false;
    
    try {
      // Verificar limite antes de incrementar
      if (status.remainingUses <= 0) {
        toast({
          title: "Limite de uso atingido",
          description: "Você atingiu o limite de 80 requisições do seu plano.",
          variant: "destructive"
        });
        return false;
      }
      
      // Chamar função para incrementar o uso
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
      
      // Atualiza o estado local
      setStatus(prev => ({
        ...prev,
        usage: prev.usage + 1,
        remainingUses: Math.max(0, prev.remainingUses - 1)
      }));
      
      // Notificações de limite de uso
      const newRemainingUses = status.remainingUses - 1;
      
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
      } else if (newRemainingUses <= 10) {
        toast({
          title: "Aviso importante",
          description: `Você tem apenas ${newRemainingUses} requisições restantes.`,
          variant: "destructive"
        });
      } else if (newRemainingUses <= 20) {
        toast({
          title: "Aviso",
          description: `Seu plano está com ${newRemainingUses} requisições restantes.`,
          variant: "destructive"
        });
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao incrementar uso:', error);
      return false;
    }
  };

  useEffect(() => {
    checkSubscription();
    
    // Verificar novamente a cada 10 minutos ou quando o usuário mudar
    const interval = setInterval(checkSubscription, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return {
    ...status,
    checkSubscription,
    incrementUsage
  };
};
