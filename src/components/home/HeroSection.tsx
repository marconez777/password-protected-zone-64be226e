import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="w-full py-32 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Potencialize sua Presença Online com Inteligência Artificial
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Descubra como nossa plataforma de IA pode transformar sua estratégia de SEO e conteúdo.
          </p>
          <Button size="lg" className="mt-8">
            Começar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
