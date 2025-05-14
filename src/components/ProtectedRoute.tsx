
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlanData } from "@/hooks/usePlanData";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";

interface ProtectedRouteProps {
  redirectTo?: string;
  requireSubscription?: boolean;
}

export const ProtectedRoute = ({ 
  redirectTo = "/login", 
  requireSubscription = false 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const { planData, isLoading: planLoading, error } = usePlanData();
  
  useEffect(() => {
    if (requireSubscription && user && planData && !planData.is_active) {
      toast.error("Você precisa de uma assinatura ativa para acessar esta página.");
    }
  }, [requireSubscription, user, planData]);

  // Show loading state when waiting for authentication or subscription data
  if (isLoading || (requireSubscription && planLoading)) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Carregando...</span>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    console.log("ProtectedRoute: Redirecionando para login - usuário não autenticado");
    return <Navigate to={redirectTo} replace />;
  }
  
  // Check if subscription is required but not active
  if (requireSubscription && (!planData || !planData.is_active)) {
    console.log("ProtectedRoute: Redirecionando para assinatura - plano inativo", {
      planData,
      requireSubscription
    });
    return <Navigate to="/subscribe" replace />;
  }

  console.log("ProtectedRoute: Acesso permitido", {
    planData,
    requireSubscription,
    isActive: planData?.is_active
  });
  
  return <Outlet />;
};
