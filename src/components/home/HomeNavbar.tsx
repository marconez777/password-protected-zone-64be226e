
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const HomeNavbar = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <nav className="bg-[#1a1423] px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Logo variant="dark" showText={false} className="h-8" />
      </div>
      
      <div className="hidden md:flex items-center justify-center flex-1">
        <ul className="flex items-center space-x-8">
          <li className="relative">
            <Link 
              to="/" 
              className="text-white hover:opacity-90 pb-1 border-b-2 border-[#cd99ff]"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="text-white hover:opacity-90 flex items-center gap-1"
            >
              Recursos <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            {isResourcesOpen && (
              <div className="absolute left-0 top-full mt-2 bg-[#1a1423] rounded-md shadow-lg z-50 min-w-[240px]">
                <ul className="py-2">
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/search-funnel" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Funil de Busca
                    </Link>
                  </li>
                  <li>
                    <Link to="/keywords" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Palavras-chave
                    </Link>
                  </li>
                  <li>
                    <Link to="/market-and-target" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Mercado e Público-alvo
                    </Link>
                  </li>
                  <li>
                    <Link to="/texto-seo-lp" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Texto SEO para LP
                    </Link>
                  </li>
                  <li>
                    <Link to="/texto-seo-produto" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Texto SEO para Produto
                    </Link>
                  </li>
                  <li>
                    <Link to="/texto-seo-blog" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Texto SEO para Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/pautas-blog" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Pautas para Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/meta-dados" className="block px-4 py-2 text-white hover:bg-[#2a2133]">
                      Meta Dados
                    </Link>
                  </li>
                  <li className="flex items-center px-4 py-2 text-white hover:bg-[#2a2133]">
                    Gerador de Imagens
                    <span className="ml-2 bg-[#805af5] text-xs text-white px-2 py-0.5 rounded-full">
                      em breve
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/blog" className="text-white hover:opacity-90">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/treinamentos" className="text-white hover:opacity-90">
              Treinamentos
            </Link>
          </li>
        </ul>
      </div>
      
      <div>
        <Link
          to="/cadastro"
          className="border border-[#805af5] text-white rounded-md px-6 py-2 hover:bg-[#805af5]/20 transition"
        >
          Assinar
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
