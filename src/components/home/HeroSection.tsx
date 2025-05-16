
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-76px)] overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 bg-[#121016]"
        style={{
          backgroundImage: `url(/lovable-uploads/a88f65d3-4ba7-4fe4-b278-7a11bc45e690.png)`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          opacity: 0.6
        }}
      />
      
      {/* Purple abstract shapes */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#805af5] rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#cd99ff] rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#8260d0] rounded-full blur-[90px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-[#9b87f5] rounded-full blur-[85px] opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10 text-center flex flex-col items-center justify-center min-h-[calc(100vh-76px)]">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          Automatize o SEO
        </h1>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-[#805af5] to-[#cd99ff] text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
          Estratégia
        </h2>
        
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Potencialize a sua operação com a ajuda do Chat GPT e do Gemini. Treinados por nossos consultores
        </p>
        
        <Link 
          to="/cadastro" 
          className="bg-gradient-to-r from-[#805af5] to-[#cd99ff] text-white font-medium px-8 py-3 rounded-md hover:opacity-90 transition"
        >
          Começar Agora
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
