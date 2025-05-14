
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOLPForm } from "@/components/texto-seo-lp/TextoSEOLPForm";
import { useAuth } from "@/hooks/useAuth";
import { usePlanContext } from "@/contexts/PlanContext";

const TextoSEOLP = () => {
  const { user } = useAuth();
  const { reload } = usePlanContext();
  
  // Recarregar dados de assinatura ao acessar esta página
  useEffect(() => {
    reload();
  }, [reload]);
  
  return (
    <DashboardLayout 
      title="Texto SEO para LP" 
      subtitle="Gere textos otimizados para SEO em landing pages"
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <TextoSEOLPForm />
    </DashboardLayout>
  );
};

export default TextoSEOLP;
