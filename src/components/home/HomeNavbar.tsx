
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/providers/auth';
import { useIsMobile } from '@/hooks/use-mobile';

const HomeNavbar = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Function to start the auto-close timer
  const startAutoCloseTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer to close the dropdown after 4 seconds
    timerRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 4000); // 4 seconds
  };
  
  // Reset timer when dropdown state changes
  useEffect(() => {
    if (isResourcesOpen) {
      startAutoCloseTimer();
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    return () => {
      // Clean up timer on component unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isResourcesOpen]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-transparent px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center ml-[10%] md:ml-[10%]">
        <Logo variant="dark" showText={true} className="h-8" />
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="bg-[#222222] rounded-full px-4 py-2">
          <ul className="flex items-center space-x-8">
            <li className="relative group">
              <Link 
                to="/" 
                className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
              >
                Home
              </Link>
            </li>
            <li className="relative group" 
                ref={resourcesRef}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseMove={() => isResourcesOpen && startAutoCloseTimer()}>
              <Link
                to="/recursos"
                className="text-white hover:opacity-90 flex items-center gap-1 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
              >
                Recursos <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              
              {isResourcesOpen && (
                <div 
                  className="absolute left-0 top-full mt-2 bg-[#222222] rounded-md shadow-lg z-50 min-w-[240px]"
                  onMouseMove={() => startAutoCloseTimer()}
                  onMouseEnter={() => startAutoCloseTimer()}>
                  <ul className="py-2">
                    <li className="group">
                      <Link to="/recursos/funil-de-busca-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Funil de Busca
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/palavras-chave-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Palavras-chave
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/mercado-e-publico-alvo-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Mercado e Público-alvo
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/texto-seo-lp-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para LP
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/texto-seo-produto-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para Produto
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/texto-seo-blog-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para Blog
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/pautas-blog-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Pautas para Blog
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/recursos/meta-dados-com-ia" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Meta Dados
                      </Link>
                    </li>
                    <li className="flex items-center px-4 py-2 text-white hover:bg-[#cd99ff]/10 group">
                      <span>Gerador de Imagens</span>
                      <span className="ml-2 bg-[#805af5] text-xs text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        em breve
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative group">
              <Link 
                to="/cadastro" 
                className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
              >
                Blog
              </Link>
            </li>
            <li className="relative group">
              <Link 
                to="/cadastro" 
                className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
              >
                Treinamentos
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu Trigger */}
      <div className="flex md:hidden items-center mr-2">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 rounded-full hover:bg-[#805af5]/20"
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>
      
      {/* CTA Button */}
      <div className="mr-[10%] hidden md:block">
        {user ? (
          <Link
            to="/dashboard"
            className="border border-[#805af5] text-white rounded-md px-6 py-2 hover:bg-[#805af5]/20 transition"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/cadastro"
            className="border border-[#805af5] text-white rounded-md px-6 py-2 hover:bg-[#805af5]/20 transition"
          >
            Assinar
          </Link>
        )}
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4">
              <Logo variant="dark" showText={true} className="h-8" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col p-4">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="text-white text-xl block py-2"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div 
                    className="flex items-center justify-between text-white text-xl py-2"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  >
                    <Link 
                      to="/recursos"
                      className="text-white flex-1"
                      onClick={closeMobileMenu}
                    >
                      Recursos
                    </Link>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isResourcesOpen && (
                    <ul className="pl-4 space-y-2 mt-2">
                      <li>
                        <Link 
                          to="/recursos/funil-de-busca-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Funil de Busca
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/palavras-chave-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Palavras-chave
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/mercado-e-publico-alvo-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Mercado e Público-alvo
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/texto-seo-lp-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Texto SEO para LP
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/texto-seo-produto-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Texto SEO para Produto
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/texto-seo-blog-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Texto SEO para Blog
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/pautas-blog-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Pautas para Blog
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/recursos/meta-dados-com-ia" 
                          className="text-white/80 block py-1"
                          onClick={closeMobileMenu}
                        >
                          Meta Dados
                        </Link>
                      </li>
                      <li className="flex items-center py-1">
                        <span className="text-white/80">Gerador de Imagens</span>
                        <span className="ml-2 bg-[#805af5] text-xs text-white px-2 py-0.5 rounded-full">
                          em breve
                        </span>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link 
                    to="/cadastro" 
                    className="text-white text-xl block py-2"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cadastro" 
                    className="text-white text-xl block py-2"
                    onClick={closeMobileMenu}
                  >
                    Treinamentos
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="p-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="block w-full text-center border border-[#805af5] text-white rounded-md px-6 py-3 hover:bg-[#805af5]/20 transition"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/cadastro"
                  className="block w-full text-center border border-[#805af5] text-white rounded-md px-6 py-3 hover:bg-[#805af5]/20 transition"
                  onClick={closeMobileMenu}
                >
                  Assinar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
