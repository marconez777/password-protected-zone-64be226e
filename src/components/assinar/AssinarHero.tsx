
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AssinarHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden pt-16">
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
      <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-[#805af5] rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[15%] left-[15%] w-[200px] h-[200px] bg-[#cd99ff] rounded-full blur-[80px] opacity-20"></div>
      <div className="absolute top-[10%] right-[30%] w-[250px] h-[250px] bg-[#8260d0] rounded-full blur-[90px] opacity-20"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[220px] h-[220px] bg-[#9b87f5] rounded-full blur-[85px] opacity-20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center mb-8">
          <span className="bg-[#805af5]/20 text-[#cd99ff] px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
            MK RANKER
          </span>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl mx-auto">
            A Inteligência Artificial de SEO que Transforma Seu Site em Uma Máquina de Vendas Orgânicas
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Chega de perder horas criando conteúdos que não ranqueiam e atrair leads que nunca compram.
            Com a MK Ranker, você descobre o que realmente funciona, posiciona com precisão e converte visitantes em clientes — usando o poder da IA (ChatGPT + Gemini).
          </p>
          
          {/* Embedded Video - Moved before the button */}
          <div className="max-w-4xl mx-auto bg-[#121016]/80 rounded-xl overflow-hidden border border-gray-800 shadow-xl mb-8">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/your-video-id" 
                title="MK Ranker: A Inteligência Artificial de SEO"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#805af5] to-[#cd99ff] text-white font-medium px-8 py-6 text-lg rounded-md hover:opacity-90 transition"
            asChild
          >
            <Link to="/cadastro">Comece Agora e Veja a Diferença</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssinarHero;
