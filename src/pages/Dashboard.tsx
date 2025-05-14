
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    >
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Bem-vindo, {user.email}!</h2>
        <p className="text-gray-600 mb-4">
          Use o painel lateral para acessar todas as funcionalidades disponíveis.
        </p>
      </div>
      
      <FeatureCards />
    </DashboardLayout>
  );
};

export default Dashboard;
