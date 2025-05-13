
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUsageData } from "@/hooks/useUsageData";
import { useToast } from "@/hooks/use-toast";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { ResourceUsageCard } from "@/components/dashboard/resource-usage/ResourceUsageCard";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { 
    subscription, 
    usage, 
    planLimits, 
    loading: dataLoading,
    reload,
    error
  } = useUsageData();

  // Combined loading state for better UX
  const loading = dataLoading || isRefreshing;

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await reload();
      toast({
        title: "Dados atualizados",
        description: "Os dados de uso foram atualizados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar os dados de uso.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Se não autenticado, redirecionar para login
    if (!session) {
      navigate("/login");
      return;
    }
    
    // Recarregar dados quando a página do dashboard é mostrada
    reload();
    
    // Configurar recarregamento periódico dos dados de uso (a cada 15 segundos)
    const intervalId = setInterval(() => {
      reload();
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, [session, navigate, reload]);

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
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleManualRefresh}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Atualizando...' : 'Atualizar dados'}
        </Button>
      </div>
      
      <SubscriptionCard 
        subscription={subscription}
        userName={user?.user_metadata?.full_name || "Usuário"} 
      />
      
      <ResourceUsageCard 
        usage={usage} 
        planLimits={planLimits}
        loading={loading}
      />
      
      <FeatureCards />
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Erro ao carregar dados:</p>
          <p>{error}</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
