
import { useState } from 'react';

// Simplified usage tracking that doesn't actually track usage
export const useUsageTracking = () => {
  const [isTrackingUsage, setIsTrackingUsage] = useState(false);
  
  const trackUsage = async () => {
    if (isTrackingUsage) return false;
    
    setIsTrackingUsage(true);
    try {
      // Always returns success
      return true;
    } finally {
      setIsTrackingUsage(false);
    }
  };
  
  return {
    canUseResource: true,
    isLoading: false,
    trackUsage,
    isTrackingUsage
  };
};
