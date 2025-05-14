
import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { Link } from 'react-router-dom';

export const SubscriptionNotification = () => {
  const { active, endsAt, remainingUses, limit } = useSubscription();
  
  // Calculate percentage of usage
  const usagePercentage = limit > 0 ? ((limit - remainingUses) / limit) * 100 : 0;
  
  // Calculate days until expiry
  const daysUntilExpiry = endsAt ? 
    Math.ceil((new Date(endsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
    null;
  
  if (!active) return null;
  
  return (
    <div className="px-3 py-2">
      {/* Usage warning */}
      {usagePercentage >= 75 && (
        <Link 
          to="/subscription-management" 
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
      
      {/* Expiry warning */}
      {daysUntilExpiry !== null && daysUntilExpiry <= 7 && (
        <Link 
          to="/subscription-management" 
          className="p-2 rounded-md flex items-start text-sm bg-blue-50 text-blue-800 border border-blue-200"
        >
          <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
          <div>
            <p className="font-medium">Assinatura a vencer</p>
            <p className="text-xs mt-0.5">
              {daysUntilExpiry === 0 
                ? 'Sua assinatura vence hoje!' 
                : `Expira em ${daysUntilExpiry} ${daysUntilExpiry === 1 ? 'dia' : 'dias'}`}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
