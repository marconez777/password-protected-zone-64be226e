
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import { PautasBlogArticleContent } from '@/components/pautas-blog/PautasBlogArticleContent';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { pautasBlogSeoContent } from '@/components/pautas-blog/PautasBlogJSONLD';
import { generateResourceSchemaLD } from '@/utils/schemaGenerator';

const PautasBlogPublic = () => {
  const [activeItem, setActiveItem] = useState('pautas-blog');
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  
  const sidebarItems = [
    { id: 'funil', label: 'Funil de Busca', path: '/recursos/funil-de-busca-com-ia' },
    { id: 'palavras-chave', label: 'Palavras-chave', path: '/recursos/palavras-chave-com-ia' },
    { id: 'mercado', label: 'Mercado e Público-alvo', path: '/recursos/mercado-e-publico-alvo-com-ia' },
    { id: 'texto-seo-lp', label: 'Texto SEO para LP', path: '/recursos/texto-seo-lp-com-ia' },
    { id: 'texto-seo-produto', label: 'Texto SEO para Produto', path: '/recursos/texto-seo-produto-com-ia' },
    { id: 'texto-seo-blog', label: 'Texto SEO para Blog', path: '/recursos/texto-seo-blog-com-ia' },
    { id: 'pautas-blog', label: 'Pautas para Blog', path: '/recursos/pautas-blog-com-ia' },
    { id: 'meta-dados', label: 'Meta Dados', path: '/recursos/meta-dados-com-ia' },
    { id: 'gerador-imagens', label: 'Gerador de Imagens', path: '#', soon: true },
  ];

  // Title and description for the page
  const pageTitle = "Gerador de Pautas para Blog com IA | MKRanker";
  const pageDescription = "Crie ideias de pautas otimizadas para SEO com nossa ferramenta de inteligência artificial e impulsione seu blog.";
  const canonicalUrl = "https://mkranker.com.br/recursos/pautas-blog-com-ia";
  const ogImage = "https://mkranker.com.br/assets/img/pautas-blog.jpg";
  
  // Generate standardized JSON-LD
  const jsonLdData = generateResourceSchemaLD(
    pageTitle,
    pageDescription,
    canonicalUrl,
    ogImage,
    "Gerador de Pautas para Blog MKRanker",
    "ContentApplication",
    "97.00",
    "Ferramenta de IA para geração de ideias e pautas de blog otimizadas para SEO"
  );

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title={pageTitle}
        description={pageDescription}
        keywords="pautas para blog, ideias para blog, gerador de pautas, conteúdo para blog, planejamento editorial, IA para blog"
        ogImage={ogImage}
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLdData}
        contentHTML={pautasBlogSeoContent}
        pageType="recurso-detalhe"
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Pautas para Blog" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <RecursosSidebar 
            items={sidebarItems} 
            activeItem={activeItem} 
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <PautasBlogArticleContent />
          </div>
        </div>
      </main>
      
      {/* Pricing Section */}
      <div className="mt-16">
        <PricingSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PautasBlogPublic;
