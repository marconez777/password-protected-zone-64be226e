
import { ReactNode } from 'react';

export type Feature = {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
};

// Dados das features
export const features: Feature[] = [
  {
    id: 'pesquisa',
    title: 'O gemini faz uma pesquisa de mercado incrível',
    description: '',
    bulletPoints: [
      'Sem prompts complicados',
      'Dados direto do Google',
      'Treinada por Consultores SEO',
      'Gemini Advanced 2.5 Pro',
    ],
    imageSrc: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png',
    imageAlt: 'Mercado e Público Alvo',
  },
  {
    id: 'funil',
    title: 'Construa funis de busca otimizados',
    description: '',
    bulletPoints: [
      'Análise completa da jornada do usuário',
      'Mapeamento da intenção de busca',
      'Estratégias personalizadas de conversão',
    ],
    imageSrc: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png',
    imageAlt: 'Funil de Busca',
  },
  {
    id: 'palavras',
    title: 'Descubra as melhores palavras-chave',
    description: '',
    bulletPoints: [
      'Análise de volume e competitividade',
      'Descoberta de nichos inexplorados',
      'Recomendações de conteúdo estratégico',
    ],
    imageSrc: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png',
    imageAlt: 'Palavras Chave',
  },
  {
    id: 'textos',
    title: 'Crie textos otimizados para SEO',
    description: '',
    bulletPoints: [
      'Densidade ideal de palavras-chave',
      'Estrutura semântica otimizada',
      'Conteúdo atraente e relevante',
    ],
    imageSrc: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png',
    imageAlt: 'Textos com SEO',
  },
  {
    id: 'pautas',
    title: 'Gere pautas relevantes para seu blog',
    description: '',
    bulletPoints: [
      'Ideias alinhadas com tendências atuais',
      'Calendário editorial estratégico',
      'Tópicos de alto potencial de tráfego',
    ],
    imageSrc: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png',
    imageAlt: 'Pautas de Blog',
  },
];
