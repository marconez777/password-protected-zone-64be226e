
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Palavras-chave Relacionadas:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {keywords.map((keyword, index) => (
          <Card key={index} className="bg-gray-50">
            <CardContent className="p-3">
              {keyword}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
