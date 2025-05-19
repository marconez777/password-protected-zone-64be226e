
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/providers/auth';

const HomeNavbar = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-transparent px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center ml-[10%]">
        <Logo variant="dark" showText={true} className="h-8" />
      </div>
      
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
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}>
              <Link
                to="/recursos"
                className="text-white hover:opacity-90 flex items-center gap-1 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
              >
                Recursos <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              
              {isResourcesOpen && (
                <div className="absolute left-0 top-full mt-2 bg-[#222222] rounded-md shadow-lg z-50 min-w-[240px]">
                  <ul className="py-2">
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Funil de Busca
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Palavras-chave
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Mercado e Público-alvo
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para LP
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para Produto
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Texto SEO para Blog
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
                        Pautas para Blog
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/cadastro" className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all">
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
      
      <div className="mr-[10%]">
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
    </nav>
  );
};

export default HomeNavbar;
