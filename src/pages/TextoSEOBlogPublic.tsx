
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import TextoSEOBlogArticleContent from '@/components/texto-seo-blog/TextoSEOBlogArticleContent';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { textoSEOBlogJsonLdData } from '@/components/texto-seo-blog/TextoSEOBlogJSONLD';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';

const TextoSEOBlogPublic = () => {
  const [activeItem, setActiveItem] = useState('texto-seo-blog');
  
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
        title="Gerador de Texto SEO para Blog com IA | MKRanker"
        description="Crie artigos otimizados para SEO com nossa ferramenta de inteligência artificial e alcance as primeiras posições nos motores de busca."
        keywords="texto SEO blog, artigos otimizados, blog SEO, conteúdo otimizado, redação SEO, MKRanker, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/texto-seo-blog.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/texto-seo-blog-com-ia"
        jsonLd={textoSEOBlogJsonLdData}
        contentHTML={`
          <div class="seo-content">
            <h1>Gerador de Texto SEO para Blog com IA</h1>
            <p>Crie artigos otimizados para SEO com nossa ferramenta de inteligência artificial e alcance as primeiras posições nos motores de busca.</p>
            <p>Desenvolva conteúdo de alta qualidade que engaja leitores e é reconhecido pelo Google como autoridade.</p>
          </div>
        `}
      />
      
      <HomeNavbar />
      
      <div className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Texto SEO para Blog" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar using shared component */}
          <RecursosSidebar 
            items={sidebarItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <TextoSEOBlogArticleContent />
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

export default TextoSEOBlogPublic;
