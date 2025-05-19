
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Code, Share2 } from 'lucide-react';
import RecursosSidebar from '@/components/recursos/RecursosSidebar';
import RecursoBreadcrumb from '@/components/recursos/RecursoBreadcrumb';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const MetaDadosPublic = () => {
  const [activeItem, setActiveItem] = useState('meta-dados');
  
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
  "description": "Ferramenta de Geração de Meta Dados com Inteligência Artificial para otimizar o SEO do seu site."
}
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Gerador de Meta Dados com I.A para SEO | MKRanker"
        description="Crie meta títulos e descrições otimizadas para SEO com nossa ferramenta de inteligência artificial e aumente suas taxas de cliques."
        keywords="meta dados, SEO, meta título, meta descrição, tag title, tag description, MKRanker, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/meta-dados.jpg"
        canonicalUrl="https://mkranker.com.br/recursos/meta-dados-com-ia"
        jsonLd={jsonLdData}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <RecursoBreadcrumb currentPage="Meta Dados" />
        
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
              <h1 className="text-3xl font-bold text-white mb-6" itemProp="headline">Meta Dados</h1>
              
              <div className="prose prose-invert max-w-none" itemProp="articleBody">
                <p className="text-gray-300 mb-6">
                  Meta dados são informações invisíveis para os usuários, mas essenciais para mecanismos de busca e compartilhamento em redes sociais. Nossa ferramenta de IA gera meta títulos, descrições e tags otimizadas para melhorar o SEO do seu site.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Importância dos Meta Dados</h2>
                <p className="text-gray-300 mb-6">
                  Meta dados bem otimizados melhoram a visibilidade nos resultados de busca, aumentam a taxa de cliques (CTR) e informam aos mecanismos de busca sobre o conteúdo da sua página, impactando diretamente o SEO.
                </p>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/66079de7-3561-4f58-be8d-a718cbbe92de.png" 
                    alt="Meta Dados" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Interface da ferramenta de geração de meta dados</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Principais meta tags</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Code size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Meta título</h3>
                      <p className="text-gray-300">Crie títulos persuasivos com 50-60 caracteres que incluam sua palavra-chave principal.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Share2 size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Meta descrição</h3>
                      <p className="text-gray-300">Escreva descrições atrativas com 150-160 caracteres que incentivem o clique.</p>
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

export default MetaDadosPublic;
