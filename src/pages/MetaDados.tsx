
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetaDadosForm } from "@/components/meta-dados/MetaDadosForm";
import SEOMetadata from "@/components/recursos/SEOMetadata";

const MetaDados = () => {
  return (
    <>
      <SEOMetadata 
        title="Ferramenta de Meta Dados | MKRanker"
        description="Use nossa ferramenta para criar meta títulos e descrições otimizadas para SEO."
        keywords="ferramenta meta dados, gerador de meta tags, otimização SEO, meta title, meta description"
        ogImage="https://mkranker.com.br/assets/img/meta-dados-tool.jpg"
        canonicalUrl="https://mkranker.com.br/meta-dados-tool"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Ferramenta de Meta Dados MKRanker",
          "description": "Use nossa ferramenta para criar meta títulos e descrições otimizadas para SEO.",
          "applicationCategory": "SEOApplication",
          "operatingSystem": "Web"
        }`}
        contentHTML=""
      />
      <DashboardLayout 
        title="Meta Dados" 
        subtitle="Gere meta dados otimizados para suas páginas"
      >
        <MetaDadosForm />
      </DashboardLayout>
    </>
  );
};

export default MetaDados;
