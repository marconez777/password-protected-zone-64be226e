
import React, { useState } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { Search, ArrowRight, ZoomIn, FileText, BookText, ScrollText, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const FunilDeBusca = () => {
  const [activeItem, setActiveItem] = useState('overview');
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'inicio', label: 'Início do Funil' },
    { id: 'meio', label: 'Meio do Funil' },
    { id: 'final', label: 'Final do Funil' },
    { id: 'exemplos', label: 'Exemplos' },
    { id: 'tutorial', label: 'Tutorial' },
  ];
  
  const resourcesItems = [
    { id: 'funnel', label: 'Funil de Busca', icon: Search, path: '/funil-de-busca' },
    { id: 'keywords', label: 'Palavras-chave', icon: KeyRound, path: '/cadastro' },
    { id: 'market', label: 'Mercado e Público-alvo', icon: ArrowRight, path: '/cadastro' },
    { id: 'seo-lp', label: 'Texto SEO para LP', icon: FileText, path: '/cadastro' },
    { id: 'seo-product', label: 'Texto SEO para Produto', icon: FileText, path: '/cadastro' },
    { id: 'seo-blog', label: 'Texto SEO para Blog', icon: FileText, path: '/cadastro' },
    { id: 'blog-topics', label: 'Pautas para Blog', icon: BookText, path: '/cadastro' },
    { id: 'meta-data', label: 'Meta Dados', icon: ScrollText, path: '/cadastro' },
    { id: 'image-gen', label: 'Gerador de Imagens (em breve)', icon: ZoomIn, path: '#', disabled: true },
  ];
  
  const handleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

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
              
              {/* Main Menu Items */}
              <div className="space-y-2 mb-6">
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
              
              {/* Resources Menu Items */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 px-3">
                  Outros Recursos
                </h4>
                <div className="space-y-1 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center w-full text-left py-2 px-3 rounded-md transition-colors ${
                        item.id === 'funnel' 
                          ? 'bg-[#805af5] text-white' 
                          : 'text-gray-300 hover:bg-[#805af5]/20'
                      } ${item.disabled ? 'opacity-60 pointer-events-none' : ''}`}
                    >
                      <item.icon size={16} className="mr-2" />
                      <span className="text-sm">{item.label}</span>
                      {item.disabled && (
                        <span className="ml-2 bg-[#805af5] text-xs text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                          em breve
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
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
                
                {/* Image with enhanced zoom functionality */}
                <div className="my-10 relative group">
                  <div className={`relative overflow-hidden rounded-lg border border-gray-700 transition-all duration-300 ${isImageZoomed ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 border-0' : ''}`}>
                    <img 
                      src="/lovable-uploads/7ec91621-a082-4c9e-aeb7-343df8c0e37f.png" 
                      alt="Exemplo de Funil de Busca" 
                      className={`w-full rounded-lg transition-all duration-300 ${isImageZoomed ? 'max-h-[90vh] object-contain' : ''}`}
                    />
                    <button 
                      onClick={handleImageZoom}
                      className={`absolute transition-all duration-200 bg-black/70 rounded-full p-2 hover:bg-black/90 hover:scale-110 ${
                        isImageZoomed ? 'top-4 right-4 text-white' : 'right-4 top-4 opacity-70 hover:opacity-100'
                      }`}
                      title={isImageZoomed ? "Fechar" : "Ver em tamanho maior"}
                    >
                      <ZoomIn size={20} className="text-white" />
                    </button>
                    
                    {isImageZoomed && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black/70 px-3 py-1 rounded-full animate-fade-in">
                        Clique na imagem ou no botão para fechar
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay for closing when zoomed */}
                  {isImageZoomed && (
                    <div className="fixed inset-0 z-40" onClick={handleImageZoom}></div>
                  )}
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
