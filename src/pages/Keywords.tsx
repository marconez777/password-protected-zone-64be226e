
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
      <Card className="shadow-sm">
        <div className="px-6 pt-6 border-b pb-2">
          <h2 className="text-2xl font-medium text-gray-800">Palavras-chave Relacionadas</h2>
          <p className="text-gray-500">Digite uma palavra-chave para gerar sugestões relacionadas</p>
        </div>
        
        <div className="p-6">
          <KeywordForm />
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Keywords;
