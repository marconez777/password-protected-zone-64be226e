
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Link } from 'react-router-dom';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import TextoSEOProdutoArticleContent from '@/components/texto-seo-produto/TextoSEOProdutoArticleContent';
import { textoSEOProdutoJsonLdData } from '@/components/texto-seo-produto/TextoSEOProdutoJSONLD';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';

const TextoSEOProdutoPublic = () => {
  const [activeItem, setActiveItem] = useState('texto-seo-produto');
  
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
      <HomeNavbar />
      
      {/* Add JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: textoSEOProdutoJsonLdData }}
      />
      
      <div className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Texto SEO para Produto" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar using shared component */}
          <RecursosSidebar 
            items={sidebarItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <TextoSEOProdutoArticleContent />
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

export default TextoSEOProdutoPublic;
