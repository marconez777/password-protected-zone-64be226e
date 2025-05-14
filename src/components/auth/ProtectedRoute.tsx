
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePlanContext } from '@/contexts/PlanContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { subscription, loading } = usePlanContext();
  const location = useLocation();

  const isActive = subscription?.is_active === true;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isActive) {
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
