
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUsageData } from "@/hooks/useUsageData";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface SubscriptionProtectedRouteProps {
  redirectTo?: string;
}

export const SubscriptionProtectedRoute = ({ redirectTo = "/subscribe" }: SubscriptionProtectedRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { subscription, loading: subscriptionLoading } = useUsageData();
  const { toast } = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  // Use useEffect to handle the toast and redirect logic
  useEffect(() => {
    // Only check and potentially show toast when both auth and subscription data are loaded
    if (!authLoading && !subscriptionLoading) {
      // If user is logged in but doesn't have an active subscription
      if (user && !subscription?.is_active) {
        toast({
          title: "Assinatura necessária",
          description: "Você precisa ter uma assinatura ativa para acessar esta funcionalidade.",
          variant: "destructive",
        });
        setShouldRedirect(true);
      }
    }
  }, [user, subscription, authLoading, subscriptionLoading, toast]);
  
  // Show loading state while checking auth and subscription
  if (authLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If we determined earlier that we need to redirect
  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated and has an active subscription
  return <Outlet />;
};
