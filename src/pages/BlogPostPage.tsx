
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HomeNavbar from '@/components/home/HomeNavbar';
import Footer from '@/components/home/Footer';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // This would normally come from a database or API
  // For now, we'll just hard-code a sample post
  const post = {
    title: 'Como a Inteligência Artificial está Revolucionando o SEO',
    date: '15 Mai 2025',
    content: `
      <h2>A Nova Era do SEO com Inteligência Artificial</h2>
      <p>A inteligência artificial está transformando radicalmente a forma como abordamos o SEO. Desde algoritmos de pesquisa mais inteligentes até ferramentas de análise avançada, a IA está redefinindo as regras do jogo.</p>
      
      <h3>Como a IA Está Mudando os Algoritmos de Busca</h3>
      <p>Os motores de busca como o Google estão cada vez mais sofisticados graças à inteligência artificial. O RankBrain, sistema de IA do Google, ajuda a interpretar consultas de pesquisa e entender a intenção por trás delas, proporcionando resultados mais relevantes.</p>
      
      <h3>Ferramentas de SEO Impulsionadas por IA</h3>
      <p>Hoje, existem diversas ferramentas de SEO que utilizam IA para analisar dados e fornecer insights valiosos. Essas ferramentas podem identificar oportunidades de palavras-chave, analisar a concorrência e até mesmo prever tendências de pesquisa.</p>
      
      <h3>Criação de Conteúdo com IA</h3>
      <p>A IA está revolucionando a criação de conteúdo para SEO. Ferramentas como o GPT-4 podem gerar textos otimizados para SEO, sugerir títulos atraentes e até mesmo identificar lacunas de conteúdo que podem ser exploradas.</p>
      
      <h3>O Futuro do SEO com IA</h3>
      <p>À medida que a IA continua a evoluir, podemos esperar um SEO ainda mais personalizado e eficiente. A análise preditiva, a automação de tarefas e a otimização contínua serão fundamentais para o sucesso das estratégias de SEO no futuro.</p>
    `,
    image: '/lovable-uploads/50f3c28a-69bd-4dfa-80d9-09cb9ce62299.png',
  };

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title={`${post.title} | Blog MKRanker`}
        description="Descubra como a IA está transformando estratégias de SEO e como aproveitar essa tecnologia para melhorar seu rankeamento."
        keywords="inteligência artificial, SEO, IA para SEO, marketing digital, rankeamento google"
        ogImage={post.image}
        canonicalUrl={`https://mkranker.com.br/blog/${slug}`}
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://mkranker.com.br/blog/${slug}"
          },
          "headline": "${post.title}",
          "image": "${post.image}",
          "datePublished": "2025-05-15T08:00:00+00:00",
          "dateModified": "2025-05-15T09:00:00+00:00",
          "author": {
            "@type": "Organization",
            "name": "MKRanker"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MKRanker",
            "logo": {
              "@type": "ImageObject",
              "url": "https://mkranker.com.br/assets/img/logo.png"
            }
          }
        }`}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-[#9b87f5] hover:text-[#805af5] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o blog
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#1A1A1A] border-0 overflow-hidden">
            <div className="h-80 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>
              
              <div 
                className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-h2:text-2xl prose-h3:text-xl prose-h3:mt-6 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
