
import { useState, useEffect } from 'react';

export type KeywordData = {
  keyword: string;
  relation: string;
  volume: string;
  cpc: string;
};

export const useKeywordData = (result: any) => {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [originalKeyword, setOriginalKeyword] = useState<string>("Palavra-chave");
  const [hasError, setHasError] = useState<boolean>(false);
  
  useEffect(() => {
    if (!result) {
      setKeywords([]);
      return;
    }

    if (result.message) {
      setHasError(true);
      setKeywords([]);
      return;
    }
    
    setHasError(false);
    
    // Extract original keyword
    const keyword = result.input_original?.palavras_chave || result?.palavras_chave || "Palavra-chave";
    setOriginalKeyword(keyword);
    
    // Process keywords from result
    if (result.output) {
      // Dividir por novas linhas e filtrar linhas vazias
      const lines = result.output
        .split('\n')
        .filter((line: string) => line.trim().length > 0);
      
      // Process each line to extract structured information, skipping the first two lines
      const processedKeywords: KeywordData[] = lines
        .slice(2) // Skip the first two lines (header and title line)
        .map((line: string) => {
          // Remove numbers and dots at the beginning (e.g., "1. ")
          const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
          
          // Try to parse the line if it's in the format "| keyword | relation | volume | cpc |"
          const parts = cleanLine.split('|').map(part => part.trim()).filter(Boolean);
          
          if (parts.length >= 1) {
            return {
              keyword: parts[0],
              relation: parts.length > 1 ? parts[1] : "-",
              volume: parts.length > 2 ? parts[2] : "-",
              cpc: parts.length > 3 ? parts[3] : "-"
            };
          }
          
          // Fallback for lines that don't follow the expected format
          return {
            keyword: cleanLine,
            relation: "-",
            volume: "-",
            cpc: "-"
          };
        });
        
      setKeywords(processedKeywords);
    } else if (result.palavras_relacionadas) {
      // Support for the previous format
      const keywordArray = Array.isArray(result.palavras_relacionadas) 
        ? result.palavras_relacionadas 
        : Object.values(result.palavras_relacionadas);
      
      // Convert to the new data format, but skip the first two entries
      const processedKeywords = keywordArray
        .slice(2) // Skip the first two entries
        .map((keyword: string) => ({
          keyword: keyword,
          relation: "-",
          volume: "-",
          cpc: "-"
        }));
      
      setKeywords(processedKeywords);
    } else {
      console.error("The result doesn't contain the expected data structure:", result);
      setKeywords([]);
    }
  }, [result]);
  
  return { keywords, originalKeyword, hasError };
};
