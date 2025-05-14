
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KeywordForm } from "@/components/keyword/KeywordForm";

const Keywords = () => {
  return (
    <DashboardLayout 
      title="Palavras-chave" 
      subtitle="Gere sugestões de palavras-chave relacionadas"
    >
      <KeywordForm />
    </DashboardLayout>
  );
};

export default Keywords;
