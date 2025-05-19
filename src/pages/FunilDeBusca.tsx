
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Search, ArrowRight, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('overview');
  
  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'inicio', label: 'Início do Funil' },
    { id: 'meio', label: 'Meio do Funil' },
    { id: 'final', label: 'Final do Funil' },
    { id: 'exemplos', label: 'Exemplos' },
    { id: 'tutorial', label: 'Tutorial' },
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
                  <button
                    key={item.id}
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      activeItem === item.id
                        ? 'bg-[#805af5] text-white'
                        : 'text-gray-300 hover:bg-[#805af5]/20'
                    }`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    {item.label}
                  </button>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">O que é um Funil de Busca?</h2>
                <p className="text-gray-300 mb-6">
                  Um funil de busca é uma estrutura de conteúdo SEO onde você cria páginas específicas para cada estágio da jornada do usuário, 
                  desde a consciência inicial até a decisão de compra. Isso permite que você capture tráfego de pesquisa em vários estágios 
                  e guie os usuários através da jornada de conversão.
                </p>
                
                {/* Image with zoom functionality */}
                <div className="my-10 relative group">
                  <img 
                    src="/lovable-uploads/7ec91621-a082-4c9e-aeb7-343df8c0e37f.png" 
                    alt="Exemplo de Funil de Busca" 
                    className="w-full rounded-lg border border-gray-700"
                  />
                  <a 
                    href="/lovable-uploads/7ec91621-a082-4c9e-aeb7-343df8c0e37f.png" 
                    target="_blank"
                    className="absolute right-4 top-4 bg-black/70 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity"
                    title="Ver em tamanho maior"
                  >
                    <ZoomIn size={20} className="text-white" />
                  </a>
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
