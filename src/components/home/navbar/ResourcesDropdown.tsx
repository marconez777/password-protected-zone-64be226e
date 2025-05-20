
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavbarDropdownItem from './NavbarDropdownItem';

interface ResourcesDropdownProps {
  isMobile?: boolean;
}

const ResourcesDropdown: React.FC<ResourcesDropdownProps> = ({ isMobile = false }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`inline-flex items-center gap-1 font-medium transition-colors ${
            isMobile
              ? 'text-gray-300 hover:text-white w-full justify-between'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span>Recursos</span>
          {isMobile ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`w-[240px] ${
          isMobile ? 'bg-[#252525] text-white border-gray-700' : ''
        }`}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/funil-de-busca-com-ia"
              title="Funil de Busca"
              description="Palavras-chave para cada etapa do funil"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/palavras-chave-com-ia"
              title="Palavras-chave"
              description="Encontre palavras-chave relevantes"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/mercado-e-publico-alvo-com-ia"
              title="Mercado e Público-alvo"
              description="Defina seu mercado e público ideal"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/texto-seo-lp-com-ia"
              title="Texto SEO para LP"
              description="Crie textos otimizados para landing pages"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/texto-seo-produto-com-ia"
              title="Texto SEO para Produto"
              description="Otimize descrições de produtos"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/texto-seo-blog-com-ia"
              title="Texto SEO para Blog"
              description="Gere conteúdo otimizado para blogs"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/pautas-blog-com-ia"
              title="Pautas para Blog"
              description="Crie pautas de conteúdo relevantes"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/recursos/meta-dados-com-ia"
              title="Meta Dados"
              description="Otimize meta tags para SEO"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavbarDropdownItem
              href="/blog"
              title="Blog"
              description="Artigos e novidades sobre SEO"
              isNew={true}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResourcesDropdown;
