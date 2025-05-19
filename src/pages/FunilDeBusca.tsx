
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('funil');
  
  // Updated sidebar items with new URL pattern
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
      
      <div className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-white">Home</Link> {" > "} 
          <Link to="/recursos" className="hover:text-white">recursos</Link> {" > "} 
          <span className="text-white">Funil de Busca</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Fixed with scrollable content */}
          <div className="lg:w-1/4 xl:w-1/5">
            <div className="bg-[#1A1A1A] rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-6">Recursos de I.A</h3>
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                      activeItem === item.id
                        ? 'bg-[#805af5] text-white'
                        : 'text-gray-300 hover:bg-[#805af5]/20'
                    }`}
                    onClick={(e) => {
                      if (item.soon) {
                        e.preventDefault();
                      } else {
                        setActiveItem(item.id);
                      }
                    }}
                  >
                    {item.label}
                    {item.soon && (
                      <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white">
                        em breve
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <div className="bg-[#1A1A1A] rounded-lg p-8">
              <h1 className="text-3xl font-bold text-white mb-6">Mapeamento do Funil de Busca de SEO com IA</h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  No atual cenário digital, entender e otimizar o Funil de Busca de SEO com I.A tornou-se essencial para qualquer negócio que deseja se destacar online. O uso de Inteligência Artificial (I.A) nesse contexto não só potencializa a descoberta de oportunidades dentro do micro nicho, mas também refina estratégias para atingir o público-alvo desejado e explorar com máximo aproveitamento o segmento de atuação.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">O Poder do Funil de Busca de SEO com I.A</h2>
                <p className="text-gray-300 mb-6">
                  Integrar a I.A ao Funil de Busca de SEO é uma estratégia poderosa que transforma a forma como empresas criam e disponibilizam conteúdo em cada etapa da jornada do cliente. No topo do funil, a I.A pode sugerir temas que capturam a atenção inicial do usuário, utilizando palavras-chave relevantes que correspondem às tendências de pesquisa atuais. Isso é essencial para plantar a semente do interesse, orientando potenciais clientes para o meio do funil.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Por exemplo, se você está operando em um micro nicho específico, as ferramentas de pesquisa de palavras-chave podem revelar queries mais amplas que introduzem seu produto ou serviço ao público. Isso é crucial para aumentar a visibilidade no Google e assegurar que seu conteúdo alcance novos olhos. Nesse estágio, compreender quais palavras-chave relacionadas estão em alta permite redigir artigos, blogs ou vídeos que ressoem com as necessidades iniciais dos consumidores.
                </p>

                {/* First image - Form */}
                <div className="my-10">
                  <img 
                    src="/lovable-uploads/69ab3bea-3112-4cf4-aed5-d95928ba67d1.png" 
                    alt="Formulário do Funil de Busca" 
                    className="w-full rounded-lg border border-gray-700"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Meio do Funil: Conduzindo o Interesse</h2>
                <p className="text-gray-300 mb-6">
                  À medida que os usuários se movem para o meio do funil, eles buscam informações mais detalhadas que respondam a perguntas específicas sobre seus produtos ou serviços. Aqui, o Funil de Busca de SEO com I.A é vital para sugerir conteúdos que abordem as preocupações e dúvidas comuns do público-alvo. Isso não apenas engaja os leads, mas estabelece sua autoridade no segmento.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Imagine que sua empresa venda um software de gestão corporativa. Utilizando I.A, você pode identificar quais aspectos do software são mais pesquisados e elaborar guias, estudos de caso e tutoriais que respondam diretamente a essas pesquisas. O uso estratégico de palavras-chave do Google aqui é fundamental para ressaltar as soluções que sua empresa oferece, aproximando ainda mais o consumidor da decisão de compra.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Fundo do Funil: Convertendo em Ação</h2>
                <p className="text-gray-300 mb-6">
                  No fundo do funil, o principal objetivo é converter o interesse genuíno em ação, seja através de compras ou assinatura de serviços. Nesse ponto, o conteúdo deve ser direcionado, claro e carregado de provas sociais ou depoimentos que instiguem confiança. O Funil de Busca de SEO com I.A auxilia na criação de landing pages otimizadas que captem leads e impulsionem conversões.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Por meio de análises preditivas e insights fornecidos por ferramentas de pesquisa de palavras-chave, identifica-se quais fatores de conversão são mais eficazes no seu segmento. Assim, sua equipe pode produzir conteúdos persuasivos que destacam as vantagens competitivas da sua oferta, sempre com uma call to action (CTA) clara para instigar a finalização da jornada de compra.
                </p>

                {/* Second image - Results */}
                <div className="my-10">
                  <img 
                    src="/lovable-uploads/2b11dd71-c3e5-4785-a3b7-520329a54b03.png" 
                    alt="Resultado do Funil de Busca" 
                    className="w-full rounded-lg border border-gray-700"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ferramentas de Pesquisa de Palavras-chave: O Aliado Essencial</h2>
                <p className="text-gray-300 mb-6">
                  No contexto do Funil de Busca de SEO com I.A, as ferramentas de pesquisa de palavras-chave continuam sendo aliadas fundamentais. Embora a I.A traga um nível avançado de personalização e eficiência, essas ferramentas oferecem a base de análise e entender o comportamento do usuário nos mecanismos de busca.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Estudos indicam que integrar palavras-chave do Google em contextos estratégicos ajuda radicalmente a melhorar a indexação e o posicionamento do seu conteúdo. Aplicar corretamente essas palavras-chave contribui diretamente para despertar o interesse em fases iniciais e fomentar uma decisão no final do funil.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Descubra Agora Mesmo o Potencial do Seu Negócio com Nossas Soluções em SEO com I.A</h2>
                <p className="text-gray-300 mb-6">
                  A combinação do Funil de Busca de SEO com I.A pode revitalizar toda estratégia digital e melhorar seu alcance no mercado. Experimente nossas soluções e transforme sua presença online, entre em contato conosco para saber mais!
                </p>
              </div>
            </div>
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

export default FunilDeBusca;
