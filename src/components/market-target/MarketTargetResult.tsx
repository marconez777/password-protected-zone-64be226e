
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CompleteAnalysisTab } from './CompleteAnalysisTab';
import { AnalysisSection } from './AnalysisSection';
import { MarkdownOutput } from './MarkdownOutput';

interface MarketTargetResultProps {
  result: any;
}

export function MarketTargetResult({ result }: MarketTargetResultProps) {
  const [activeTab, setActiveTab] = useState<string>("completo");

  if (!result) return null;
  
  // Check if the response has output format from webhook
  const hasMarkdownOutput = result.output && typeof result.output === 'string';
  
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">Resultado da Análise</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : hasMarkdownOutput ? (
          <MarkdownOutput output={result.output} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="completo">Análise Completa</TabsTrigger>
              <TabsTrigger value="mercado">Mercado</TabsTrigger>
              <TabsTrigger value="publico">Público-Alvo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completo">
              <CompleteAnalysisTab 
                mercado={result.mercado}
                publico={result.publico}
                recomendacoes={result.recomendacoes}
              />
            </TabsContent>
            
            <TabsContent value="mercado">
              {result.mercado ? (
                <AnalysisSection title="Análise de Mercado" content={result.mercado} />
              ) : (
                <p className="text-muted-foreground italic">Nenhuma análise de mercado disponível</p>
              )}
            </TabsContent>
            
            <TabsContent value="publico">
              {result.publico ? (
                <AnalysisSection title="Público-Alvo" content={result.publico} />
              ) : (
                <p className="text-muted-foreground italic">Nenhuma informação de público-alvo disponível</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
