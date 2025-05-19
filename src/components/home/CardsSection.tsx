
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Key, Users, FileText, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    path: "/funil-de-busca"
  },
  {
    icon: Key,
    title: "Palavras-chave com IA",
    description: "Encontre as melhores keywords com alto potencial de conversão usando inteligência artificial GPT para o seu negócio.",
    path: "/keywords"
  },
  {
    icon: Users,
    title: "Público-alvo com IA",
    description: "Análise detalhada do seu mercado e público-alvo gerada por IA Gemini para estratégias mais assertivas.",
    path: "/market-and-target"
  },
  {
    icon: FileText,
    title: "Texto SEO LP com IA",
    description: "Conteúdo otimizado para landing pages gerado por GPT que convertem e ranqueiam melhor nos buscadores.",
    path: "/texto-seo-lp"
  },
  {
    icon: FileText,
    title: "Texto SEO Produto com IA",
    description: "Descrições poderosas para seus produtos criadas com IA Gemini com foco em SEO e conversão.",
    path: "/texto-seo-produto"
  },
  {
    icon: FileText,
    title: "Texto SEO Blog com IA",
    description: "Artigos otimizados gerados por GPT para seu blog alcançar as primeiras posições nos buscadores.",
    path: "/texto-seo-blog"
  },
  {
    icon: FileText,
    title: "Pautas de Blog com IA",
    description: "Ideias e estruturas completas geradas por IA Gemini para criar um calendário de conteúdo eficiente.",
    path: "/pautas-blog"
  },
  {
    icon: FileText,
    title: "Meta Dados com IA",
    description: "Títulos e descrições otimizados com GPT para atrair mais cliques nos resultados de busca.",
    path: "/meta-dados"
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

const CardsSection = () => {
  return (
    <div className="w-full py-16 lg:py-24 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-300 mt-4">
            Tudo o que você precisa para dominar o SEO e aumentar seu tráfego orgânico
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <CardItem key={index} item={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
