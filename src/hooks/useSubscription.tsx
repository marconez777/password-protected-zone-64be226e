
import { useState } from 'react';

// This is a simplified version that doesn't track subscriptions
// but maintains the interface for backward compatibility
export const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Empty functions that do nothing
  const checkSubscription = async () => {
    setIsLoading(false);
  };

  const incrementUsage = async () => {
    return true;
  };

  return {
    isLoading,
    checkSubscription,
    incrementUsage,
    active: true,
    remainingUses: 999,
    limit: 1000
  };
};
