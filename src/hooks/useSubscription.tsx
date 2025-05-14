
import { useState } from 'react';

export type { SubscriptionStatus } from '@/types/subscription';

export const useSubscription = () => {
  // Simplified state that only tracks if something is loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Simplified version that does nothing
  const checkSubscription = async () => {
    setIsLoading(false);
  };

  // Simplified version that always returns true
  const incrementUsage = async () => {
    return true;
  };

  return {
    isLoading,
    checkSubscription,
    incrementUsage
  };
};
