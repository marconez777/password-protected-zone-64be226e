
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KeywordForm } from "@/components/keyword/KeywordForm";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";

const Keywords = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Palavras-chave" 
      subtitle="Gere sugestões de palavras-chave relacionadas"
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <KeywordForm />
    </DashboardLayout>
  );
};

export default Keywords;
