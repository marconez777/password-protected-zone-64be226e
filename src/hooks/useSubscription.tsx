
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

  // Adding these properties to fix TypeScript errors in components that use this hook
  const active = true; // Always active since we removed subscription checks
  const remainingUses = 999; // Large number since we removed usage limits
  const limit = 1000; // Large number since we removed usage limits

  return {
    isLoading,
    checkSubscription,
    incrementUsage,
    active,
    remainingUses,
    limit
  };
};
