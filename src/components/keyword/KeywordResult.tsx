
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceResultDisplay } from '../shared/ResourceResultDisplay';

type KeywordResultProps = {
  result: any;
};

export const KeywordResult = ({ result }: KeywordResultProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  
  useEffect(() => {
    if (result) {
      console.log("Processing result:", result);
      
      if (result.message) {
        // If there's an error message, don't process keywords
        setKeywords([]);
        return;
      }
      
      // Check if result has output format from the webhook
      if (result.output) {
        // Split by new lines and filter empty lines
        const lines = result.output
          .split('\n')
          .filter(line => line.trim().length > 0)
          // Remove numbers and dots at the beginning (e.g., "1. ")
          .map(line => line.replace(/^\d+\.\s*/, '').trim());
          
        console.log("Extracted keywords:", lines);
        setKeywords(lines);
      } else if (result.palavras_relacionadas) {
        // Support for the previous format
        const keywordArray = Array.isArray(result.palavras_relacionadas) 
          ? result.palavras_relacionadas 
          : Object.values(result.palavras_relacionadas);
        
        setKeywords(keywordArray as string[]);
      } else {
        console.error("Result doesn't contain expected data structure:", result);
        setKeywords([]);
      }
    }
  }, [result]);

  if (!result) {
    return null;
  }

  if (result.message) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Mensagem</AlertTitle>
        <AlertDescription>{result.message}</AlertDescription>
      </Alert>
    );
  }

  if (keywords.length === 0) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Nenhum resultado encontrado</AlertTitle>
        <AlertDescription>
          Não foram encontradas palavras-chave relacionadas. Tente uma palavra-chave diferente.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ResourceResultDisplay title="Palavras-chave Relacionadas">
      <div className="bg-accent rounded-lg p-4">
        <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
          Palavras-chave Sugeridas
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          {keywords.map((keyword, index) => (
            <li key={index} className="text-gray-800">{keyword}</li>
          ))}
        </ul>
      </div>
    </ResourceResultDisplay>
  );
};
