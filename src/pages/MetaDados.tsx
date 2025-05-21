
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { MetaDadosForm } from "../components/meta-dados/MetaDadosForm";

const MetaDados = () => {
  return (
    <DashboardLayout 
      title="Meta Dados" 
      subtitle="Gere meta dados otimizados para suas páginas"
    >
      <MetaDadosForm />
    </DashboardLayout>
  );
};

export default MetaDados;
