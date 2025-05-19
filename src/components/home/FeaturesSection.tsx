
import React, { useState } from 'react';
import FeatureItem from './features/FeatureItem';
import FeaturesNavigation from './features/FeaturesNavigation';
import featuresData from './features/featuresData';

const FeaturesSection = () => {
  // Estado para controlar qual feature está ativa
  const [activeFeature, setActiveFeature] = useState<string>('pesquisa');

  const handleStartNow = () => {
    window.open('https://pay.kiwify.com.br/sZRHsgM', '_blank');
  };

  // Encontra o feature ativo
  const activeFeatureData = featuresData.find(feature => feature.id === activeFeature);

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
        <FeaturesNavigation 
          features={featuresData} 
          activeFeature={activeFeature} 
          onFeatureChange={setActiveFeature} 
        />

        {/* Conteúdo da feature ativa */}
        <div className="bg-[#111019] border border-[#805af5]/30 rounded-lg overflow-hidden">
          {activeFeatureData && (
            <FeatureItem 
              title={activeFeatureData.title}
              description={activeFeatureData.description}
              bulletPoints={activeFeatureData.bulletPoints}
              imageSrc={activeFeatureData.imageSrc}
              imageAlt={activeFeatureData.imageAlt}
              onStartNow={handleStartNow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
