
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          toast.error("Você precisa estar logado para acessar esta página");
          navigate('/login');
          return;
        }

        // Verificar a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error("Sua sessão expirou. Por favor faça login novamente");
          navigate('/login');
          return;
        }
        
      } catch (error) {
        console.error("Erro ao verificar status do usuário:", error);
        toast.error("Ocorreu um erro ao verificar seu acesso");
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      title="Dashboard"
    >
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Bem-vindo, {user?.email || 'usuário'}!
        </h2>
        <p className="text-gray-600 mb-4">
          Use o painel lateral para acessar todas as funcionalidades disponíveis.
        </p>
      </div>
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
