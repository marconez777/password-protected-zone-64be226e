
import { useAuth } from "@/providers/auth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  
  useEffect(() => {
    // Log para debug
    console.log("Dashboard - user:", !!user, "isAdmin:", isAdmin, "loading:", loading);
  }, [user, isAdmin, loading]);

  // Mostrar um loading enquanto verifica autenticação
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
        
        {isAdmin && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-2">
            <p className="text-blue-800">
              Você está logado como administrador e tem acesso a recursos adicionais.
            </p>
          </div>
        )}
      </div>
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
