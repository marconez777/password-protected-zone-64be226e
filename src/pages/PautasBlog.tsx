
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PautasBlogForm } from "@/components/pautas-blog/PautasBlogForm";
import SEOMetadata from "@/components/recursos/SEOMetadata";

const PautasBlog = () => {
  return (
    <>
      <SEOMetadata 
        title="Ferramenta de Pautas para Blog | MKRanker"
        description="Use nossa ferramenta para criar ideias de pautas otimizadas para SEO e impulsionar seu blog."
        keywords="ferramenta pautas blog, ideias conteúdo, calendário editorial, otimização SEO"
        ogImage="https://mkranker.com.br/assets/img/pautas-blog-tool.jpg"
        canonicalUrl="https://mkranker.com.br/pautas-blog-tool"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Ferramenta de Pautas para Blog MKRanker",
          "description": "Use nossa ferramenta para criar ideias de pautas otimizadas para SEO e impulsionar seu blog.",
          "applicationCategory": "ContentApplication",
          "operatingSystem": "Web"
        }`}
        contentHTML=""
      />
      <DashboardLayout 
        title="Pautas para Blog" 
        subtitle="Gere ideias de conteúdo para seu blog"
      >
        <PautasBlogForm />
      </DashboardLayout>
    </>
  );
};

export default PautasBlog;
