
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Key, Users, FileText, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import SEOMetadata from '@/components/recursos/SEOMetadata';

type CardItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  soon?: boolean;
};

const cards: CardItem[] = [
  {
    icon: Search,
    title: "Funil de Busca com IA",
    description: "Otimize sua estratégia de busca orgânica com análises geradas por GPT para conquistar melhores posições nos buscadores.",
    path: "/recursos/funil-de-busca-com-ia"
  },
  {
    icon: Key,
    title: "Palavras-chave com IA",
    description: "Encontre as melhores keywords com alto potencial de conversão usando inteligência artificial GPT para o seu negócio.",
    path: "/recursos/palavras-chave-com-ia"
  },
  {
    icon: Users,
    title: "Público-alvo com IA",
    description: "Análise detalhada do seu mercado e público-alvo gerada por IA Gemini para estratégias mais assertivas.",
    path: "/recursos/mercado-e-publico-alvo-com-ia"
  },
  {
    icon: FileText,
    title: "Texto SEO LP com IA",
    description: "Conteúdo otimizado para landing pages gerado por GPT que convertem e ranqueiam melhor nos buscadores.",
    path: "/recursos/texto-seo-lp-com-ia"
  },
  {
    icon: FileText,
    title: "Texto SEO Produto com IA",
    description: "Descrições poderosas para seus produtos criadas com IA Gemini com foco em SEO e conversão.",
    path: "/recursos/texto-seo-produto-com-ia"
  },
  {
    icon: FileText,
    title: "Texto SEO Blog com IA",
    description: "Artigos otimizados gerados por GPT para seu blog alcançar as primeiras posições nos buscadores.",
    path: "/recursos/texto-seo-blog-com-ia"
  },
  {
    icon: FileText,
    title: "Pautas de Blog com IA",
    description: "Ideias e estruturas completas geradas por IA Gemini para criar um calendário de conteúdo eficiente.",
    path: "/recursos/pautas-blog-com-ia"
  },
  {
    icon: FileText,
    title: "Meta Dados com IA",
    description: "Títulos e descrições otimizados com GPT para atrair mais cliques nos resultados de busca.",
    path: "/recursos/meta-dados-com-ia"
  },
  {
    icon: Image,
    title: "Gerador de Imagens com IA",
    description: "Crie imagens profissionais usando IA Gemini otimizadas para SEO e engajamento.",
    path: "#",
    soon: true
  }
];

const CardItem = ({ item, index }: { item: CardItem; index: number }) => {
  const Icon = item.icon;
  
  const cardContent = (
    <Card className={`h-full bg-[#1A1F2C] border-[#805af5]/30 hover:border-[#805af5] transition-colors duration-300 ${!item.soon && 'cursor-pointer'}`}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#242936] flex items-center justify-center mb-4">
          <Icon size={32} className="text-[#9b87f5]" />
        </div>
        <div className="relative">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          {item.soon && (
            <span className="absolute -right-10 -top-1 bg-[#805af5] text-xs font-medium px-2 py-0.5 rounded-full text-white">
              em breve
            </span>
          )}
        </div>
        <p className="text-gray-300">{item.description}</p>
      </CardContent>
    </Card>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="w-full"
    >
      {item.soon ? (
        cardContent
      ) : (
        <Link to={item.path}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
};

const RecursosPage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Recursos da MKRanker | Ferramentas de SEO com Inteligência Artificial"
        description="Conheça todas as ferramentas de SEO com I.A. da MKRanker e potencialize sua estratégia de conteúdo, palavras-chave e análise de mercado para alcançar melhores posições no Google."
        keywords="ferramentas de SEO, recursos de SEO, inteligência artificial, otimização de conteúdo, análise de palavras-chave, MKRanker"
        ogImage="https://mkranker.com.br/assets/img/recursos-capa.jpg"
        canonicalUrl="https://mkranker.com.br/recursos"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Recursos da MKRanker",
          "url": "https://mkranker.com.br/recursos",
          "description": "Lista completa de ferramentas de SEO com Inteligência Artificial oferecidas pela MKRanker.",
          "numberOfItems": 9,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Funil de Busca com IA",
              "url": "https://mkranker.com.br/recursos/funil-de-busca-com-ia",
              "description": "Otimize sua estratégia de busca orgânica com análises geradas por GPT para conquistar melhores posições nos buscadores."
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Palavras-chave com IA",
              "url": "https://mkranker.com.br/recursos/palavras-chave-com-ia",
              "description": "Encontre as melhores keywords com alto potencial de conversão usando inteligência artificial GPT."
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Público-alvo com IA",
              "url": "https://mkranker.com.br/recursos/publico-alvo-com-ia",
              "description": "Análise detalhada do seu mercado e público-alvo gerada por IA Gemini para estratégias mais assertivas."
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Texto SEO LP com IA",
              "url": "https://mkranker.com.br/recursos/texto-seo-lp-com-ia",
              "description": "Conteúdo otimizado para landing pages gerado por GPT que convertem e ranqueiam melhor nos buscadores."
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Texto SEO Produto com IA",
              "url": "https://mkranker.com.br/recursos/texto-seo-produto-com-ia",
              "description": "Descrições poderosas para seus produtos criadas com IA Gemini com foco em SEO e conversão."
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Texto SEO Blog com IA",
              "url": "https://mkranker.com.br/recursos/texto-seo-blog-com-ia",
              "description": "Artigos otimizados gerados por GPT para seu blog alcançar as primeiras posições nos buscadores."
            },
            {
              "@type": "ListItem",
              "position": 7,
              "name": "Pautas de Blog com IA",
              "url": "https://mkranker.com.br/recursos/pautas-de-blog-com-ia",
              "description": "Ideias e estruturas completas geradas por IA Gemini para conteúdos de blog otimizados para SEO."
            },
            {
              "@type": "ListItem",
              "position": 8,
              "name": "Meta Dados com IA",
              "url": "https://mkranker.com.br/recursos/meta-dados-com-ia",
              "description": "Títulos e descrições otimizados com GPT para atrair mais cliques e melhorar seu ranqueamento."
            },
            {
              "@type": "ListItem",
              "position": 9,
              "name": "Gerador de Imagens com IA",
              "url": "https://mkranker.com.br/recursos/gerador-de-imagens-com-ia",
              "description": "Crie imagens profissionais usando IA Gemini para ilustrar seus conteúdos. (Em breve)"
            }
          ]
        }`}
        contentHTML={`
          <div class="seo-content">
            <h1>Recursos e Ferramentas de SEO com Inteligência Artificial</h1>
            <p>Conheça todas as ferramentas de SEO com I.A. da MKRanker e potencialize sua estratégia de conteúdo, palavras-chave e análise de mercado para alcançar melhores posições no Google.</p>
            <p>Explore soluções para otimização de textos, criação de metadados, análise de público e muito mais.</p>
          </div>
        `}
      />
      <HomeNavbar />
      <div className="pt-16 pb-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
          Recursos Poderosos
        </h2>
        <p className="text-xl text-gray-300 mt-4">
          Tudo o que você precisa para dominar o SEO e aumentar seu tráfego orgânico
        </p>
      </div>
      <div className="bg-[#121016]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-16">
            {cards.map((card, index) => (
              <CardItem key={index} item={card} index={index} />
            ))}
          </div>
        </div>
        <div id="pricing-section">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecursosPage;
