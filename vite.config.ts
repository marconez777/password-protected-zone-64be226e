
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { Plugin } from 'vite';

// Função personalizada para pré-renderizar as rotas
function preRenderPlugin(): Plugin {
  return {
    name: 'pre-render-routes',
    closeBundle: async () => {
      console.log('Pre-rendering routes...');
      
      try {
        // Importamos os módulos necessários aqui para evitar problemas durante a compilação
        const { JSDOM } = await import('jsdom');
        const fs = await import('fs');
        const { renderToString } = await import('react-dom/server');
        const { createElement } = await import('react');
        
        // Lê o arquivo HTML base
        const template = fs.readFileSync('./dist/index.html', 'utf-8');
        
        // Rotas a serem pré-renderizadas
        const routes = ['/'];
        
        for (const route of routes) {
          console.log(`Pre-rendering route: ${route}`);
          
          // Simula o DOM para SSR
          const dom = new JSDOM(template);
          // Define tipos explícitos para o objeto global
          (global as any).window = dom.window;
          (global as any).document = dom.window.document;
          (global as any).navigator = dom.window.navigator;
          
          try {
            // Configuração para lidar com módulos JSX no ambiente de SSR
            require('esbuild-register/dist/node').register({
              jsx: true,
              jsxFactory: 'createElement',
              jsxFragmentFactory: 'Fragment',
            });
            
            // Carrega o componente App - usando require diretamente sem path aliases
            const App = require('./src/App.tsx').default;
            
            // Renderiza o componente para string HTML
            const appHtml = renderToString(createElement(App));
            
            // Injeta o HTML no div #root
            const rootElement = dom.window.document.querySelector('#root');
            if (rootElement) {
              rootElement.innerHTML = appHtml;
            }
            
            // Adiciona os meta dados SEO
            const head = dom.window.document.querySelector('head');
            if (head) {
              // Meta tags básicas para SEO
              const metaTags = `
                <meta name="description" content="MKRanker - Automatize o SEO com IA para melhorar seu rankeamento no Google com ferramentas poderosas e estratégias avançadas." />
                <meta name="keywords" content="SEO, marketing digital, IA para SEO, rankeamento Google, estratégias SEO, otimização de sites" />
              `;
              head.innerHTML += metaTags;
            }
            
            // Obtém o HTML final
            const html = dom.serialize();
            
            // Cria as pastas necessárias
            const targetPath = route === '/' ? './dist/index.html' : `./dist${route}/index.html`;
            
            // Escreve o arquivo HTML pré-renderizado
            fs.writeFileSync(targetPath, html, 'utf-8');
            console.log(`Pre-rendered: ${targetPath}`);
          } catch (error) {
            console.error('Error during component rendering:', error);
          }
        }
      } catch (error) {
        console.error('Error during pre-rendering:', error);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'production' && preRenderPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/robots.txt',
          dest: ''
        },
        {
          src: 'public/sitemap.xml',
          dest: ''
        }
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@/components/ui/button', '@/components/ui/card'] // Specify individual UI components instead of the directory
        }
      }
    }
  }
}));
