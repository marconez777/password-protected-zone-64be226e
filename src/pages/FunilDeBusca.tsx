
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import FunilDeBuscaContent from '@/components/recursos/FunilDeBuscaContent';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('funil');
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  
  // Sidebar items with URL pattern
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

  // SEO JSON-LD data
  const jsonLdData = `
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MKRanker",
  "operatingSystem": "All",
  "applicationCategory": "SEOApplication",
  "offers": {
    "@type": "Offer",
    "price": "97.00",
    "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "120"
  },
  "url": "https://mkranker.com.br/recursos/funil-de-busca-com-ia",
  "description": "Ferramenta de SEO com Inteligência Artificial que automatiza o Funil de Busca para encontrar palavras-chave com potencial de conversão."
}
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Ferramenta de Funil de Busca de SEO com I.A | MKRanker"
        description="Encontre palavras-chave estratégicas com o Funil de Busca de SEO com I.A da MKRanker e aumente sua presença online."
        keywords="Funil de Busca de SEO com I.A, palavras-chave, ferramenta SEO, tráfego orgânico, MKRanker, inteligência artificial SEO"
        ogImage="https://mkranker.com.br/assets/img/funil-seo.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/funil-de-busca-com-ia"
        jsonLd={jsonLdData}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
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

export default FunilDeBusca;
