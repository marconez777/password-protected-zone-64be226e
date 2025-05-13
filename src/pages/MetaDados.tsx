
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
      <div className="max-w-4xl mx-auto">
        <MetaDadosForm />
      </div>
    </DashboardLayout>
  );
};

export default MetaDados;
