
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  
  // Show loading state when waiting for authentication
  if (isLoading) {
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
  
  // User is authenticated, allow access
  return <Outlet />;
};
