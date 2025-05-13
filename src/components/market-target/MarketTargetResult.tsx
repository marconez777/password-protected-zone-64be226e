
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MarketTargetResultProps {
  result: any;
}

export function MarketTargetResult({ result }: MarketTargetResultProps) {
  if (!result) return null;
  
  // Check if the response has output format from webhook
  const hasMarkdownOutput = result.output && typeof result.output === 'string';
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Resultado da Análise:</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : hasMarkdownOutput ? (
          <ScrollArea className="max-h-[600px]">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap">
                {result.output}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-6">
            {result.mercado && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Análise de Mercado:</h4>
                <p className="whitespace-pre-wrap">{result.mercado}</p>
              </div>
            )}
            
            {result.publico && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Público-Alvo:</h4>
                <p className="whitespace-pre-wrap">{result.publico}</p>
              </div>
            )}
            
            {result.recomendacoes && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Recomendações:</h4>
                <p className="whitespace-pre-wrap">{result.recomendacoes}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
