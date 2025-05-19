
import React, { useState, useEffect } from 'react';
import { features } from './featuresData';
import FeatureItem from './FeatureItem';
import FeaturesNavigation from './FeaturesNavigation';
import { AnimatePresence } from 'framer-motion';

const FeaturesSection = () => {
  // Estado para controlar qual feature está ativa
  const [activeFeature, setActiveFeature] = useState<string>('pesquisa');

  // Preload de imagens para melhorar a performance
  useEffect(() => {
    features.forEach(feature => {
      const img = new Image();
      img.src = feature.imagePath;
    });
  }, []);

  const handleStartNow = () => {
    window.open('https://pay.kiwify.com.br/sZRHsgM', '_blank');
  };

  const activeFeatureData = features.find(feature => feature.id === activeFeature);

  return (
    <div className="relative w-full py-12 lg:py-24 bg-[#121016] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-2">
            O Trabalho De Meses Em Dias
          </h2>
          <p className="text-xl text-gray-300 mt-4">
            Toda a operação fica por conta da I.A.
          </p>
        </div>

        <FeaturesNavigation 
          features={features} 
          activeFeature={activeFeature} 
          onFeatureChange={setActiveFeature} 
        />

        <div className="bg-[#111019] border border-[#805af5]/30 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {activeFeatureData && (
              <FeatureItem 
                key={activeFeatureData.id}
                feature={activeFeatureData} 
                onStartNow={handleStartNow} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
