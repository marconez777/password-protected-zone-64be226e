
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import TextoSEOLPArticleContent from '@/components/texto-seo-lp/TextoSEOLPArticleContent';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { textoSEOLPJsonLdData } from '@/components/texto-seo-lp/TextoSEOLPJSONLD';

const TextoSEOLPPublic = () => {
  const [activeItem, setActiveItem] = useState('texto-seo-lp');
  
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

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Gerador de Texto SEO para Landing Pages com IA | MKRanker"
        description="Crie textos otimizados para landing pages com nossa ferramenta de inteligência artificial e aumente suas conversões e rankeamento."
        keywords="texto SEO, landing page, copy SEO, textos persuasivos, otimização de conteúdo, MKRanker, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/texto-seo-lp.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/texto-seo-lp-com-ia"
        jsonLd={textoSEOLPJsonLdData}
        contentHTML={`
          <div class="seo-content">
            <h1>Gerador de Texto SEO para Landing Pages com IA</h1>
            <p>Crie textos otimizados para landing pages com nossa ferramenta de inteligência artificial e aumente suas conversões e rankeamento.</p>
            <p>Desenvolva conteúdo persuasivo que não apenas atrai visitantes, mas os converte em leads e clientes.</p>
          </div>
        `}
      />
      
      <HomeNavbar />
      
      <div className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Texto SEO para LP" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar using shared component */}
          <RecursosSidebar 
            items={sidebarItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <TextoSEOLPArticleContent />
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

export default TextoSEOLPPublic;
