
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOProdutoForm } from "@/components/texto-seo-produto/TextoSEOProdutoForm";
import { useAuth } from "@/hooks/useAuth";

const TextoSEOProduto = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Texto SEO para Produto" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <TextoSEOProdutoForm />
    </DashboardLayout>
  );
};

export default TextoSEOProduto;
