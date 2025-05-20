
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
      <h1>Gerador de Público-alvo e Persona com IA</h1>
      <p>Conhecer e compreender seu público-alvo não é apenas uma vantagem, é uma necessidade. Com nossa ferramenta de gerador de público-alvo IA, você pode redefinir a maneira como sua marca se comunica e se posiciona no mercado.</p>
      
      <h2>O Que é o Gerador de Público-Alvo IA?</h2>
      <p>A ferramenta de gerador de público-alvo IA é projetada para ajudar empresas a identificar e compreender quem são seus clientes ideais.</p>
      
      <h2>Vantagens de Definir Seu Público-Alvo com IA</h2>
      <ul>
        <li>Precisão Aumentada: Oferece uma visão mais precisa de quem são seus clientes.</li>
        <li>Tempo e Eficiência: Processo de pesquisa de mercado acelerado.</li>
        <li>Personalização Avançada: Identifica dados demográficos, comportamentos e preferências.</li>
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
  "description": "Gerador de Público-alvo e Persona com Inteligência Artificial para estratégias de marketing mais eficientes."
}
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Gerador de Público-alvo e Persona com I.A | MKRanker"
        description="Ferramenta avançada de gerador de público-alvo e persona com inteligência artificial para estratégias de marketing mais eficientes e personalizadas."
        keywords="gerador de público-alvo, público-alvo IA, persona, segmentação, marketing digital, MKRanker, inteligência artificial"
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
              <h1 className="text-3xl font-bold text-white mb-6" itemProp="headline">Gerador de Público-alvo e Persona com IA</h1>
              
              <div className="prose prose-invert max-w-none" itemProp="articleBody">
                <p className="text-gray-300 mb-6">
                  Conhecer e compreender seu público-alvo não é apenas uma vantagem, é uma necessidade. A revolução tecnológica trouxe consigo ferramentas que podem auxiliar nesse processo, e o uso da Inteligência Artificial (IA) está na vanguarda dessa transformação. Com a ferramenta inovadora de gerador de público-alvo IA, você pode redefinir a maneira como sua marca se comunica e se posiciona no mercado.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">O Que é o Gerador de Público-Alvo IA?</h2>
                <p className="text-gray-300 mb-6">
                  A ferramenta de gerador de público-alvo IA é projetada para ajudar empresas a identificar e compreender quem são seus clientes ideais. Utilizando algoritmos avançados e prompts cuidadosamente criados, essa tecnologia trabalha de forma incansável para analisar dados e definir o público-alvo IA com precisão.
                </p>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/75378ffa-def0-4577-a5cf-ebe3d48afd0b.png" 
                    alt="Ferramenta de Análise de Público-Alvo com IA" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Interface da ferramenta de gerador de público-alvo com IA</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Vantagens de Definir Seu Público-Alvo com IA</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Target size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Precisão Aumentada</h3>
                      <p className="text-gray-300">A IA oferece uma visão mais precisa de quem são seus clientes. Com dados atualizados e análises detalhadas, é possível criar perfis detalhados de seus consumidores.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Tempo e Eficiência</h3>
                      <p className="text-gray-300">O tradicional processo de pesquisa de mercado pode ser demorado. Com a IA, esse processo é acelerado, tornando sua campanha mais eficiente.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Target size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Personalização Avançada</h3>
                      <p className="text-gray-300">Com a capacidade de identificar não apenas dados demográficos, mas também comportamentos e preferências, você pode personalizar suas mensagens para serem mais impactantes.</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Como Funciona a Ferramenta de Público-Alvo por Inteligência Artificial?</h2>
                <p className="text-gray-300 mb-6">
                  A ferramenta de gerador de público-alvo IA como o MK Ranker utiliza um ano de treinamento contínuo para criar prompts que descobrem detalhes íntimos sobre seu público-alvo. Essa tecnologia analisa dados de múltiplas fontes para entender micronicohos e áreas com menos concorrência, oferecendo oportunidades para que você possa se destacar facilmente no Google.
                </p>
                
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                  <li><span className="font-medium text-white">Coleta de Dados:</span> A IA analisa dados históricos e tendências de comportamento para desenhar um perfil.</li>
                  <li><span className="font-medium text-white">Análise Comportamental:</span> Entende padrões de consumo e interação dos seus potenciais clientes.</li>
                  <li><span className="font-medium text-white">Definição de Micronichos:</span> Identifica áreas onde há menor concorrência, facilitando uma presença digital mais efetiva.</li>
                </ul>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/029bc626-51d0-4d4c-90f5-3e85d9f8ecbf.png" 
                    alt="Resultado da análise de público-alvo com IA" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Exemplo de resultado da análise de público-alvo e persona com IA</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Criar Público-Alvo com IA: Passo a Passo</h2>
                <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-6">
                  <li><span className="font-medium text-white">Selecionar Objetivos:</span> Escolha qual objetivo você deseja alcançar, seja ampliação de mercado ou alcançar um nicho específico.</li>
                  <li><span className="font-medium text-white">Entrar com Dados:</span> Insira dados relevantes da sua base e dos seus consumidores para uma análise inicial.</li>
                  <li><span className="font-medium text-white">Análise Inteligente:</span> Deixe a IA trabalhar com sua magia, ofereça insights sobre comportamentos e padrões.</li>
                  <li><span className="font-medium text-white">Implementação:</span> Ajuste sua estratégia baseada nas recomendações geradas.</li>
                </ol>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Por Que Escolher o MK Ranker?</h2>
                <p className="text-gray-300 mb-6">
                  O MK Ranker não apenas identifica audiências, mas transforma sua estratégia de maneira a torná-la mais envolvente. Com um treinamento extensivo e prompts especializados, essa ferramenta se destaca ao oferecer um serviço que não é apenas inovador, mas absolutamente essencial para quem deseja se destacar na era digital.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Ao utilizar o gerador de público-alvo IA do MK Ranker, sua empresa não apenas evolui para um patamar elevado de interação com seus clientes, mas também entra em um ciclo de constante crescimento e adaptação. Tornar-se um líder em seu nicho nunca foi tão simples.
                </p>
                
                <div className="bg-[#252525] rounded-lg p-6 border border-gray-700 mt-10">
                  <p className="text-gray-300 text-lg">
                    A revolução da Inteligência Artificial está apenas começando. Aproveite essa oportunidade para elevar sua marca a um novo nível de eficiência e personalização. Não espere mais, entre em contato conosco e descubra como o gerador de público-alvo IA pode transformar a forma como você interage com seu mercado!
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-gray-400 text-sm" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <meta itemProp="name" content="MKRanker" />
              </div>
              <meta itemProp="datePublished" content="2023-05-15" />
              <meta itemProp="dateModified" content="2025-05-20" />
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
