
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SearchFunnelForm } from "@/components/search-funnel/SearchFunnelForm";
import SEOMetadata from "@/components/recursos/SEOMetadata";

const SearchFunnel = () => {
  return (
    <>
      <SEOMetadata 
        title="Ferramenta de Funil de Busca | MKRanker"
        description="Use nossa ferramenta para criar funis de busca otimizados e aumentar seu tráfego orgânico."
        keywords="ferramenta funil de busca, keyword funnel, jornada de busca, otimização SEO"
        ogImage="https://mkranker.com.br/assets/img/search-funnel-tool.jpg"
        canonicalUrl="https://mkranker.com.br/search-funnel-tool"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Ferramenta de Funil de Busca MKRanker",
          "description": "Use nossa ferramenta para criar funis de busca otimizados e aumentar seu tráfego orgânico.",
          "applicationCategory": "SEOApplication",
          "operatingSystem": "Web"
        }`}
        contentHTML=""
      />
      <DashboardLayout 
        title="Funil de Busca" 
        subtitle="Gere funis de busca para seu negócio"
      >
        <SearchFunnelForm />
      </DashboardLayout>
    </>
  );
};

export default SearchFunnel;
