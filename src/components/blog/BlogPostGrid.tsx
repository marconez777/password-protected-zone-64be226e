
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogPostProps {
  category: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

const BlogPostGrid: React.FC<BlogPostProps> = ({ category }) => {
  // Sample blog post data
  const posts: Post[] = [
    {
      id: '1',
      title: 'Como a Inteligência Artificial está Revolucionando o SEO',
      excerpt: 'Descubra como a IA está transformando estratégias de SEO e como aproveitar essa tecnologia para melhorar seu rankeamento.',
      date: '15 Mai 2025',
      category: 'estrategia',
      image: '/lovable-uploads/50f3c28a-69bd-4dfa-80d9-09cb9ce62299.png',
      slug: 'como-inteligencia-artificial-revoluciona-seo'
    },
    {
      id: '2',
      title: 'Os 7 Principais Fatores de Rankeamento em 2025',
      excerpt: 'Um guia completo sobre os fatores mais importantes que o Google considera para rankeamento de sites em 2025.',
      date: '10 Mai 2025',
      category: 'seo-tecnico',
      image: '/lovable-uploads/98a7a700-de54-4975-8125-56c57bbe4c06.png',
      slug: 'principais-fatores-rankeamento-2025'
    },
    {
      id: '3',
      title: 'Estratégias de Link Building que Realmente Funcionam',
      excerpt: 'Aprenda técnicas eficazes para construir backlinks de qualidade e aumentar a autoridade do seu site.',
      date: '05 Mai 2025',
      category: 'backlinks',
      image: '/lovable-uploads/cb553e78-2404-4ef3-9c00-ebe1132f8d97.png',
      slug: 'estrategias-link-building-eficazes'
    },
    {
      id: '4',
      title: 'Otimizando a Velocidade do Seu Site para Melhor SEO',
      excerpt: 'Dicas e ferramentas para melhorar a performance do seu site e como isso impacta seu rankeamento no Google.',
      date: '30 Abr 2025',
      category: 'performance',
      image: '/lovable-uploads/e1fd70b0-cdbd-43ec-8132-e04d441a83c5.png',
      slug: 'otimizando-velocidade-site-seo'
    },
    {
      id: '5',
      title: 'Como Criar Conteúdo Otimizado para SEO',
      excerpt: 'Guia completo para produzir conteúdo que atrai visitantes e é bem rankeado pelos motores de busca.',
      date: '25 Abr 2025',
      category: 'redacao',
      image: '/lovable-uploads/d64b34e7-caf8-49c0-8617-e66a9df3ac78.png',
      slug: 'como-criar-conteudo-otimizado-seo'
    },
    {
      id: '6',
      title: 'SEO On-Page: Guia Definitivo para 2025',
      excerpt: 'Tudo o que você precisa saber sobre otimização on-page para melhorar o posicionamento das suas páginas.',
      date: '20 Abr 2025',
      category: 'on-page',
      image: '/lovable-uploads/f30c02bb-1418-441e-bf38-be526c6f568b.png',
      slug: 'seo-on-page-guia-definitivo-2025'
    },
  ];

  // Filter posts based on selected category
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <Card key={post.id} className="bg-[#1A1A1A] border-0 overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300">
            <div className="h-52 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                <Link to={`/blog/${post.slug}`} className="hover:text-[#9b87f5] transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <Link 
                to={`/blog/${post.slug}`} 
                className="inline-flex items-center text-[#9b87f5] hover:text-[#805af5] font-medium transition-colors"
              >
                Ler mais <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 text-center py-12">
          <h3 className="text-xl text-white mb-2">Nenhum artigo encontrado</h3>
          <p className="text-gray-400">Não encontramos artigos nesta categoria no momento.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostGrid;
