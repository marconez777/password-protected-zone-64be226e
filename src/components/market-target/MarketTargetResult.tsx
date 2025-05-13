
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CompleteAnalysisTab } from './CompleteAnalysisTab';
import { AnalysisSection } from './AnalysisSection';
import { MarkdownOutput } from './MarkdownOutput';
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarketTargetResultProps {
  result: any;
}

export function MarketTargetResult({ result }: MarketTargetResultProps) {
  const [activeTab, setActiveTab] = useState<string>("completo");

  if (!result) return null;
  
  // Check if the response has output format from webhook
  const hasMarkdownOutput = result.output && typeof result.output === 'string';
  
  return (
    <Card className="shadow-lg w-full">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">Resultado da Análise</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : hasMarkdownOutput ? (
          <div className="h-full overflow-visible">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="pb-6">
                <MarkdownOutput output={result.output} />
              </div>
            </ScrollArea>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="completo">Análise Completa</TabsTrigger>
              <TabsTrigger value="mercado">Mercado</TabsTrigger>
              <TabsTrigger value="publico">Público-Alvo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completo" className="h-full">
              <div className="h-full overflow-visible">
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="pb-6">
                    <CompleteAnalysisTab 
                      mercado={result.mercado}
                      publico={result.publico}
                      recomendacoes={result.recomendacoes}
                    />
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="mercado" className="h-full">
              <div className="h-full overflow-visible">
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="pb-6">
                    {result.mercado ? (
                      <AnalysisSection title="Análise de Mercado" content={result.mercado} />
                    ) : (
                      <p className="text-muted-foreground italic">Nenhuma análise de mercado disponível</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="publico" className="h-full">
              <div className="h-full overflow-visible">
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="pb-6">
                    {result.publico ? (
                      <AnalysisSection title="Público-Alvo" content={result.publico} />
                    ) : (
                      <p className="text-muted-foreground italic">Nenhuma informação de público-alvo disponível</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
