
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePlanContext } from '@/contexts/PlanContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { subscription, loading, reload } = usePlanContext();
  const location = useLocation();

  // Adicionar log para debugar
  console.log('ProtectedRoute - Estado da assinatura:', {
    subscription,
    loading,
    isActive: subscription?.is_active,
    planType: subscription?.plan_type
  });

  // Forçar recarga quando o componente for montado
  useEffect(() => {
    reload();
  }, [reload]);

  const isActive = subscription?.is_active === true;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  // Verificação mais segura para plano ativo
  if (!isActive) {
    console.log('ProtectedRoute - Redirecionando para /subscribe - Plano não ativo');
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute - Acesso permitido');
  return <>{children}</>;
};
