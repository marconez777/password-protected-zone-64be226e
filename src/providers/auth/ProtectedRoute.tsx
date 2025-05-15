
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isApproved, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - loading:", loading, "user:", !!user, "isApproved:", isApproved);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user || !isApproved) {
    console.log("Redirecionando para login - user:", !!user, "isApproved:", isApproved);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Renderizando rota protegida");
  return <>{children}</>;
};
