
import { useEffect, useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useUsageTracking = (redirectOnLimitExceeded = true) => {
  const { 
    active, 
    isLoading, 
    remainingUses, 
    limit, 
    usage, 
    incrementUsage 
  } = useSubscription();
  
  const [isTrackingUsage, setIsTrackingUsage] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const trackUsage = async () => {
    if (isTrackingUsage) return false;
    
    setIsTrackingUsage(true);
    
    try {
      // Check if user can proceed
      if (!active) {
        toast({
          title: "Assinatura inativa",
          description: "Você precisa ter uma assinatura ativa para usar este recurso.",
          variant: "destructive"
        });
        
        if (redirectOnLimitExceeded) {
          navigate('/subscribe');
        }
        
        return false;
      }
      
      if (remainingUses <= 0) {
        toast({
          title: "Limite atingido",
          description: `Você já utilizou todas as ${limit} requisições disponíveis.`,
          variant: "destructive"
        });
        
        if (redirectOnLimitExceeded) {
          navigate('/usage-limit');
        }
        
        return false;
      }
      
      // Increment usage counter
      const success = await incrementUsage();
      return success;
      
    } catch (error) {
      console.error('Erro ao rastrear uso:', error);
      return false;
    } finally {
      setIsTrackingUsage(false);
    }
  };
  
  return {
    canUseResource: active && remainingUses > 0 && !isLoading,
    isLoading,
    remainingUses,
    usagePercentage: limit > 0 ? (usage / limit) * 100 : 0,
    trackUsage,
    isTrackingUsage
  };
};
