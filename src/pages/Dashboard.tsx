
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUsageData } from "@/hooks/useUsageData";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { ResourceUsageCard } from "@/components/dashboard/ResourceUsageCard";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { 
    subscription, 
    usage, 
    planLimits, 
    loading 
  } = useUsageData();

  useEffect(() => {
    // Se não autenticado, redirecionar para login
    if (!session) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      title="Dashboard" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <SubscriptionCard 
        subscription={subscription}
        userName={user?.user_metadata?.full_name || "Usuário"} 
      />
      
      <ResourceUsageCard 
        usage={usage} 
        planLimits={planLimits} 
      />
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
