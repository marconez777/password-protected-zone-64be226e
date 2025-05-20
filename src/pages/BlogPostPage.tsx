
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import HomeNavbar from '@/components/home/HomeNavbar';
import Footer from '@/components/home/Footer';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

// This is a placeholder component for individual blog posts
// In a real application, you would fetch the post data from an API

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  
  // This is dummy data - in a real app, you would fetch this based on postId
  const post = {
    id: postId,
    title: 'Como escolher as melhores palavras-chave para seu negócio',
    content: `
      <p>No universo do marketing digital, a escolha das palavras-chave certas pode significar a diferença entre ser encontrado ou permanecer invisível. Este guia irá ajudá-lo a navegar pelo processo de seleção de palavras-chave que realmente impulsionam o tráfego orgânico para o seu site.</p>
      
      <h2>Por que as palavras-chave são importantes?</h2>
      <p>As palavras-chave são os termos e frases que os usuários digitam nos motores de busca quando estão procurando informações. Ao otimizar seu conteúdo para essas palavras-chave, você aumenta suas chances de aparecer nos resultados de pesquisa relevantes.</p>
      
      <h2>Como iniciar sua pesquisa de palavras-chave</h2>
      <p>Comece pensando como seu cliente ideal. Quais termos ele usaria para encontrar seus produtos ou serviços? Faça uma lista inicial dessas palavras e frases.</p>
      
      <h2>Ferramentas úteis para pesquisa de palavras-chave</h2>
      <p>Existem várias ferramentas disponíveis que podem ajudar na sua pesquisa de palavras-chave:</p>
      <ul>
        <li>Google Keyword Planner</li>
        <li>SEMrush</li>
        <li>Ahrefs</li>
        <li>Ubersuggest</li>
        <li>MKRanker</li>
      </ul>
      
      <h2>Avaliando o potencial das palavras-chave</h2>
      <p>Nem todas as palavras-chave são criadas iguais. Ao avaliar o potencial de uma palavra-chave, considere:</p>
      <ul>
        <li>Volume de pesquisa: Quantas pessoas estão pesquisando por esse termo?</li>
        <li>Dificuldade da palavra-chave: Quão difícil será classificar para esse termo?</li>
        <li>Relevância: O quão relevante é esse termo para o seu negócio?</li>
        <li>Intenção do usuário: O que o usuário está realmente procurando ao pesquisar esse termo?</li>
      </ul>
      
      <h2>Palavras-chave de cauda longa</h2>
      <p>As palavras-chave de cauda longa são frases mais longas e específicas. Elas geralmente têm menos concorrência e podem trazer tráfego mais qualificado para o seu site.</p>
      
      <h2>Conclusão</h2>
      <p>A pesquisa de palavras-chave não é um evento único, mas um processo contínuo. À medida que seu negócio evolui e as tendências do mercado mudam, suas palavras-chave também devem evoluir. Mantenha-se atualizado com as tendências do setor e ajuste sua estratégia de palavras-chave conforme necessário.</p>
    `,
    date: '15 Mai 2025',
    author: 'Equipe MKRanker',
    category: 'SEO',
    image: '/lovable-uploads/99921b84-1992-4489-8005-54c0460c1d75.png',
    tags: ['SEO', 'palavras-chave', 'marketing digital', 'tráfego orgânico']
  };
  
  // SEO JSON-LD data
  const jsonLdData = `
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "image": "${post.image}",
    "datePublished": "2025-05-15T08:00:00+08:00",
    "dateModified": "2025-05-15T09:20:00+08:00",
    "author": {
      "@type": "Organization",
      "name": "MKRanker"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MKRanker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mkranker.com.br/logo.png"
      }
    },
    "description": "Aprenda a selecionar palavras-chave que aumentam o tráfego orgânico do seu site e impulsionam sua visibilidade nos motores de busca."
  }
  `;

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title={`${post.title} | Blog MKRanker`}
        description="Aprenda a selecionar palavras-chave que aumentam o tráfego orgânico do seu site e impulsionam sua visibilidade nos motores de busca."
        keywords="palavras-chave, SEO, tráfego orgânico, pesquisa de palavras-chave, marketing digital"
        ogImage={post.image}
        canonicalUrl={`https://mkranker.com.br/blog/${post.id}`}
        jsonLd={jsonLdData}
      />

      <HomeNavbar />
      
      <main className="px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
              <ArrowLeft size={16} className="mr-2" /> Voltar para o Blog
            </Link>
            
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center text-sm text-gray-300 gap-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag size={16} className="mr-2" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-3/4">
              <article className="bg-[#1A1A1A] rounded-lg p-8">
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-medium text-white mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-[#252525] text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="bg-[#1A1A1A] border-gray-800 p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Posts Relacionados</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      Como usar IA para otimizar seu SEO
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      Técnicas avançadas de SEO para e-commerce
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      Marketing de conteúdo: o guia completo
                    </a>
                  </li>
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

export default BlogPostPage;
