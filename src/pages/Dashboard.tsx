import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUsageData } from "@/hooks/useUsageData";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { ResourceUsageCard } from "@/components/dashboard/resource-usage/ResourceUsageCard";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { 
    subscription, 
    usage, 
    planLimits, 
    loading,
    reload 
  } = useUsageData();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);
  
  // Separate effect to reload data - ensuring it runs when the component mounts
  // and isn't skipped due to early return in the previous effect
  useEffect(() => {
    if (session) {
      // Reload data when the dashboard page is shown
      reload();
    }
  }, [session, reload]);

  // Add an interval to periodically refresh usage data while dashboard is open
  useEffect(() => {
    // Skip if not authenticated
    if (!session) return;
    
    // Periodic refresh every 30 seconds to keep data current
    const intervalId = setInterval(() => {
      reload();
    }, 30000); // 30 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [session, reload]);

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
