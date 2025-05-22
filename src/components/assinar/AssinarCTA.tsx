
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const AssinarCTA = () => {
  return (
    <div className="py-24 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <span className="inline-block bg-[#805af5]/20 text-[#cd99ff] px-4 py-1 rounded-full text-sm font-bold mb-4">
              COMECE AGORA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Chega de criar conteúdos que ninguém vê e atrair leads que somem.
            </h2>
            <p className="text-xl text-gray-300">
              Com a MK Ranker, você cria uma estratégia que:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#111019] border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#805af5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-[#805af5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">RANKeia no Google</h3>
              <p className="text-gray-300">Posicione-se nas primeiras páginas com estratégia baseada em dados.</p>
            </div>
            
            <div className="bg-[#111019] border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#805af5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-[#805af5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CONVERTE em vendas</h3>
              <p className="text-gray-300">Atraia visitantes com real intenção de compra, não apenas curiosos.</p>
            </div>
            
            <div className="bg-[#111019] border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#805af5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-[#805af5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ESCALA sua receita</h3>
              <p className="text-gray-300">Crie um sistema previsível de geração de tráfego qualificado.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#805af5]/20 to-[#cd99ff]/20 rounded-xl p-8 md:p-10 border border-[#805af5]/30">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Escolha seu plano e comece agora!
            </h3>
            
            <p className="text-xl text-[#cd99ff] mb-8">
              Oferta por tempo limitado!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/cadastro">Plano Mensal</Link>
              </Button>
              
              <Button 
                size="lg"
                className="bg-[#805af5] hover:bg-[#6a4ac9] text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/cadastro">Plano Anual (Recomendado)</Link>
              </Button>
            </div>
            
            <p className="text-center text-gray-400 mt-4">
              Lembre-se: você tem 7 dias de garantia para testar sem riscos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssinarCTA;
