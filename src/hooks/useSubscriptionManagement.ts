
import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSubscriptionManagement = () => {
  const { active, endsAt, remainingUses, limit, checkSubscription, usage } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const usagePercentage = Math.floor((usage / limit) * 100);

  const handleRenew = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('mercado-pago/create-payment', {});

      if (error) {
        throw new Error(error.message || 'Erro ao criar pagamento');
      }

      if (data && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('Não foi possível obter o link de pagamento');
      }
    } catch (err: any) {
      console.error('Erro no checkout:', err);
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefreshStatus = async () => {
    setIsLoading(true);
    try {
      await checkSubscription();
      toast({
        title: "Status atualizado",
        description: "Informações da assinatura atualizadas com sucesso!",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da assinatura.",
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
