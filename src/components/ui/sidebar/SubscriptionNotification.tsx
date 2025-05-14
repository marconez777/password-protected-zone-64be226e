
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { Link } from 'react-router-dom';

export const SubscriptionNotification = () => {
  const { remainingUses, limit } = useSubscription();
  
  // Calculate percentage of usage
  const usagePercentage = limit > 0 ? ((limit - remainingUses) / limit) * 100 : 0;
  
  return (
    <div className="px-3 py-2">
      {/* Usage warning */}
      {usagePercentage >= 75 && (
        <Link 
          to="/dashboard" 
          className={`mb-2 p-2 rounded-md flex items-start text-sm ${
            usagePercentage >= 90 
              ? 'bg-red-50 text-red-800 border border-red-200' 
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <AlertCircle className={`h-4 w-4 mr-2 mt-0.5 flex-shrink-0 ${
            usagePercentage >= 90 ? 'text-red-500' : 'text-amber-500'
          }`} />
          <div>
            <p className="font-medium">
              {usagePercentage >= 90 
                ? 'Alerta crítico' 
                : 'Alerta de uso'}
            </p>
            <p className="text-xs mt-0.5">
              {usagePercentage >= 90 
                ? `Apenas ${remainingUses} requisições restantes!` 
                : `${remainingUses} de ${limit} requisições restantes`}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
