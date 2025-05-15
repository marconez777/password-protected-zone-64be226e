
import { useState } from 'react';

// This hook is maintained for backward compatibility
// No actual subscription functionality remains
export const useSubscription = () => {
  const [isLoading] = useState(false);
  
  // Empty functions that always succeed
  const checkSubscription = async () => {
    return true;
  };

  const incrementUsage = async () => {
    return true;
  };

  // Return mock values to avoid breaking existing code
  return {
    isLoading,
    checkSubscription,
    incrementUsage,
    active: true,
    remainingUses: 999,
    limit: 1000
  };
};
