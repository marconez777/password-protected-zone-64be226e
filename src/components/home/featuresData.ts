
import { ReactNode } from 'react';

export type Feature = {
  id: string;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  imagePath: string;
};

// Dados das features
export const features: Feature[] = [
  {
    id: 'pesquisa',
    title: 'Pesquisa de Mercado',
    subtitle: 'O gemini faz uma pesquisa de mercado incrível',
    bulletPoints: [
      'Sem prompts complicados',
      'Dados direto do Google',
      'Treinada por Consultores SEO',
      'Gemini Advanced 2.5 Pro'
    ],
    imagePath: '/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png'
  },
  {
    id: 'funil',
    title: 'Funil de Busca',
    subtitle: 'Construa funis de busca otimizados',
    bulletPoints: [
      'Análise completa da jornada do usuário',
      'Mapeamento da intenção de busca',
      'Estratégias personalizadas de conversão'
    ],
    imagePath: '/lovable-uploads/becf4789-08a1-420c-9246-95c6829c54de.png'
  },
  {
    id: 'palavras',
    title: 'Palavras Chave',
    subtitle: 'Descubra as melhores palavras-chave',
    bulletPoints: [
      'Análise de volume e competitividade',
      'Descoberta de nichos inexplorados',
      'Recomendações de conteúdo estratégico'
    ],
    imagePath: '/lovable-uploads/7ed0757a-3e8f-432a-80b1-255f55a1bced.png'
  },
  {
    id: 'textos',
    title: 'Textos com SEO',
    subtitle: 'Crie textos otimizados para SEO',
    bulletPoints: [
      'Densidade ideal de palavras-chave',
      'Estrutura semântica otimizada',
      'Conteúdo atraente e relevante'
    ],
    imagePath: '/lovable-uploads/9249eca7-a739-4c4f-9e66-ba984469544f.png'
  },
  {
    id: 'pautas',
    title: 'Pautas de Blog',
    subtitle: 'Gere pautas relevantes para seu blog',
    bulletPoints: [
      'Ideias alinhadas com tendências atuais',
      'Calendário editorial estratégico',
      'Tópicos de alto potencial de tráfego'
    ],
    imagePath: '/lovable-uploads/cb553e78-2404-4ef3-9c00-ebe1132f8d97.png'
  },
];
