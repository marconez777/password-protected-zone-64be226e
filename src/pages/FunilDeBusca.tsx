
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

  // Conteúdo pré-renderizado para SEO
  const seoContent = `
    <div class="seo-content">
      <h1>Mapeamento do Funil de Busca de SEO com IA</h1>
      <p>No atual cenário digital, entender e otimizar o Funil de Busca de SEO com I.A tornou-se essencial para qualquer negócio que deseja se destacar online. O uso de Inteligência Artificial (I.A) nesse contexto não só potencializa a descoberta de oportunidades dentro do micro nicho, mas também refina estratégias para atingir o público-alvo desejado e explorar com máximo aproveitamento o segmento de atuação.</p>
      
      <h2>O Poder do Funil de Busca de SEO com I.A</h2>
      <p>Integrar a I.A ao Funil de Busca de SEO é uma estratégia poderosa que transforma a forma como empresas criam e disponibilizam conteúdo em cada etapa da jornada do cliente. No topo do funil, a I.A pode sugerir temas que capturam a atenção inicial do usuário, utilizando palavras-chave relevantes que correspondem às tendências de pesquisa atuais.</p>
      
      <h2>Meio do Funil: Conduzindo o Interesse</h2>
      <p>À medida que os usuários se movem para o meio do funil, eles buscam informações mais detalhadas que respondam a perguntas específicas sobre seus produtos ou serviços. Aqui, o Funil de Busca de SEO com I.A é vital para sugerir conteúdos que abordem as preocupações e dúvidas comuns do público-alvo.</p>
      
      <h2>Fundo do Funil: Convertendo em Ação</h2>
      <p>No fundo do funil, o principal objetivo é converter o interesse genuíno em ação, seja através de compras ou assinatura de serviços. Nesse ponto, o conteúdo deve ser direcionado, claro e carregado de provas sociais ou depoimentos que instiguem confiança.</p>
      
      <h2>Ferramentas de Pesquisa de Palavras-chave: O Aliado Essencial</h2>
      <p>No contexto do Funil de Busca de SEO com I.A, as ferramentas de pesquisa de palavras-chave continuam sendo aliadas fundamentais. Embora a I.A traga um nível avançado de personalização e eficiência, essas ferramentas oferecem a base de análise e entender o comportamento do usuário nos mecanismos de busca.</p>
    </div>
  `;

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
        contentHTML={seoContent}
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
