
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatMarkdownContent } from '@/lib/markdown-formatter';
import { MarkdownOutput } from '@/components/market-target/MarkdownOutput';

interface SearchFunnelResultProps {
  result: any;
}

export function SearchFunnelResult({ result }: SearchFunnelResultProps) {
  if (!result) return null;
  
  try {
    console.log('SearchFunnelResult component received:', result);
    
    return (
      <Card className="shadow-lg w-full">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">Resultado do Funil de Busca</h3>
          <div className="h-full overflow-visible">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              {result.output ? (
                <div className="whitespace-pre-wrap bg-accent rounded-lg p-4">
                  <MarkdownOutput output={result.output} />
                </div>
              ) : (
                <div className="bg-accent rounded-lg p-4">
                  <pre className="break-words whitespace-pre-wrap">
                    {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Erro ao exibir resultado:', error);
    return <div className="text-destructive">Erro ao exibir resultado: {String(error)}</div>;
  }
}
