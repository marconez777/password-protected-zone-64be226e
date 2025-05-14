
import React, { useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { X } from 'lucide-react';

export const SubscriptionFloatingNotification = () => {
  const { remainingUses, limit } = useSubscription();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const usagePercentage = limit ? (limit - remainingUses) / limit * 100 : 0;
  const shouldDisplay = usagePercentage >= 75 && !isDismissed;
  
  useEffect(() => {
    if (shouldDisplay) {
      // Show after a small delay to avoid immediate display when page loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldDisplay]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-4 right-4 max-w-xs w-full z-50 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className={`p-3 ${usagePercentage >= 90 ? 'bg-red-50' : 'bg-amber-50'}`}>
        <div className="flex justify-between items-start">
          <h4 className={`font-medium ${usagePercentage >= 90 ? 'text-red-800' : 'text-amber-800'}`}>
            {usagePercentage >= 90 ? 'Uso crítico!' : 'Aviso de limite'}
          </h4>
          <button 
            onClick={() => setIsDismissed(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className={`text-sm mt-1 ${usagePercentage >= 90 ? 'text-red-600' : 'text-amber-600'}`}>
          {remainingUses} de {limit} requisições restantes
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full ${usagePercentage >= 90 ? 'bg-red-500' : 'bg-amber-500'}`}
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
