
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { ActiveSubscriptionCard } from "@/components/subscription/ActiveSubscriptionCard";
import { InactiveSubscriptionCard } from "@/components/subscription/InactiveSubscriptionCard";

const SubscriptionManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    active,
    endsAt,
    remainingUses,
    limit,
    usage,
    usagePercentage,
    isLoading,
    error,
    handleRenew,
    handleRefreshStatus
  } = useSubscriptionManagement();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Gerenciar Assinatura
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Controle sua assinatura e limite de uso
          </p>
        </div>

        {active ? (
          <ActiveSubscriptionCard 
            usage={usage}
            limit={limit}
            remainingUses={remainingUses}
            endsAt={endsAt}
            usagePercentage={usagePercentage}
            error={error}
            isLoading={isLoading}
            onRenew={handleRenew}
            onRefreshStatus={handleRefreshStatus}
          />
        ) : (
          <InactiveSubscriptionCard 
            error={error}
            isLoading={isLoading}
            onSubscribe={handleRenew}
          />
        )}
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
