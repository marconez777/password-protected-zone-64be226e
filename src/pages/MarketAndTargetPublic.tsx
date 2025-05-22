
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
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

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata
  title="Análise de Mercado e Público-Alvo com IA | MKRanker"
  description="Gere análises detalhadas de mercado e público-alvo com nossa ferramenta de inteligência artificial e desenvolva estratégias mais eficazes."
  keywords="análise de mercado, público-alvo, persona, buyer persona, pesquisa de mercado, MKRanker, inteligência artificial"
  ogImage="https://mkranker.com.br/assets/img/market-target.jpg"
  canonicalUrl="https://mkranker.com.br/recursos/mercado-e-publico-alvo-com-ia"
  jsonLd={`{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication", // ALTERADO AQUI
    "name": "Análise de Mercado e Público-Alvo com IA | MKRanker", // MOVIDO DO mainEntity
    "description": "Gere análises detalhadas de mercado e público-alvo com nossa ferramenta de inteligência artificial e desenvolva estratégias mais eficazes.", // MOVIDO DO mainEntity
    "url": "https://mkranker.com.br/recursos/mercado-e-publico-alvo-com-ia",
    "applicationCategory": "MarketingApplication", // MOVIDO DO mainEntity
    "operatingSystem": "Web", // MOVIDO DO mainEntity
    "offers": { // MOVIDO DO mainEntity
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  }`}
  // ...
/>
// ...
        contentHTML={`
          <div class="seo-content">
            <h1>Análise de Mercado e Público-Alvo com IA</h1>
            <p>Gere análises detalhadas de mercado e público-alvo com nossa ferramenta de inteligência artificial e desenvolva estratégias mais eficazes.</p>
            <p>Entenda melhor seu mercado, identifique oportunidades e conheça profundamente seus potenciais clientes.</p>
          </div>
        `}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Mercado e Público-Alvo" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <RecursosSidebar 
            items={sidebarItems} 
            activeItem={activeItem} 
            setActiveItem={setActiveItem} 
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Análise de Mercado e Público-Alvo com IA</h1>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  A compreensão profunda do seu mercado e do seu público-alvo é essencial para o sucesso de qualquer estratégia de marketing digital e SEO.
                </p>
                
                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Como nossa ferramenta funciona</h2>
                <p className="text-gray-700 mb-4">
                  Nossa ferramenta de análise de mercado e público-alvo utiliza inteligência artificial avançada para gerar insights valiosos sobre seu nicho, concorrentes e potenciais clientes.
                </p>

                <div className="my-8 p-6 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Benefícios da Análise de Mercado com IA</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Identificação precisa do seu público-alvo e suas necessidades</li>
                    <li>Descoberta de oportunidades de mercado inexploradas</li>
                    <li>Análise detalhada da concorrência e seus pontos fortes/fracos</li>
                    <li>Criação de buyer personas baseadas em dados reais</li>
                    <li>Estratégias personalizadas para cada segmento do seu público</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 mt-6">
                  Ao utilizar nossa ferramenta, você economiza tempo e recursos valiosos que seriam gastos em pesquisas manuais, enquanto obtém insights de qualidade superior baseados em análises de IA avançada.
                </p>
                
                <div className="mt-10 mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experimente nossa ferramenta</h2>
                  <p className="text-gray-700">
                    Cadastre-se em nossa plataforma para acessar a versão completa da ferramenta de Análise de Mercado e Público-Alvo com IA.
                  </p>
                </div>
              </div>
            </div>
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
