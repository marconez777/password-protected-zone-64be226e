import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { remainingUses } = useSubscription();

  useEffect(() => {
    // If user has no remaining uses, redirect to usage limit page
    // otherwise redirect to dashboard
    if (remainingUses <= 0) {
      navigate('/usage-limit');
    } else {
      navigate('/dashboard');
    }
  }, [remainingUses, navigate]);

  // This is just a placeholder as the component will redirect immediately
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Redirecionando...</span>
    </div>
  );
};

export default SubscriptionManagement;
