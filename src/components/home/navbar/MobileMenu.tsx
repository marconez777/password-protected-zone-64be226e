
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import NavbarDropdownItem from './NavbarDropdownItem';
import { useAuth } from '@/providers/auth';

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  isResourcesOpen: boolean;
  setIsResourcesOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen,
  closeMenu,
  isResourcesOpen,
  setIsResourcesOpen
}) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4">
          <Logo variant="dark" showText={true} className="h-8" />
          <button 
            onClick={closeMenu}
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
                onClick={closeMenu}
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
                  onClick={closeMenu}
                >
                  Recursos
                </Link>
                <ChevronDown className={`h-5 w-5 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isResourcesOpen && (
                <ul className="pl-4 space-y-2 mt-2">
                  <NavbarDropdownItem to="/recursos/funil-de-busca-com-ia" onClick={closeMenu}>
                    Funil de Busca
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/palavras-chave-com-ia" onClick={closeMenu}>
                    Palavras-chave
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/mercado-e-publico-alvo-com-ia" onClick={closeMenu}>
                    Mercado e Público-alvo
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/texto-seo-lp-com-ia" onClick={closeMenu}>
                    Texto SEO para LP
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/texto-seo-produto-com-ia" onClick={closeMenu}>
                    Texto SEO para Produto
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/texto-seo-blog-com-ia" onClick={closeMenu}>
                    Texto SEO para Blog
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/pautas-blog-com-ia" onClick={closeMenu}>
                    Pautas para Blog
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="/recursos/meta-dados-com-ia" onClick={closeMenu}>
                    Meta Dados
                  </NavbarDropdownItem>
                  <NavbarDropdownItem to="#" isUpcoming>
                    Gerador de Imagens
                  </NavbarDropdownItem>
                </ul>
              )}
            </li>
            <li>
              <Link 
                to="/cadastro" 
                className="text-white text-xl block py-2"
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/cadastro" 
                className="text-white text-xl block py-2"
                onClick={closeMenu}
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
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/cadastro"
              className="block w-full text-center border border-[#805af5] text-white rounded-md px-6 py-3 hover:bg-[#805af5]/20 transition"
              onClick={closeMenu}
            >
              Assinar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
