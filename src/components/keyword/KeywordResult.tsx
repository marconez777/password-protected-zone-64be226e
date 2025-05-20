
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ResourceResultDisplay } from '../shared/ResourceResultDisplay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type KeywordResultProps = {
  result: any;
};

type KeywordData = {
  keyword: string;
  relation?: string;
  volume?: string;
  cpc?: string;
};

export const KeywordResult = ({ result }: KeywordResultProps) => {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  
  useEffect(() => {
    if (result) {
      console.log("Processing result:", result);
      
      if (result.message) {
        // Se houver uma mensagem de erro, não processar as palavras-chave
        setKeywords([]);
        return;
      }
      
      // Verificar se o resultado tem o formato de saída do webhook
      if (result.output) {
        // Dividir por novas linhas e filtrar linhas vazias
        const lines = result.output
          .split('\n')
          .filter(line => line.trim().length > 0);
        
        // Processar cada linha para extrair informações estruturadas
        const processedKeywords: KeywordData[] = lines.map(line => {
          // Remover números e pontos no início (ex., "1. ")
          const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
          
          // Tentar analisar a linha se for no formato "| keyword | relation | volume | cpc |"
          const parts = cleanLine.split('|').map(part => part.trim()).filter(Boolean);
          
          if (parts.length >= 1) {
            return {
              keyword: parts[0],
              relation: parts.length > 1 ? parts[1] : "-",
              volume: parts.length > 2 ? parts[2] : "-",
              cpc: parts.length > 3 ? parts[3] : "-"
            };
          }
          
          // Fallback para linhas que não seguem o formato esperado
          return {
            keyword: cleanLine,
            relation: "-",
            volume: "-",
            cpc: "-"
          };
        });
          
        console.log("Extracted keywords data:", processedKeywords);
        setKeywords(processedKeywords);
      } else if (result.palavras_relacionadas) {
        // Suporte para o formato anterior
        const keywordArray = Array.isArray(result.palavras_relacionadas) 
          ? result.palavras_relacionadas 
          : Object.values(result.palavras_relacionadas);
        
        // Converter para o novo formato de dados
        const processedKeywords = keywordArray.map((keyword: string) => ({
          keyword: keyword,
          relation: "-",
          volume: "-",
          cpc: "-"
        }));
        
        setKeywords(processedKeywords);
      } else {
        console.error("O resultado não contém a estrutura de dados esperada:", result);
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

  // Obter a palavra-chave original da entrada
  const originalKeyword = result.input_original?.palavras_chave || result?.palavras_chave || "Palavra-chave";

  return (
    <ResourceResultDisplay title="Palavras-chave Relacionadas">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Palavras-chave relacionadas a "{originalKeyword}"
        </h4>
        
        <div className="overflow-x-auto">
          <Table>
            <TableBody>
              {keywords.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="py-2">{item.keyword}</TableCell>
                  <TableCell className="py-2">{item.relation}</TableCell>
                  <TableCell className="py-2">{item.volume}</TableCell>
                  <TableCell className="py-2">{item.cpc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ResourceResultDisplay>
  );
};
