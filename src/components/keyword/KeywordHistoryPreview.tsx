
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { KeywordHistoryTable } from './KeywordHistoryTable';

type KeywordHistoryPreviewProps = {
  item: any;
  onUseResult: (item: any) => void;
};

export const KeywordHistoryPreview: React.FC<KeywordHistoryPreviewProps> = ({ 
  item,
  onUseResult
}) => {
  const keyword = item.input_original?.palavras_chave || "Sem palavra-chave";
  const formattedDate = format(
    new Date(item.data_criacao), 
    "dd 'de' MMMM 'de' yyyy, HH:mm",
    { locale: ptBR }
  );
  
  // Extract keywords from the result
  let keywords = [];
  const result = item.output_gerado;
  
  if (result?.output) {
    const lines = result.output
      .split('\n')
      .filter((line: string) => line.trim().length > 0);
    
    // Process lines, skipping the first two
    keywords = lines.slice(2).map((line: string) => {
      const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
      const parts = cleanLine.split('|').map((part: string) => part.trim()).filter(Boolean);
      
      return {
        keyword: parts[0] || cleanLine,
        relation: parts.length > 1 ? parts[1] : "-",
        volume: parts.length > 2 ? parts[2] : "-",
        cpc: parts.length > 3 ? parts[3] : "-"
      };
    });
  } else if (result?.palavras_relacionadas) {
    const keywordArray = Array.isArray(result.palavras_relacionadas) 
      ? result.palavras_relacionadas 
      : Object.values(result.palavras_relacionadas);
    
    // Skip first two entries
    keywords = keywordArray.slice(2).map((kw: string) => ({
      keyword: kw,
      relation: "-",
      volume: "-",
      cpc: "-"
    }));
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Resultado para: "{keyword}"</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Palavras-chave relacionadas a "{keyword}"
        </h4>
        
        {keywords.length > 0 ? (
          <KeywordHistoryTable keywords={keywords} />
        ) : (
          <p className="text-gray-500">Nenhuma palavra-chave encontrada no resultado.</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => onUseResult(item)}
        >
          Usar este resultado
        </Button>
      </div>
    </div>
  );
};
