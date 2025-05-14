
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { session, user } = useAuth();
  const { remainingUses, limit, active, endsAt } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      title="Dashboard" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Bem-vindo, {user?.user_metadata?.full_name || "Usuário"}!</h2>
        <p className="text-gray-600 mb-4">
          Use o painel lateral para acessar todas as funcionalidades disponíveis.
        </p>
        
        {active && (
          <div className="bg-green-50 border border-green-100 rounded-md p-4 mt-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-green-800">Assinatura Ativa</h3>
                <p className="text-green-600 text-sm">
                  Sua assinatura está ativa até {formatDate(endsAt)}
                </p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uso da assinatura:</span>
                    <span className="font-medium">{limit - remainingUses} de {limit} requisições</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${remainingUses < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${((limit - remainingUses) / limit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
