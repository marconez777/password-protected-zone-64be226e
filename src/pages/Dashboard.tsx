
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);

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
        <p className="text-gray-600">
          Use o painel lateral para acessar todas as funcionalidades disponíveis.
        </p>
      </div>
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
