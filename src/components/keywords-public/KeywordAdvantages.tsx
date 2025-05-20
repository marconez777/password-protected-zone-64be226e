
import React from 'react';
import { Search, KeyRound, FileText, Users } from 'lucide-react';

export const KeywordAdvantages = () => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="bg-[#805af5] rounded-full p-2 mt-1">
          <Search size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">Precisão Avançada</h3>
          <p className="text-gray-300">Ao contrário dos métodos tradicionais, a tecnologia de IA do Gemini Treinada analisa grandes volumes de dados em tempo real, garantindo que você sempre trabalhe com as informações mais atualizadas e relevantes.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-[#805af5] rounded-full p-2 mt-1">
          <KeyRound size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">Sugestões de Palavras-Chave Relacionadas</h3>
          <p className="text-gray-300">Um dos recursos mais valiosos é o gerador de palavras-chave relacionadas. Esta funcionalidade sugere palavras-chave complementares à sua palavra em foco, enriquecendo seu conteúdo e ampliando seu campo semântico.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-[#805af5] rounded-full p-2 mt-1">
          <FileText size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">Melhora o Conteúdo sem Esforço</h3>
          <p className="text-gray-300">Com termos semânticos cuidadosamente sugeridos, seu conteúdo não só se torna mais rico, mas também facilita a compreensão do seu público, enquanto captura a atenção dos motores de busca.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-[#805af5] rounded-full p-2 mt-1">
          <Users size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">Experiência Personalizada</h3>
          <p className="text-gray-300">A Ferramenta de pesquisa de palavras-chave com IA é adaptável às necessidades específicas de cada usuário, garantindo que as palavras-chave sugeridas estejam alinhadas com seus objetivos de negócios.</p>
        </div>
      </div>
    </div>
  );
};
