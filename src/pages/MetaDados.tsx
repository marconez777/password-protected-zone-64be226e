
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetaDadosForm } from "@/components/meta-dados/MetaDadosForm";
import { useAuth } from "@/hooks/useAuth";

const MetaDados = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Meta Dados" 
      subtitle="Gere meta dados otimizados para suas páginas"
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <MetaDadosForm />
    </DashboardLayout>
  );
};

export default MetaDados;
