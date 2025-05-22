
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const PricingSection = () => {
  const features = ['Palavras-chave', 'Funil de Busca', 'Mercado e Público-alvo', 'Texto SEO para LP', 'Texto SEO para Produto', 'Texto SEO para Blog', 'Pautas para Blog', 'Meta Dados', 'Treinamentos gravados', 'Treinamentos ao vivo (1x por semana)', 'Mentoria em Grupo (1x por mês)', 'Grupo Whatsapp para dúvidas'];
  return <div className="w-full py-24 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preços Simples e Transparentes
          </h2>
          <p className="text-gray-400 text-lg">
            Escolha o plano que melhor se adapta às suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monthly Plan */}
          <div className="relative rounded-xl border border-gray-800 bg-[#121016] p-8 shadow-xl transition-all">
            <div className="flex flex-col h-full">
              <div>
                <p className="text-[#cd99ff] font-medium mb-3">Mensal</p>
                <h3 className="text-white text-2xl font-bold mb-1">Por tempo limitado</h3>
                
                <div className="mt-4 mb-8">
                  <div className="flex items-baseline text-white">
                    <div className="flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-gray-400 line-through text-xl mr-2">de R$297</span>
                        <span className="text-white">por</span>
                      </div>
                      <span className="text-5xl font-extrabold tracking-tight">R$ 97,00</span>
                    </div>
                    <span className="ml-1 text-xl text-muted-foreground">/mês</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-white text-lg font-medium mb-4">Recursos</p>
                <ul className="space-y-3">
                  {features.map(feature => <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#cd99ff]" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>)}
                </ul>
              </div>

              <div className="mt-auto">
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white" asChild>
                  <Link to="/cadastro">
                    Começar Agora
                  </Link>
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3">Oferta por tempo limitado</p>
              </div>
            </div>
          </div>

          {/* Annual Plan - Highlighted */}
          <div className="relative rounded-xl border border-[#805af5] bg-[#121016] p-8 shadow-xl transition-all">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-36 rounded-full bg-[#FFD700] px-3 py-1 text-center text-sm font-medium text-black">
              Recomendado
            </div>
            
            <div className="flex flex-col h-full">
              <div>
                <p className="text-green-500 font-medium mb-3">Anual</p>
                <h3 className="text-white text-2xl font-bold mb-1">Por tempo limitado</h3>
                
                <div className="mt-4 mb-8">
                  <div className="flex items-baseline text-white">
                    <div className="flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-gray-400 line-through text-xl mr-2">de R$3.564</span>
                        <span className="text-white">por</span>
                      </div>
                      <span className="text-5xl font-extrabold tracking-tight">R$ 777,00</span>
                    </div>
                    <span className="ml-1 text-xl text-muted-foreground">/ano</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-white text-lg font-medium mb-4">Recursos</p>
                <ul className="space-y-3">
                  {features.map(feature => <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>)}
                </ul>
                
                
              </div>
              
              <div className="mt-auto">
                <Button className="w-full bg-[#805af5] hover:bg-[#6a4ac9] text-white" asChild>
                  <Link to="/cadastro">
                    Começar Agora
                  </Link>
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3">Oferta por tempo limitado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PricingSection;
