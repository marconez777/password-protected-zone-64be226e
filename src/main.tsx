
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { HelmetProvider } from 'react-helmet-async';

// Função simplificada que apenas adiciona o container para SEO
const setupSEO = () => {
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
  
  document.body.appendChild(seoContainer);
};

// Executa antes da hidratação do React para preparar o contêiner SEO
document.addEventListener('DOMContentLoaded', setupSEO);

// Configuração do Helmet para gerenciar metadados por rota
const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <App />
    <SonnerToaster position="bottom-right" />
  </HelmetProvider>
);
