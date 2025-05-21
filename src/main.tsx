
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { HelmetProvider } from 'react-helmet-async';

// Função para criar e injetar snapshots específicos de SEO para cada página
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

// Função para sincronizar URL com metadados específicos de pré-renderização
const updateMetaTagsForRoute = () => {
  const path = window.location.pathname;
  let title, description, canonicalUrl, pageType;
  
  // Define metadados específicos com base na URL atual
  if (path === '/' || path === '') {
    pageType = 'home';
  } else if (path === '/recursos') {
    pageType = 'recursos';
    title = 'Recursos da MKRanker | Ferramentas de SEO com Inteligência Artificial';
    description = 'Conheça todas as ferramentas de SEO com I.A. da MKRanker e potencialize sua estratégia de conteúdo, palavras-chave e análise de mercado.';
    canonicalUrl = 'https://mkranker.com.br/recursos';
  } else if (path.startsWith('/recursos/')) {
    pageType = 'recurso-detalhe';
  } else if (path === '/blog') {
    pageType = 'blog';
    title = 'Blog MKRanker | Dicas e Estratégias de SEO';
    description = 'Confira as melhores dicas e estratégias de SEO para melhorar o rankeamento do seu site nos mecanismos de busca.';
    canonicalUrl = 'https://mkranker.com.br/blog';
  } else if (path.startsWith('/blog/')) {
    pageType = 'blog-post';
  }
  
  // Atualiza o meta tag de tipo de página
  if (pageType) {
    const pageTypeElement = document.getElementById('pageType');
    if (pageTypeElement && pageTypeElement instanceof HTMLMetaElement) {
      pageTypeElement.content = pageType;
    }
  }
  
  // Atualiza outros metadados se disponíveis
  if (title && description && canonicalUrl) {
    document.title = title;
    
    const updateMetaContent = (id: string, content: string) => {
      const element = document.getElementById(id);
      if (element && element instanceof HTMLMetaElement) {
        element.content = content;
      }
    };
    
    // Atualiza os metadados básicos
    updateMetaContent('ogTitle', title);
    updateMetaContent('ogDescription', description);
    updateMetaContent('ogUrl', canonicalUrl);
    updateMetaContent('twitterTitle', title);
    updateMetaContent('twitterDescription', description);
    
    // Atualiza o link canônico
    const canonicalElement = document.getElementById('canonicalUrl');
    if (canonicalElement && canonicalElement instanceof HTMLLinkElement) {
      canonicalElement.href = canonicalUrl;
    }
  }
};

// Executa a atualização inicial dos metadados
document.addEventListener('DOMContentLoaded', updateMetaTagsForRoute);

// Configura observador para mudanças na URL
const originalPushState = history.pushState;
history.pushState = function() {
  originalPushState.apply(this, arguments);
  updateMetaTagsForRoute();
};

const originalReplaceState = history.replaceState;
history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  updateMetaTagsForRoute();
};

window.addEventListener('popstate', updateMetaTagsForRoute);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <App />
    <SonnerToaster position="bottom-right" />
  </HelmetProvider>
);
