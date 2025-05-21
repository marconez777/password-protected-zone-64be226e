
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOLPForm } from "@/components/texto-seo-lp/TextoSEOLPForm";

const TextoSEOLP = () => {
  return (
    <DashboardLayout 
      title="Texto SEO para LP" 
      subtitle="Gere textos otimizados para SEO em landing pages"
    >
      <TextoSEOLPForm />
    </DashboardLayout>
  );
};

export default TextoSEOLP;
