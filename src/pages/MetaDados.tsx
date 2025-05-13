
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetaDadosForm } from "@/components/meta-dados/MetaDadosForm";
import { useAuth } from "@/hooks/useAuth";

const MetaDados = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Meta Dados" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <MetaDadosForm />
    </DashboardLayout>
  );
};

export default MetaDados;
