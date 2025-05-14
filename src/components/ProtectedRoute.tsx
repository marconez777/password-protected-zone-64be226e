
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  
  // Show loading while checking authentication
  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Verificando acesso...</span>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // User authenticated, allow access
  return <Outlet />;
};
