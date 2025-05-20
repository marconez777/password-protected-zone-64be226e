
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { HelmetProvider } from 'react-helmet-async';

// Cria um elemento para injetar o conteúdo SEO diretamente no HTML
const injectSEOContent = () => {
  const seoContentElements = document.querySelectorAll('meta[name="seo-content"]');
  
  if (seoContentElements.length > 0) {
    const seoContainer = document.createElement('div');
    seoContainer.id = 'seo-content-container';
    seoContainer.className = 'seo-content';
    seoContainer.style.position = 'absolute';
    seoContainer.style.width = '0';
    seoContainer.style.height = '0';
    seoContainer.style.overflow = 'hidden';
    
    seoContentElements.forEach(element => {
      if (element instanceof HTMLMetaElement && element.content) {
        seoContainer.innerHTML += element.content;
      }
    });
    
    document.body.appendChild(seoContainer);
    console.log('SEO content injected directly into HTML');
  }
};

// Função para checar se estamos no navegador
const isBrowser = typeof window !== 'undefined';

// Executa antes da hidratação do React apenas no navegador
if (isBrowser) {
  document.addEventListener('DOMContentLoaded', injectSEOContent);
}

// Hydratação condicional - apenas no navegador
if (isBrowser) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    if (rootElement.innerHTML === '') {
      // Renderização inicial no cliente
      createRoot(rootElement).render(
        <HelmetProvider>
          <App />
          <SonnerToaster position="bottom-right" />
        </HelmetProvider>
      );
    } else {
      // Hidratação do HTML pré-renderizado
      createRoot(rootElement).hydrate(
        <HelmetProvider>
          <App />
          <SonnerToaster position="bottom-right" />
        </HelmetProvider>
      );
    }
  }
}

// Exportamos App para SSR
export { App };
