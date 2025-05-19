
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('funil');
  
  // Updated sidebar items with correct paths
  const sidebarItems = [
    { id: 'funil', label: 'Funil de Busca', path: '/sobre-funil-de-busca' },
    { id: 'palavras-chave', label: 'Palavras-chave', path: '/sobre-keywords' },
    { id: 'mercado', label: 'Mercado e Público-alvo', path: '/sobre-market-and-target' },
    { id: 'texto-seo-lp', label: 'Texto SEO para LP', path: '/sobre-texto-seo-lp' },
    { id: 'texto-seo-produto', label: 'Texto SEO para Produto', path: '/sobre-texto-seo-produto' },
    { id: 'texto-seo-blog', label: 'Texto SEO para Blog', path: '/sobre-texto-seo-blog' },
    { id: 'pautas-blog', label: 'Pautas para Blog', path: '/sobre-pautas-blog' },
    { id: 'meta-dados', label: 'Meta Dados', path: '/sobre-meta-dados' },
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
              <h1 className="text-3xl font-bold text-white mb-6">Funil de Busca</h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  Um funil de busca é uma estratégia de SEO que estrutura o conteúdo do seu site para capturar usuários em diferentes estágios da jornada de compra, desde a descoberta inicial até a decisão final de aquisição.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">O que é um Funil de Busca?</h2>
                <p className="text-gray-300 mb-6">
                  Um funil de busca é uma estrutura de conteúdo SEO onde você cria páginas específicas para cada estágio da jornada do usuário, 
                  desde a consciência inicial até a decisão de compra. Isso permite que você capture tráfego de pesquisa em vários estágios 
                  e guie os usuários através da jornada de conversão.
                </p>
                
                {/* Simple image without zoom functionality */}
                <div className="my-10">
                  <img 
                    src="/lovable-uploads/7ec91621-a082-4c9e-aeb7-343df8c0e37f.png" 
                    alt="Exemplo de Funil de Busca" 
                    className="w-full rounded-lg border border-gray-700"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Como criar um Funil de Busca eficiente</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <Search size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Pesquisa de palavras-chave</h3>
                      <p className="text-gray-300">Identifique termos em diferentes estágios do funil: informacionais, comerciais e transacionais.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#805af5] rounded-full p-2 mt-1">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Mapeamento de conteúdo</h3>
                      <p className="text-gray-300">Crie conteúdo específico para cada estágio, ajustando tom, formato e CTAs.</p>
                    </div>
                  </div>
                </div>
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
