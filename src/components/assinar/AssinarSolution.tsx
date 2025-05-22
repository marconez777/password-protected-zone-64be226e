
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AssinarSolution = () => {
  return (
    <div className="py-24 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-[#805af5]">💥</span> O que está travando suas vendas não é falta de esforço. É falta de precisão.
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Você pode continuar tentando adivinhar o que ranqueia e converte...
              <br/>
              Ou pode usar uma Inteligência Artificial que já fez isso centenas de vezes e sabe exatamente quais conteúdos posicionam e geram vendas.
            </p>
            
            <div className="mb-8">
              <p className="text-2xl font-bold text-white mb-2">
                MK Ranker foi criada justamente para isso:
              </p>
              <p className="text-xl text-[#cd99ff]">
                Transformar o SEO em um processo previsível, rápido e lucrativo.
              </p>
            </div>
          </div>
          
          <div className="bg-[#111019] border border-[#805af5]/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              <span className="text-[#805af5]">🧠</span> Como a MK Ranker Funciona?
            </h3>
            
            <p className="text-lg text-gray-300 mb-6 text-center">
              É uma plataforma completa de SEO que integra ChatGPT + Gemini para mapear, criar e otimizar conteúdos com foco total em duas coisas:
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <div className="bg-[#121016]/70 border border-gray-800 rounded-lg p-5 flex-1 text-center">
                <span className="text-2xl">✅</span>
                <h4 className="text-white text-lg font-medium mt-2">Ranking no Google</h4>
              </div>
              
              <div className="bg-[#121016]/70 border border-gray-800 rounded-lg p-5 flex-1 text-center">
                <span className="text-2xl">✅</span>
                <h4 className="text-white text-lg font-medium mt-2">Conversão em vendas</h4>
              </div>
            </div>
            
            <p className="text-xl text-center text-white mb-6">
              Você não precisa ser um especialista:
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="bg-[#805af5]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#805af5] font-bold">1</span>
                </div>
                <p className="text-gray-300">A MK Ranker <span className="text-white font-medium">mostra exatamente o que fazer</span>.</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-[#805af5]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#805af5] font-bold">2</span>
                </div>
                <p className="text-gray-300"><span className="text-white font-medium">Executa por você</span>.</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-[#805af5]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#805af5] font-bold">3</span>
                </div>
                <p className="text-gray-300">E transforma seu site em uma <span className="text-white font-medium">máquina de leads qualificados</span>.</p>
              </div>
            </div>
            
            {/* Tool Screenshot */}
            <div className="mb-8 rounded-lg overflow-hidden border border-gray-700">
              <img 
                src="/lovable-uploads/78fd24fc-6334-4071-ae31-583fdb75cbd3.png" 
                alt="MK Ranker Dashboard" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-[#805af5] hover:bg-[#6a4ac9] text-white font-medium px-8 py-6 text-lg rounded-md"
                asChild
              >
                <Link to="/cadastro">Escolha seu plano e comece agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssinarSolution;
