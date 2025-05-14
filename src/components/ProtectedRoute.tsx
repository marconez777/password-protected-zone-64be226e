
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isLoading: subLoading, remainingUses, checkSubscription } = useSubscription();
  const [verifyingAccess, setVerifyingAccess] = useState(false);
  const { toast } = useToast();
  
  // Server-side access verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (!user || authLoading || subLoading) return;
      
      setVerifyingAccess(true);
      try {
        // Direct check of user usage to verify access rights
        const { data, error } = await supabase
          .from("user_usage")
          .select("total_usage")
          .eq("user_id", user.id)
          .single();
        
        if (error) {
          console.error("Failed to verify access:", error);
          toast({
            title: "Erro de verificação",
            description: "Não foi possível verificar seu acesso.",
            variant: "destructive"
          });
          return;
        }
        
        // If usage data shows irregular pattern, refresh subscription status
        // Check if total_usage is divisible by 10 to determine if refresh is needed
        const needsRefresh = data && data.total_usage > 0 && data.total_usage % 10 === 0;
        if (needsRefresh) {
          await checkSubscription();
        }
      } catch (error) {
        console.error("Access verification error:", error);
      } finally {
        setVerifyingAccess(false);
      }
    };
    
    verifyAccess();
  }, [user, authLoading, subLoading]);
  
  // Mostrar loading enquanto verifica autenticação e uso
  if (authLoading || subLoading || verifyingAccess) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Verificando acesso...</span>
    </div>;
  }
  
  // Redirecionar para login se não autenticado
  if (!user) {
    console.log("ProtectedRoute: Redirecionando para login - usuário não autenticado");
    return <Navigate to={redirectTo} replace />;
  }
  
  // Redirecionar se o limite de uso foi atingido
  if (remainingUses <= 0) {
    console.log("ProtectedRoute: Redirecionando para limite - limite atingido");
    return <Navigate to="/usage-limit" replace />;
  }
  
  // Usuário autenticado e com requisições disponíveis, permitir acesso
  return <Outlet />;
};
