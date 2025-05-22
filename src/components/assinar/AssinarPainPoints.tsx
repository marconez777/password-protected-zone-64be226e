
import React from 'react';

const AssinarPainPoints = () => {
  return (
    <div className="py-24 bg-[#0c0a11]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Você já se frustrou assim?
          </h2>
          
          <div className="space-y-6">
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4 text-3xl">😫</div>
                <div>
                  <h3 className="text-white text-xl font-medium mb-2">Criou conteúdos sozinho… mas eles não aparecem no Google?</h3>
                  <p className="text-gray-300">Você se esforça para produzir conteúdo de qualidade, mas parece que o Google nunca os reconhece.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4 text-3xl">😫</div>
                <div>
                  <h3 className="text-white text-xl font-medium mb-2">Finalmente conseguiu posicionar algumas palavras… mas elas não geram vendas?</h3>
                  <p className="text-gray-300">Você comemora o tráfego, mas ele não se converte em receita no final do mês.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#121016] border border-gray-800 rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4 text-3xl">😫</div>
                <div>
                  <h3 className="text-white text-xl font-medium mb-2">Atraiu leads, mas eles só olham, fazem perguntas… e somem antes de fechar?</h3>
                  <p className="text-gray-300">Os visitantes chegam ao seu site, mas não são qualificados o suficiente para se tornarem clientes.</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 mt-8 text-center">
            Isso é mais comum do que você imagina.
            <br />
            <span className="text-white font-medium">E não é culpa sua: é falta de estratégia, dados e foco em conversão.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssinarPainPoints;
