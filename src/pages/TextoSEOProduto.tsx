
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOProdutoForm } from "@/components/texto-seo-produto/TextoSEOProdutoForm";

const TextoSEOProduto = () => {
  return (
    <DashboardLayout 
      title="Texto SEO para Produto" 
      subtitle="Gere textos otimizados para SEO de produtos"
    >
      <TextoSEOProdutoForm />
    </DashboardLayout>
  );
};

export default TextoSEOProduto;
