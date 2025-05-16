
import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#0c0a11] pt-16 pb-6 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Newsletter */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/f9dd956a-b8fd-41f7-9443-284daab02a2e.png" 
                alt="MKRanker Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="mb-6 text-sm">
              Utilizamos as melhores tecnologias de IA para otimizar seu conteúdo SEO
            </p>
            <div className="mb-6">
              <h3 className="font-medium mb-4">Inscreva-se na Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail aqui" 
                  className="px-4 py-2 bg-[#121016] border border-gray-800 rounded-l-md flex-1 text-sm"
                />
                <Button 
                  type="button" 
                  className="bg-[#805af5] hover:bg-[#6a4ac9] rounded-l-none"
                >
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M1 7.5H12M12 7.5L7 2.5M12 7.5L7 12.5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h3 className="font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="/#" className="hover:text-white transition-colors">Página Inicial</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="/cadastro" className="hover:text-white transition-colors">Cadastro</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Preços</a></li>
            </ul>
          </div>
          
          {/* Serviços */}
          <div>
            <h3 className="font-medium mb-4">Serviços</h3>
            <ul className="space-y-3">
              <li><a href="/keywords" className="hover:text-white transition-colors">Palavras-chave</a></li>
              <li><a href="/search-funnel" className="hover:text-white transition-colors">Funil de Busca</a></li>
              <li><a href="/market-and-target" className="hover:text-white transition-colors">Mercado e Público-alvo</a></li>
              <li><a href="/texto-seo-lp" className="hover:text-white transition-colors">Texto SEO para LP</a></li>
              <li><a href="/texto-seo-produto" className="hover:text-white transition-colors">Texto SEO para Produto</a></li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="font-medium mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#805af5]" />
                <span>São Paulo, Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#805af5]" />
                <a href="mailto:contato@mkranker.com" className="hover:text-white transition-colors">
                  contato@mkranker.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#805af5]" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  +55 11 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} MKRanker. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Termos e Condições
            </a>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#805af5] hover:bg-[#6a4ac9] rounded-full w-10 h-10 p-0 shadow-lg"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
};

export default Footer;
