
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MarketTargetResultProps {
  result: any;
}

export function MarketTargetResult({ result }: MarketTargetResultProps) {
  const [activeTab, setActiveTab] = useState<string>("completo");

  if (!result) return null;
  
  // Check if the response has output format from webhook
  const hasMarkdownOutput = result.output && typeof result.output === 'string';
  
  // Função para formatar texto com negrito
  const formatBoldText = (text: string) => {
    if (!text) return null;
    
    // Substitui **texto** por <strong>texto</strong>
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  // Função para converter texto em lista quando tem linhas com "- "
  const formatList = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const result: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];
    
    lines.forEach((line, index) => {
      if (line.trim().startsWith('- ')) {
        // Se é um item de lista
        inList = true;
        listItems.push(line.trim().substring(2));
      } else if (line.trim().startsWith('#')) {
        // Tratar cabeçalhos
        if (inList) {
          result.push(
            <ul key={`list-${index}`} className="list-disc pl-5 my-2">
              {listItems.map((item, i) => (
                <li key={i} className="mb-1">{formatBoldText(item)}</li>
              ))}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        
        // Determinar nível do cabeçalho
        const level = line.trim().match(/^#+/)[0].length;
        const text = line.trim().replace(/^#+\s*/, '');
        
        switch(level) {
          case 1:
            result.push(<h1 key={index} className="text-2xl font-bold text-mkranker-purple mt-4 mb-3">{text}</h1>);
            break;
          case 2:
            result.push(<h2 key={index} className="text-xl font-bold text-mkranker-purple mt-3 mb-2">{text}</h2>);
            break;
          case 3:
            result.push(<h3 key={index} className="text-lg font-bold text-mkranker-purple mt-2 mb-1">{text}</h3>);
            break;
          default:
            result.push(<h4 key={index} className="text-base font-bold text-mkranker-purple mt-2 mb-1">{text}</h4>);
        }
      } else {
        // Se não é item de lista, mas tinha uma lista antes
        if (inList) {
          result.push(
            <ul key={`list-${index}`} className="list-disc pl-5 my-2">
              {listItems.map((item, i) => (
                <li key={i} className="mb-1">{formatBoldText(item)}</li>
              ))}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        
        // Adiciona linha normal
        if (line.trim()) {
          result.push(<p key={index} className="mb-2">{formatBoldText(line)}</p>);
        } else {
          result.push(<div key={index} className="h-2" />);
        }
      }
    });
    
    // Se terminar com lista
    if (inList) {
      result.push(
        <ul key="final-list" className="list-disc pl-5 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="mb-1">{formatBoldText(item)}</li>
          ))}
        </ul>
      );
    }
    
    return result;
  };
  
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">Resultado da Análise</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : hasMarkdownOutput ? (
          <ScrollArea className="max-h-[70vh]">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">
                {formatList(result.output)}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="completo">Análise Completa</TabsTrigger>
              <TabsTrigger value="mercado">Mercado</TabsTrigger>
              <TabsTrigger value="publico">Público-Alvo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completo">
              <ScrollArea className="max-h-[70vh]">
                <div className="space-y-6">
                  {result.mercado && (
                    <div className="bg-accent rounded-lg p-4">
                      <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                        Análise de Mercado
                      </h4>
                      <div className="whitespace-pre-wrap">{formatList(result.mercado)}</div>
                    </div>
                  )}
                  
                  {result.publico && (
                    <div className="bg-accent rounded-lg p-4">
                      <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                        Público-Alvo
                      </h4>
                      <div className="whitespace-pre-wrap">{formatList(result.publico)}</div>
                    </div>
                  )}
                  
                  {result.recomendacoes && (
                    <div className="bg-accent rounded-lg p-4">
                      <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                        Recomendações
                      </h4>
                      <div className="whitespace-pre-wrap">{formatList(result.recomendacoes)}</div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="mercado">
              <ScrollArea className="max-h-[70vh]">
                {result.mercado ? (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                      Análise de Mercado
                    </h4>
                    <div className="whitespace-pre-wrap">{formatList(result.mercado)}</div>
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">Nenhuma análise de mercado disponível</p>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="publico">
              <ScrollArea className="max-h-[70vh]">
                {result.publico ? (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                      Público-Alvo
                    </h4>
                    <div className="whitespace-pre-wrap">{formatList(result.publico)}</div>
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">Nenhuma informação de público-alvo disponível</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
