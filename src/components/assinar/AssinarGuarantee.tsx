
import React from 'react';
import { Shield } from 'lucide-react';

const AssinarGuarantee = () => {
  return (
    <div className="py-20 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-[#111019] border border-[#805af5]/30 rounded-xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-16 h-16 bg-[#805af5]/20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <Shield className="h-8 w-8 text-[#805af5]" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
              Garantia de Teste Sem Risco
            </h2>
          </div>
          
          <p className="text-gray-300 text-lg mb-6 text-center md:text-left">
            Teste a MK Ranker por 7 dias.
            Se não gostar, devolvemos 100% do seu dinheiro.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-4 text-center">
              <div className="text-[#805af5] text-2xl mb-2">✔️</div>
              <p className="text-white">Sem fidelidade</p>
            </div>
            
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-4 text-center">
              <div className="text-[#805af5] text-2xl mb-2">✔️</div>
              <p className="text-white">Sem burocracia</p>
            </div>
            
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-4 text-center">
              <div className="text-[#805af5] text-2xl mb-2">✔️</div>
              <p className="text-white">Sem riscos</p>
            </div>
          </div>
          
          <p className="text-center text-white mt-6">
            Só continue se perceber que sua estratégia de SEO ficou mais clara, rápida e eficiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssinarGuarantee;
