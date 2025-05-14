
import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

export const useSubscriptionManagement = () => {
  const { remainingUses, limit, usage, checkSubscription } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Calculate usage percentage
  const usagePercentage = limit > 0 ? Math.round(((limit - remainingUses) / limit) * 100) : 0;

  const handleRefreshStatus = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await checkSubscription();
      
      toast({
        title: "Status atualizado",
        description: "Seu status de uso foi atualizado.",
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
    remainingUses,
    limit,
    usage,
    usagePercentage,
    isLoading,
    error,
    handleRefreshStatus
  };
};
