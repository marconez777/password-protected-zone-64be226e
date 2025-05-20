
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { KeyRound, BarChart, Search, Users, FileText } from 'lucide-react';
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
      <h1>Descubra o Poder da Pesquisa de Palavras-Chave com IA do Gemini Treinada</h1>
      <p>A Pesquisa de palavras-chave com IA está revolucionando a maneira como as empresas planejam suas estratégias de marketing digital. Com a tecnologia avançada do Gemini Treinada, você pode transformar seus esforços online e superar a concorrência.</p>
      
      <h2>Por Que a Pesquisa de Palavras-Chave com IA é Essencial?</h2>
      <p>No ambiente digital de hoje, a visibilidade é fundamental. As palavras-chave são o cerne de qualquer estratégia de SEO bem-sucedida. A Seleção precisa de palavras-chave adequadas pode determinar o sucesso ou fracasso da sua campanha online.</p>
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
        keywords="palavras-chave, SEO, pesquisa de palavras-chave, ferramenta SEO, tráfego orgânico, MKRanker, inteligência artificial, Gemini Treinada"
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
              <h1 className="text-3xl font-bold text-white mb-6" itemProp="headline">Descubra o Poder da Pesquisa de Palavras-Chave com IA do Gemini Treinada</h1>
              
              <div className="prose prose-invert max-w-none" itemProp="articleBody">
                <p className="text-gray-300 mb-6">
                  A Pesquisa de palavras-chave com IA está revolucionando a maneira como as empresas planejam suas estratégias de marketing digital. Com a tecnologia avançada do Gemini Treinada, você pode transformar seus esforços online e superar a concorrência. Neste artigo, exploraremos como essa ferramenta inovadora pode alavancar sua presença digital e impulsionar suas conversões.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Por Que a Pesquisa de Palavras-Chave com IA é Essencial?</h2>
                <p className="text-gray-300 mb-4">
                  No ambiente digital de hoje, a visibilidade é fundamental. As palavras-chave são o cerne de qualquer estratégia de SEO bem-sucedida. A Seleção precisa de palavras-chave adequadas pode determinar o sucesso ou fracasso da sua campanha online. A Pesquisa de palavras-chave com IA não só identifica as melhores palavras-chave para o seu negócio, mas também otimiza sua aplicação para maximizar resultados.
                </p>

                <p className="text-gray-300 mb-6">
                  O diferencial da Pesquisa de palavras-chave com IA do Gemini Treinada é sua capacidade de gerar sugestões de palavras-chave relacionadas, ampliando seu alcance semântico. Isso significa que, além de atingir diretamente seu público-alvo, você também enriquece seu conteúdo com termos que os motores de busca identificam como relevantes, melhorando assim seu ranqueamento.
                </p>
                
                <figure className="my-10">
                  <img 
                    src="/lovable-uploads/5f757a61-e103-477f-aa41-21bcc970de63.png" 
                    alt="Pesquisa de Palavras-chave com IA do Gemini Treinada" 
                    className="w-full rounded-lg border border-gray-700"
                    loading="lazy"
                    itemProp="image"
                  />
                  <figcaption className="text-xs text-center text-gray-400 mt-2">Ferramenta de pesquisa de palavras-chave com IA Gemini Treinada</figcaption>
                </figure>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Vantagens da Ferramenta de Pesquisa de Palavras-Chave com IA</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Search size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Precisão Avançada</h3>
                      <p className="text-gray-300">Ao contrário dos métodos tradicionais, a tecnologia de IA do Gemini Treinada analisa grandes volumes de dados em tempo real, garantindo que você sempre trabalhe com as informações mais atualizadas e relevantes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <KeyRound size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Sugestões de Palavras-Chave Relacionadas</h3>
                      <p className="text-gray-300">Um dos recursos mais valiosos é o gerador de palavras-chave relacionadas. Esta funcionalidade sugere palavras-chave complementares à sua palavra em foco, enriquecendo seu conteúdo e ampliando seu campo semântico.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <FileText size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Melhora o Conteúdo sem Esforço</h3>
                      <p className="text-gray-300">Com termos semânticos cuidadosamente sugeridos, seu conteúdo não só se torna mais rico, mas também facilita a compreensão do seu público, enquanto captura a atenção dos motores de busca.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Experiência Personalizada</h3>
                      <p className="text-gray-300">A Ferramenta de pesquisa de palavras-chave com IA é adaptável às necessidades específicas de cada usuário, garantindo que as palavras-chave sugeridas estejam alinhadas com seus objetivos de negócios.</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Como Integrar a Pesquisa de Palavras-Chave com IA em Sua Estratégia</h2>
                <p className="text-gray-300 mb-4">
                  A implementação da Pesquisa de palavras-chave com IA na sua estratégia digital envolve algumas etapas cruciais:
                </p>
                
                <ol className="list-decimal list-inside text-gray-300 space-y-4 mb-6 pl-4">
                  <li>
                    <span className="font-medium text-white">Escolher a Palavra-Chave Correta:</span> Comece identificando uma palavra em foco que resuma seu produto ou serviço. Utilize o recurso de gerador de palavras-chave com IA para expandir essa base inicial, considerando sempre as sugestões de termos relacionados que a ferramenta oferece.
                  </li>
                  <li>
                    <span className="font-medium text-white">Enriquecer o Conteúdo com Termos Semânticos:</span> Incorporando palavras-chave relacionadas sugeridas pela ferramenta, você pode melhorar a compreensão e o engajamento do conteúdo. Ferramentas de pesquisa de palavras-chave com IA são perfeitas para essa tarefa.
                  </li>
                  <li>
                    <span className="font-medium text-white">Monitore e Ajuste Regularmente:</span> O ambiente online está em constante evolução. Revise suas escolhas e ajuste suas estratégias com base no desempenho das palavras-chave. As ferramentas de pesquisa de palavras-chave com IA oferecem insights valiosos para apoiar esse processo de ajuste.
                  </li>
                </ol>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Benefícios Comprovados</h2>
                <p className="text-gray-300 mb-4">
                  As empresas que adotam a Pesquisa de palavras-chave com IA do Gemini Treinada têm visto melhorias significativas no tráfego de seus sites e no engajamento dos usuários. A otimização com palavras-chave relacionadas contribui para um melhor posicionamento nos motores de busca, resultando em maior visibilidade e oportunidades de conversão.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Incorporar palavras-chave relacionadas e otimizar para termos semânticos são passos críticos para garantir que seu conteúdo não apenas seja encontrado, mas também apreciado pelo público-alvo. Isso se traduz em credibilidade e autoridade no seu nicho de mercado.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Transforme Seu Negócio Hoje</h2>
                <p className="text-gray-300 mb-4">
                  A tecnologia de IA pode parecer complexa, mas a integração de suas capacidades na estratégia de palavras-chave do seu negócio nunca foi tão simples. Aproveite o poder da pesquisa de palavras-chave com IA para posicionar seu negócio à frente da concorrência.
                </p>
                
                <p className="text-gray-300 mb-4">
                  Comece agora a otimizar sua estratégia digital com a Pesquisa de palavras-chave com IA do Gemini Treinada. Transforme suas campanhas com uma abordagem baseada em dados e alcance novos patamares de sucesso online.
                </p>
                
                <p className="text-gray-300 mb-6 font-medium">
                  Experimente a eficácia da Pesquisa de palavras-chave com IA e veja a diferença.
                </p>
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

export default KeywordsPublic;
