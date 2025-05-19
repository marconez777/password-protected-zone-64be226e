
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Definição das features
type Feature = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const FeaturesSection = () => {
  // Estado para controlar qual feature está ativa
  const [activeFeature, setActiveFeature] = useState<string>('pesquisa');

  const handleStartNow = () => {
    window.open('https://pay.kiwify.com.br/sZRHsgM', '_blank');
  };

  // Dados das features
  const features: Feature[] = [
    {
      id: 'pesquisa',
      title: 'Pesquisa de Mercado',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              O gemini faz uma pesquisa de mercado incrível
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Sem prompts complicados</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Dados direto do Google</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Treinada por Consultores SEO</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Gemini Advanced 2.5 Pro</span>
              </li>
            </ul>
            <Button 
              onClick={handleStartNow}
              className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
            >
              Começar agora! <span className="ml-2">→</span>
            </Button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <img 
              src="/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png" 
              alt="Mercado e Público Alvo" 
              className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'funil',
      title: 'Funil de Busca',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Construa funis de busca otimizados
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Análise completa da jornada do usuário</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Mapeamento da intenção de busca</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Estratégias personalizadas de conversão</span>
              </li>
            </ul>
            <Button 
              onClick={handleStartNow}
              className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
            >
              Começar agora! <span className="ml-2">→</span>
            </Button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <img 
              src="/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png" 
              alt="Funil de Busca" 
              className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'palavras',
      title: 'Palavras Chave',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Descubra as melhores palavras-chave
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Análise de volume e competitividade</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Descoberta de nichos inexplorados</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Recomendações de conteúdo estratégico</span>
              </li>
            </ul>
            <Button 
              onClick={handleStartNow}
              className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
            >
              Começar agora! <span className="ml-2">→</span>
            </Button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <img 
              src="/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png" 
              alt="Palavras Chave" 
              className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'textos',
      title: 'Textos com SEO',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Crie textos otimizados para SEO
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Densidade ideal de palavras-chave</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Estrutura semântica otimizada</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Conteúdo atraente e relevante</span>
              </li>
            </ul>
            <Button 
              onClick={handleStartNow}
              className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
            >
              Começar agora! <span className="ml-2">→</span>
            </Button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <img 
              src="/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png" 
              alt="Textos com SEO" 
              className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'pautas',
      title: 'Pautas de Blog',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Gere pautas relevantes para seu blog
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Ideias alinhadas com tendências atuais</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Calendário editorial estratégico</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white">Tópicos de alto potencial de tráfego</span>
              </li>
            </ul>
            <Button 
              onClick={handleStartNow}
              className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
            >
              Começar agora! <span className="ml-2">→</span>
            </Button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <img 
              src="/lovable-uploads/d50d4456-17be-4c31-83fe-3f1c54fa9527.png" 
              alt="Pautas de Blog" 
              className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full py-12 lg:py-24 bg-[#121016] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">
            O Trabalho De Meses Em Dias
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Toda a operação fica por conta da I.A.
          </p>
        </div>

        {/* Botões de navegação com borda roxa */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <ToggleGroup type="single" value={activeFeature} onValueChange={(value) => value && setActiveFeature(value)} className="flex space-x-4">
            {features.map((feature) => (
              <ToggleGroupItem
                key={feature.id}
                value={feature.id}
                className={`border border-[#805af5] rounded-full px-6 py-2 text-white hover:bg-[#805af5]/10 transition-all ${
                  activeFeature === feature.id ? 'bg-[#805af5]/20' : 'bg-transparent'
                }`}
              >
                {feature.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Conteúdo da feature ativa */}
        <div className="bg-[#111019] border border-[#805af5]/30 rounded-lg overflow-hidden">
          {features.find(feature => feature.id === activeFeature)?.content}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
