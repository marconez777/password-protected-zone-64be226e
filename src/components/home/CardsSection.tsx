
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Key, Users, FileText, Image } from 'lucide-react';
import { motion } from 'framer-motion';

type CardItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  soon?: boolean;
};

const cards: CardItem[] = [
  {
    icon: Search,
    title: "Funil de Busca",
    description: "Otimize sua estratégia de busca orgânica com análises geradas por GPT para conquistar melhores posições nos buscadores."
  },
  {
    icon: Key,
    title: "Palavras-chave",
    description: "Encontre as melhores keywords com alto potencial de conversão usando inteligência artificial GPT para o seu negócio."
  },
  {
    icon: Users,
    title: "Mercado e Público-alvo",
    description: "Análise detalhada do seu mercado e público-alvo gerada por IA Gemini para estratégias mais assertivas."
  },
  {
    icon: FileText,
    title: "Texto SEO para LP",
    description: "Conteúdo otimizado para landing pages gerado por GPT que convertem e ranqueiam melhor nos buscadores."
  },
  {
    icon: FileText,
    title: "Texto SEO para Produto",
    description: "Descrições poderosas para seus produtos criadas com IA Gemini com foco em SEO e conversão."
  },
  {
    icon: FileText,
    title: "Texto SEO para Blog",
    description: "Artigos otimizados gerados por GPT para seu blog alcançar as primeiras posições nos buscadores."
  },
  {
    icon: FileText,
    title: "Pautas para Blog",
    description: "Ideias e estruturas completas geradas por IA Gemini para criar um calendário de conteúdo eficiente."
  },
  {
    icon: FileText,
    title: "Meta Dados",
    description: "Títulos e descrições otimizados com GPT para atrair mais cliques nos resultados de busca."
  },
  {
    icon: Image,
    title: "Gerador de Imagens",
    description: "Crie imagens profissionais usando IA Gemini otimizadas para SEO e engajamento.",
    soon: true
  }
];

const CardItem = ({ item, index }: { item: CardItem; index: number }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="w-full"
    >
      <Card className="h-full bg-[#1A1F2C] border-[#805af5]/30 hover:border-[#805af5] transition-colors duration-300">
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
