
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOLPForm } from "@/components/texto-seo-lp/TextoSEOLPForm";
import { useAuth } from "@/hooks/useAuth";

const TextoSEOLP = () => {
  const { user } = useAuth();
  
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
