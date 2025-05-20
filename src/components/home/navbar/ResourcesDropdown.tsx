
import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavbarDropdownItem from './NavbarDropdownItem';

interface ResourcesDropdownProps {
  isResourcesOpen: boolean;
  setIsResourcesOpen: (isOpen: boolean) => void;
  startAutoCloseTimer: () => void;
  onItemClick: () => void;
}

const ResourcesDropdown: React.FC<ResourcesDropdownProps> = ({
  isResourcesOpen,
  setIsResourcesOpen,
  startAutoCloseTimer,
  onItemClick
}) => {
  const resourcesRef = useRef<HTMLLIElement>(null);

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
  }, [setIsResourcesOpen]);

  return (
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
            <NavbarDropdownItem to="/recursos/funil-de-busca-com-ia" onClick={onItemClick}>
              Funil de Busca
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/palavras-chave-com-ia" onClick={onItemClick}>
              Palavras-chave
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/mercado-e-publico-alvo-com-ia" onClick={onItemClick}>
              Mercado e Público-alvo
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/texto-seo-lp-com-ia" onClick={onItemClick}>
              Texto SEO para LP
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/texto-seo-produto-com-ia" onClick={onItemClick}>
              Texto SEO para Produto
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/texto-seo-blog-com-ia" onClick={onItemClick}>
              Texto SEO para Blog
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/pautas-blog-com-ia" onClick={onItemClick}>
              Pautas para Blog
            </NavbarDropdownItem>
            <NavbarDropdownItem to="/recursos/meta-dados-com-ia" onClick={onItemClick}>
              Meta Dados
            </NavbarDropdownItem>
            <NavbarDropdownItem to="#" isUpcoming>
              Gerador de Imagens
            </NavbarDropdownItem>
          </ul>
        </div>
      )}
    </li>
  );
};

export default ResourcesDropdown;
