// ProtectedRoute corrigido - arquivo único para evitar conflitos
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePlanContext } from '@/contexts/PlanContext';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean; // se true, requer assinatura ativa
}

export const ProtectedRoute = ({ 
  children, 
  requireSubscription = false 
}: ProtectedRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { subscription, loading: planLoading, reload } = usePlanContext();
  const location = useLocation();

  // Debug logs
  useEffect(() => {
    console.log('=== PROTECTED ROUTE DEBUG ===');
    console.log('Path:', location.pathname);
    console.log('Require Subscription:', requireSubscription);
    console.log('User:', !!user);
    console.log('Auth Loading:', authLoading);
    console.log('Plan Loading:', planLoading);
    console.log('Subscription:', subscription);
    console.log('Is Active:', subscription?.is_active);
  }, [user, authLoading, planLoading, subscription, location.pathname, requireSubscription]);

  // Recarregar dados quando o componente for montado
  useEffect(() => {
    if (user && requireSubscription) {
      reload();
    }
  }, [user, requireSubscription, reload]);

  // Loading state
  if (authLoading || (requireSubscription && planLoading)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  // Não autenticado
  if (!user) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se requer assinatura, verificar se está ativa
  if (requireSubscription) {
    // Se não tem dados de assinatura ou não está ativa
    if (!subscription || !subscription.is_active) {
      console.log('No active subscription, redirecting to subscribe');
      console.log('Subscription data:', subscription);
      return <Navigate to="/subscribe" state={{ from: location }} replace />;
    }
    
    // Verificar se o plano tem tipo válido
    if (!subscription.plan_type) {
      console.log('No plan type found, redirecting to subscribe');
      return <Navigate to="/subscribe" state={{ from: location }} replace />;
    }
  }

  console.log('Access granted to:', location.pathname);
  return <>{children}</>;
};
