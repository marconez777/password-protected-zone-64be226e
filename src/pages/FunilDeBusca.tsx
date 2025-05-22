
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import FunilDeBuscaContent from '@/components/recursos/FunilDeBuscaContent';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { generateResourceSchemaLD } from '@/utils/schemaGenerator';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('funil');
  
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
  const pageTitle = "Gerador de Funil de Busca com IA | MKRanker";
  const pageDescription = "Crie funis de busca otimizados para SEO com nossa ferramenta de inteligência artificial e aumente seu tráfego orgânico.";
  const canonicalUrl = "https://mkranker.com.br/recursos/funil-de-busca-com-ia";
  const ogImage = "https://mkranker.com.br/assets/img/funil-busca.jpg";
  
  // Generate standardized JSON-LD
  const jsonLdData = generateResourceSchemaLD(
    pageTitle,
    pageDescription,
    canonicalUrl,
    ogImage,
    "Funil de Busca MKRanker",
    "SEOApplication",
    "97.00"
  );

  // Efeito para atualizar metadados específicos da página quando o componente montar
  useEffect(() => {
    // Atualiza os metadados no HTML para rastreadores que não executam JavaScript
    const updatePageSpecificMetaTags = () => {
      document.title = "Gerador de Funil de Busca com IA | MKRanker";
      
      const updateMetaContent = (id: string, content: string) => {
        const element = document.getElementById(id);
        if (element && element instanceof HTMLMetaElement) {
          element.content = content;
        }
      };
      
      updateMetaContent('pageType', 'recurso-detalhe');
      
      // Atualiza o link canônico
      const canonicalElement = document.getElementById('canonicalUrl');
      if (canonicalElement && canonicalElement instanceof HTMLLinkElement) {
        canonicalElement.href = "https://mkranker.com.br/recursos/funil-de-busca-com-ia";
      }
    };
    
    updatePageSpecificMetaTags();
  }, []);

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        keywords="funil de busca, SEO, keyword funnel, jornada de busca, funil de palavras-chave, MKRanker, inteligência artificial"
        ogImage={ogImage}
        canonicalUrl={canonicalUrl}
        pageType="recurso-detalhe"
        jsonLd={jsonLdData}
        contentHTML={`
          <div class="seo-content">
            <h1>Gerador de Funil de Busca com IA</h1>
            <p>Crie funis de busca otimizados para SEO com nossa ferramenta de inteligência artificial e aumente seu tráfego orgânico.</p>
            <p>Descubra as melhores oportunidades de palavras-chave para cada etapa da jornada do cliente.</p>
          </div>
        `}
      />
      
      <HomeNavbar />
      
      <div className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Funil de Busca" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <RecursosSidebar 
            items={sidebarItems} 
            activeItem={activeItem} 
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <FunilDeBuscaContent />
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="mt-16">
        <PricingSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FunilDeBusca;
