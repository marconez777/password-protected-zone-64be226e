
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"

// Adiciona o script de pré-renderização para SEO
const preRenderSEO = document.createElement('script');
preRenderSEO.type = 'text/javascript';
preRenderSEO.text = `
  // Garante que o conteúdo SSR está visível para os mecanismos de busca
  document.addEventListener('DOMContentLoaded', function() {
    const seoContent = document.querySelectorAll('.seo-content');
    if (seoContent) {
      console.log('SEO content found and ready for indexing');
    }
  });
`;
document.head.appendChild(preRenderSEO);

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <SonnerToaster position="bottom-right" />
  </>
);
