
import { SubscriptionStatus } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";

export const displayUsageNotifications = (
  status: SubscriptionStatus,
  notificationState: { has75PercentNotification: boolean; has90PercentNotification: boolean },
  toast: ReturnType<typeof useToast>["toast"],
  setHas75PercentNotification: (value: boolean) => void,
  setHas90PercentNotification: (value: boolean) => void
) => {
  const usagePercentage = (status.usage / status.limit) * 100;

  if (usagePercentage >= 75 && usagePercentage < 90 && status.remainingUses > 0 && !notificationState.has75PercentNotification) {
    toast({
      title: "Aviso de uso",
      description: `Você já utilizou 75% do seu limite. Restam ${status.remainingUses} requisições.`,
      variant: "default"
    });
    setHas75PercentNotification(true);
  } else if (usagePercentage >= 90 && status.remainingUses > 0 && !notificationState.has90PercentNotification) {
    toast({
      title: "Aviso crítico",
      description: `Atenção! Você está com apenas ${status.remainingUses} requisições restantes!`,
      variant: "destructive"
    });
    setHas90PercentNotification(true);
  }
};

export const displayExpiryNotification = (
  status: SubscriptionStatus,
  toast: ReturnType<typeof useToast>["toast"]
) => {
  if (status.active && status.endsAt) {
    const expiryDate = new Date(status.endsAt);
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
};

export const handleUsageIncrement = (
  status: SubscriptionStatus,
  notificationState: { has75PercentNotification: boolean; has90PercentNotification: boolean },
  toast: ReturnType<typeof useToast>["toast"]
) => {
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
  } else if (newUsagePercentage >= 90 && !notificationState.has90PercentNotification) {
    toast({
      title: "Aviso importante",
      description: `Você já utilizou 90% do seu limite de requisições.`,
      variant: "destructive"
    });
    return true;
  } else if (newUsagePercentage >= 75 && !notificationState.has75PercentNotification) {
    toast({
      title: "Aviso",
      description: `Você já utilizou 75% do seu limite de requisições.`,
      variant: "default"
    });
    return true;
  }
  
  return false;
};
