
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import Footer from '@/components/home/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { Card } from '@/components/ui/card';

// Sample blog post data
const blogPosts = [
  {
    id: 'seo-keywords',
    title: 'Como escolher as melhores palavras-chave para seu negócio',
    excerpt: 'Aprenda a selecionar palavras-chave que aumentam o tráfego orgânico do seu site e impulsionam sua visibilidade nos motores de busca.',
    date: '15 Mai 2025',
    category: 'SEO',
    image: '/lovable-uploads/99921b84-1992-4489-8005-54c0460c1d75.png'
  },
  {
    id: 'ai-content',
    title: 'O impacto da IA na criação de conteúdo digital',
    excerpt: 'Descubra como a inteligência artificial está transformando a forma como produzimos e consumimos conteúdo na era digital.',
    date: '30 Abr 2025',
    category: 'Tecnologia',
    image: '/lovable-uploads/75378ffa-def0-4577-a5cf-ebe3d48afd0b.png'
  },
  {
    id: 'marketing-digital',
    title: 'Estratégias de marketing digital para 2025',
    excerpt: 'Conheça as principais tendências de marketing digital que vão dominar o mercado no próximo ano.',
    date: '10 Abr 2025',
    category: 'Marketing',
    image: '/lovable-uploads/029bc626-51d0-4d4c-90f5-3e85d9f8ecbf.png'
  },
  {
    id: 'seo-techniques',
    title: 'Técnicas avançadas de SEO para e-commerce',
    excerpt: 'Implementações práticas para otimizar sua loja virtual e aumentar as vendas através do tráfego orgânico.',
    date: '25 Mar 2025',
    category: 'E-commerce',
    image: '/lovable-uploads/98a7a700-de54-4975-8125-56c57bbe4c06.png'
  },
  {
    id: 'content-marketing',
    title: 'Marketing de conteúdo: o guia completo',
    excerpt: 'Aprenda a criar uma estratégia eficaz de marketing de conteúdo para atrair e converter mais clientes.',
    date: '18 Mar 2025',
    category: 'Marketing',
    image: '/lovable-uploads/7ed0757a-3e8f-432a-80b1-255f55a1bced.png'
  },
  {
    id: 'ai-seo',
    title: 'Como usar IA para otimizar seu SEO',
    excerpt: 'Ferramentas e estratégias de inteligência artificial que estão revolucionando o SEO moderno.',
    date: '05 Mar 2025',
    category: 'Tecnologia',
    image: '/lovable-uploads/99921b84-1992-4489-8005-54c0460c1d75.png'
  }
];

// Blog categories with post counts
const categories = [
  { name: "SEO", count: 5 },
  { name: "Marketing", count: 4 },
  { name: "Tecnologia", count: 6 },
  { name: "E-commerce", count: 3 },
  { name: "Conteúdo", count: 2 },
  { name: "Redes Sociais", count: 4 },
];

const BlogPage = () => {
  // SEO JSON-LD data
  const jsonLdData = `
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog MKRanker",
    "description": "Dicas e estratégias de SEO, marketing digital e tecnologia para impulsionar seu negócio online",
    "url": "https://mkranker.com.br/blog"
  }
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Blog sobre SEO e Marketing Digital | MKRanker"
        description="Confira as últimas tendências, dicas e estratégias de SEO, marketing digital e tecnologia para impulsionar seu negócio online."
        keywords="blog seo, marketing digital, tecnologia, conteúdo digital, MKRanker"
        ogImage="https://mkranker.com.br/assets/img/blog-cover.jpg"
        canonicalUrl="https://mkranker.com.br/blog"
        jsonLd={jsonLdData}
      />

      <HomeNavbar />
      
      <main className="px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog MKRanker</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dicas e estratégias de SEO, marketing digital e tecnologia para impulsionar seu negócio online
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content - Posts grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map(post => (
                  <BlogPostCard key={post.id} {...post} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav aria-label="Pagination" className="flex space-x-2">
                  <button
                    className="px-4 py-2 text-sm rounded-md bg-[#1A1A1A] text-gray-400 hover:bg-[#252525]"
                    disabled
                  >
                    Anterior
                  </button>
                  <button
                    className="px-4 py-2 text-sm rounded-md bg-[#805af5] text-white"
                  >
                    1
                  </button>
                  <button
                    className="px-4 py-2 text-sm rounded-md bg-[#1A1A1A] text-gray-400 hover:bg-[#252525]"
                  >
                    2
                  </button>
                  <button
                    className="px-4 py-2 text-sm rounded-md bg-[#1A1A1A] text-gray-400 hover:bg-[#252525]"
                  >
                    3
                  </button>
                  <button
                    className="px-4 py-2 text-sm rounded-md bg-[#1A1A1A] text-gray-400 hover:bg-[#252525]"
                  >
                    Próximo
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="bg-[#1A1A1A] border-gray-800 p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Categorias</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name} className="flex justify-between items-center">
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        {category.name}
                      </a>
                      <span className="text-gray-500 text-sm">{category.count}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="bg-[#1A1A1A] border-gray-800 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Receba nossas atualizações diretamente na sua caixa de entrada
                </p>
                <form>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      placeholder="Seu e-mail" 
                      className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Inscrever-se
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
