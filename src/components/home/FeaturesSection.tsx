
import React, { useState } from 'react';
import { features } from './features/featuresData';
import FeaturesNavigation from './features/FeaturesNavigation';
import FeatureItem from './features/FeatureItem';

const FeaturesSection = () => {
  // Estado para controlar qual feature está ativa
  const [activeFeature, setActiveFeature] = useState<string>('pesquisa');

  // Encontra a feature ativa
  const currentFeature = features.find(feature => feature.id === activeFeature) || features[0];

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

        {/* Botões de navegação */}
        <FeaturesNavigation 
          features={features} 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
        />

        {/* Conteúdo da feature ativa */}
        <div className="bg-[#111019] border border-[#805af5]/30 rounded-lg overflow-hidden">
          <FeatureItem
            title={currentFeature.title}
            description={currentFeature.description}
            bulletPoints={currentFeature.bulletPoints}
            imageSrc={currentFeature.imageSrc}
            imageAlt={currentFeature.imageAlt}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
