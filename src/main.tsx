
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
    seoContainer.style.top = '0';
    seoContainer.style.left = '0';
    seoContainer.style.opacity = '0.01'; // Quase invisível, mas ainda legível para crawlers
    
    seoContentElements.forEach(element => {
      if (element instanceof HTMLMetaElement && element.content) {
        seoContainer.innerHTML += element.content;
      }
    });
    
    document.body.appendChild(seoContainer);
    console.log('SEO content injected directly into HTML');
  }
};

// Executa antes da hidratação do React
document.addEventListener('DOMContentLoaded', injectSEOContent);

// Configuração mais robusta do Helmet para garantir que os metadados sejam aplicados corretamente
const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <App />
    <SonnerToaster position="bottom-right" />
  </HelmetProvider>
);
