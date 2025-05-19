
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Key, Users, Image } from 'lucide-react';
import { motion } from 'framer-motion';

type CardItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const cards: CardItem[] = [
  {
    icon: Search,
    title: "Pesquisa Inteligente",
    description: "Ferramentas avançadas de pesquisa para encontrar as melhores keywords do seu nicho."
  },
  {
    icon: Key,
    title: "Palavras-Chave Premium",
    description: "Descubra palavras-chave de alta conversão com volume de busca significativo."
  },
  {
    icon: Users,
    title: "Análise de Público",
    description: "Entenda melhor seu público-alvo e crie conteúdo direcionado que converte."
  },
  {
    icon: Image,
    title: "Conteúdo Otimizado",
    description: "Gere textos e imagens automaticamente otimizados para SEO."
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
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <CardItem key={index} item={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
