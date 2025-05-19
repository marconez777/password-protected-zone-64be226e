
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Target, Users } from 'lucide-react';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const MarketAndTargetPublic = () => {
  const [activeItem, setActiveItem] = useState('mercado');
  
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

  // Conteúdo pré-renderizado para SEO
  const seoContent = `
    <div class="seo-content">
      <h1>Mercado e Público-alvo</h1>
      <p>Conhecer seu mercado e público-alvo é essencial para criar estratégias de marketing eficazes. Nossa ferramenta de IA ajuda a analisar tendências de mercado e definir personas precisas para o seu negócio.</p>
      
      <h2>Análise de mercado</h2>
      <p>Uma análise de mercado completa identifica oportunidades, ameaças e tendências que podem impactar seu negócio. Entender o mercado permite criar estratégias mais eficientes e competitivas.</p>
      
      <h2>Definição de público-alvo</h2>
      <ul>
        <li>Criação de personas: Desenvolva personas detalhadas para representar diferentes segmentos do seu público-alvo.</li>
        <li>Segmentação de mercado: Divida seu mercado em grupos específicos para criar mensagens mais personalizadas e eficazes.</li>
      </ul>
    </div>
  `;

  // SEO JSON-LD data
  const jsonLdData = `
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MKRanker",
  "applicationCategory": "MarketingApplication",
  "offers": {
    "@type": "Offer",
    "price": "97.00",
    "priceCurrency": "BRL"
  },
  "description": "Ferramenta de Análise de Mercado e Público-alvo com Inteligência Artificial para estratégias de marketing mais eficientes."
}
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Análise de Mercado e Público-alvo com I.A | MKRanker"
        description="Ferramenta de análise de mercado e segmentação de público-alvo com inteligência artificial para estratégias de marketing mais eficientes."
        keywords="análise de mercado, público-alvo, segmentação, personas, marketing digital, MKRanker, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/market-target.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/mercado-e-publico-alvo-com-ia"
        jsonLd={jsonLdData}
        contentHTML={seoContent}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Mercado e Público-alvo" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <RecursosSidebar 
            items={sidebarItems} 
            activeItem={activeItem} 
            setActiveItem={setActiveItem}
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <article className="bg-[#1A1A1A] rounded-lg p-8" itemScope itemType="https://schema.org/Article">
              <h1 className="text-3xl font-bold text-white mb-6" itemProp="headline">Mercado e Público-alvo</h1>
              
              <div className="prose prose-invert max-w-none" itemProp="articleBody">
                <p className="text-gray-300 mb-6">
                  Conhecer seu mercado e público-alvo é essencial para criar estratégias de marketing eficazes. Nossa ferramenta de IA ajuda a analisar tendências de mercado e definir personas precisas para o seu negócio.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Análise de mercado</h2>
                <p className="text-gray-300 mb-6">
                  Uma análise de mercado completa identifica oportunidades, ameaças e tendências que podem impactar seu negócio. Entender o mercado permite criar estratégias mais eficientes e competitivas.
                </p>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/becf4789-08a1-420c-9246-95c6829c54de.png" 
                    alt="Análise de Mercado" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Dashboard de análise de mercado com IA</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Definição de público-alvo</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Target size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Criação de personas</h3>
                      <p className="text-gray-300">Desenvolva personas detalhadas para representar diferentes segmentos do seu público-alvo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Segmentação de mercado</h3>
                      <p className="text-gray-300">Divida seu mercado em grupos específicos para criar mensagens mais personalizadas e eficazes.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-gray-400 text-sm" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <meta itemProp="name" content="MKRanker" />
              </div>
              <meta itemProp="datePublished" content="2023-05-15" />
              <meta itemProp="dateModified" content="2025-05-19" />
            </article>
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

export default MarketAndTargetPublic;
