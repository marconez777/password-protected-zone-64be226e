
export type Feature = {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
};

const featuresData: Feature[] = [
  {
    id: 'pesquisa',
    title: 'Pesquisa de Mercado',
    description: 'O gemini faz uma pesquisa de mercado incrível',
    bulletPoints: [
      'Sem prompts complicados',
      'Dados direto do Google',
      'Treinada por Consultores SEO',
      'Gemini Advanced 2.5 Pro',
    ],
    imageSrc: '/lovable-uploads/013f4c16-a745-49c2-a756-d4659df9e3a1.png',
    imageAlt: 'Mercado e Público Alvo',
  },
  {
    id: 'funil',
    title: 'Funil de Busca',
    description: 'Construa funis de busca otimizados',
    bulletPoints: [
      'Análise completa da jornada do usuário',
      'Mapeamento da intenção de busca',
      'Estratégias personalizadas de conversão',
    ],
    imageSrc: '/lovable-uploads/013f4c16-a745-49c2-a756-d4659df9e3a1.png',
    imageAlt: 'Funil de Busca',
  },
  {
    id: 'palavras',
    title: 'Palavras Chave',
    description: 'Descubra as melhores palavras-chave',
    bulletPoints: [
      'Análise de volume e competitividade',
      'Descoberta de nichos inexplorados',
      'Recomendações de conteúdo estratégico',
    ],
    imageSrc: '/lovable-uploads/013f4c16-a745-49c2-a756-d4659df9e3a1.png',
    imageAlt: 'Palavras Chave',
  },
  {
    id: 'textos',
    title: 'Textos com SEO',
    description: 'Crie textos otimizados para SEO',
    bulletPoints: [
      'Densidade ideal de palavras-chave',
      'Estrutura semântica otimizada',
      'Conteúdo atraente e relevante',
    ],
    imageSrc: '/lovable-uploads/013f4c16-a745-49c2-a756-d4659df9e3a1.png',
    imageAlt: 'Textos com SEO',
  },
  {
    id: 'pautas',
    title: 'Pautas de Blog',
    description: 'Gere pautas relevantes para seu blog',
    bulletPoints: [
      'Ideias alinhadas com tendências atuais',
      'Calendário editorial estratégico',
      'Tópicos de alto potencial de tráfego',
    ],
    imageSrc: '/lovable-uploads/013f4c16-a745-49c2-a756-d4659df9e3a1.png',
    imageAlt: 'Pautas de Blog',
  },
];

export default featuresData;
