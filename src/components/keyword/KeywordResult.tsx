
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceResultDisplay } from '../shared/ResourceResultDisplay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type KeywordItem = {
  keyword: string;
  volume?: string | number;
  cpc?: string | number;
}

type KeywordResultProps = {
  result: any;
};

export const KeywordResult = ({ result }: KeywordResultProps) => {
  const [keywordItems, setKeywordItems] = useState<KeywordItem[]>([]);
  
  useEffect(() => {
    if (result) {
      console.log("Processing result:", result);
      
      if (result.message) {
        // If there's an error message, don't process keywords
        setKeywordItems([]);
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
        
        // Convert to table format with empty volume and CPC
        const formattedItems = lines.map(keyword => ({
          keyword,
          volume: "-",
          cpc: "-"
        }));
        
        setKeywordItems(formattedItems);
      } else if (result.palavras_relacionadas) {
        // Support for the previous format
        const keywordArray = Array.isArray(result.palavras_relacionadas) 
          ? result.palavras_relacionadas 
          : Object.values(result.palavras_relacionadas);
        
        // Convert to table format
        const formattedItems = keywordArray.map((keyword: string) => ({
          keyword,
          volume: "-",
          cpc: "-"
        }));
        
        setKeywordItems(formattedItems);
      } else {
        console.error("Result doesn't contain expected data structure:", result);
        setKeywordItems([]);
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

  if (keywordItems.length === 0) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Nenhum resultado encontrado</AlertTitle>
        <AlertDescription>
          Não foram encontradas palavras-chave relacionadas. Tente uma palavra-chave diferente.
        </AlertDescription>
      </Alert>
    );
  }

  // Get the original keyword from the input
  const originalKeyword = result.input_original?.palavras_chave || result?.palavras_chave || "Palavra-chave";

  return (
    <ResourceResultDisplay title="Palavras-chave Relacionadas">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Palavras-chave relacionadas a "{originalKeyword}"
        </h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Palavra</TableHead>
              <TableHead>Volume de Busca</TableHead>
              <TableHead>CPC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.keyword}</TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.cpc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ResourceResultDisplay>
  );
};
