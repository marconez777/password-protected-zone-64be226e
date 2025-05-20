
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { KeyRound, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const KeywordsPublic = () => {
  const [activeItem, setActiveItem] = useState('palavras-chave');
  
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
      <h1>Palavras-chave</h1>
      <p>Palavras-chave são termos e frases que os usuários digitam nos mecanismos de busca. Identificar e utilizar as palavras-chave certas é fundamental para o sucesso da sua estratégia de SEO.</p>
      
      <h2>Importância das palavras-chave</h2>
      <p>Palavras-chave bem pesquisadas podem gerar tráfego qualificado para seu site, aumentar conversões e melhorar seu posicionamento nos mecanismos de busca. Nossa ferramenta de IA ajuda a identificar as melhores palavras-chave para o seu negócio.</p>
      
      <h2>Como selecionar palavras-chave eficientes</h2>
      <ul>
        <li>Pesquisa de intenção: Identifique termos que correspondem à intenção do seu público-alvo e ao estágio do funil de vendas.</li>
        <li>Análise de concorrência: Compare palavras-chave dos concorrentes e encontre oportunidades únicas para seu negócio.</li>
      </ul>
    </div>
  `;

  // SEO JSON-LD data
  const jsonLdData = `
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MKRanker",
  "applicationCategory": "SEOApplication",
  "offers": {
    "@type": "Offer",
    "price": "97.00",
    "priceCurrency": "BRL"
  },
  "description": "Ferramenta de Pesquisa de Palavras-chave com Inteligência Artificial para melhorar o posicionamento nos motores de busca."
}
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Ferramenta de Pesquisa de Palavras-chave com I.A | MKRanker"
        description="Descubra as melhores palavras-chave para seu negócio com nossa ferramenta de pesquisa otimizada com inteligência artificial."
        keywords="palavras-chave, SEO, pesquisa de palavras-chave, ferramenta SEO, tráfego orgânico, MKRanker, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/keywords-tool.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/palavras-chave-com-ia"
        jsonLd={jsonLdData}
        contentHTML={seoContent}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Palavras-chave" />
        
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
              <h1 className="text-3xl font-bold text-white mb-6" itemProp="headline">Palavras-chave</h1>
              
              <div className="prose prose-invert max-w-none" itemProp="articleBody">
                <p className="text-gray-300 mb-6">
                  Palavras-chave são termos e frases que os usuários digitam nos mecanismos de busca. Identificar e utilizar as palavras-chave certas é fundamental para o sucesso da sua estratégia de SEO.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Importância das palavras-chave</h2>
                <p className="text-gray-300 mb-6">
                  Palavras-chave bem pesquisadas podem gerar tráfego qualificado para seu site, aumentar conversões e melhorar seu posicionamento nos mecanismos de busca. Nossa ferramenta de IA ajuda a identificar as melhores palavras-chave para o seu negócio.
                </p>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/9249eca7-a739-4c4f-9e66-ba984469544f.png" 
                    alt="Pesquisa de Palavras-chave" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Ferramenta de pesquisa de palavras-chave com IA</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Como selecionar palavras-chave eficientes</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <KeyRound size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Pesquisa de intenção</h3>
                      <p className="text-gray-300">Identifique termos que correspondem à intenção do seu público-alvo e ao estágio do funil de vendas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <BarChart size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Análise de concorrência</h3>
                      <p className="text-gray-300">Compare palavras-chave dos concorrentes e encontre oportunidades únicas para seu negócio.</p>
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

export default KeywordsPublic;
