
import React from 'react';
import { Check } from 'lucide-react';

const AssinarBenefits = () => {
  const benefits = [
    'Descobrir o que realmente ranqueia no seu nicho',
    'Parar de perder tempo com palavras que não convertem',
    'Atrair leads com intenção real de compra',
    'Criar textos otimizados automaticamente para Blog, Produtos e Landing Pages',
    'Estruturar funis de busca que transformam curiosos em clientes',
    'Receber treinamentos práticos para potencializar ainda mais seus resultados'
  ];

  return (
    <div className="py-24 bg-[#0c0a11]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            <span className="text-[#805af5]">🧰</span> Com a MK Ranker, você vai:
          </h2>
          
          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-[#121016] border border-gray-800 rounded-lg p-6 flex items-center"
              >
                <div className="bg-[#805af5]/20 rounded-full p-1 mr-4 flex-shrink-0">
                  <Check className="h-6 w-6 text-[#805af5]" />
                </div>
                <p className="text-white text-lg">{benefit}</p>
              </div>
            ))}
          </div>
          
          {/* Tool Preview Image */}
          <div className="mt-16 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
            <img 
              src="/lovable-uploads/d0c0ac3b-9343-4b47-ad86-e28b7e7998da.png" 
              alt="MK Ranker em ação" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssinarBenefits;
