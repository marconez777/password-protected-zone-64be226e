
import { SearchFunnelForm } from "@/components/SearchFunnelForm";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function SearchFunnel() {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <SearchFunnelForm />;
}
