
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type KeywordResultProps = {
  result: any;
};

export const KeywordResult = ({ result }: KeywordResultProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  
  useEffect(() => {
    if (result && result.palavras_relacionadas) {
      // Certifique-se de que o resultado seja um array
      const keywordArray = Array.isArray(result.palavras_relacionadas) 
        ? result.palavras_relacionadas 
        : Object.values(result.palavras_relacionadas);
      
      setKeywords(keywordArray as string[]);
    }
  }, [result]);

  if (!result) {
    return null;
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
