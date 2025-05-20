import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SonnerToaster } from "./components/ui"
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

// Hidratação condicional - apenas no navegador
if (isBrowser) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    
    if (rootElement.innerHTML === '') {
      // Renderização inicial no cliente
      root.render(
        <HelmetProvider>
          <App />
          <SonnerToaster position="bottom-right" />
        </HelmetProvider>
      );
    } else {
      // Hidratação do HTML pré-renderizado
      // Nota: Na API atual do React 18, o método hydrateRoot substituiu hydrate
      root.render(
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
