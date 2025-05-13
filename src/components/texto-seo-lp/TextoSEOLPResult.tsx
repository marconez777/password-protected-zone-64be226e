
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type SEOResult = {
  titulo?: string;
  texto?: string;
  h1?: string;
  h2s?: string[];
  meta_description?: string;
  message?: string;
  output?: string; // Added to handle n8n webhook output format
};

export function TextoSEOLPResult({ result }: { result: SEOResult | null }) {
  const [activeTab, setActiveTab] = useState<string>("texto");
  
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
  if (result.message) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-amber-600">
            {result.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Processa o resultado do webhook se vier no formato output
  const processedResult = {
    texto: result.texto || result.output,
    titulo: result.titulo,
    h1: result.h1,
    h2s: result.h2s,
    meta_description: result.meta_description
  };

  // Se não tiver conteúdo para mostrar
  if (!processedResult.texto && !processedResult.titulo && !processedResult.h1) {
    return null;
  }

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
      } else if (line.trim().startsWith('### ')) {
        // Se é um título H3
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
        
        result.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2">{formatBoldText(line.substring(4))}</h3>);
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
    <Card className="border border-gray-200 shadow-sm w-full">
      <CardContent className="p-4">
        <Tabs defaultValue="texto" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="texto">Texto Completo</TabsTrigger>
            <TabsTrigger value="estrutura">Estrutura SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="texto" className="h-full">
            <div className="h-full overflow-visible">
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <div className="space-y-4 pb-6">
                  {processedResult.titulo && (
                    <h1 className="text-2xl font-bold text-gray-800">{processedResult.titulo}</h1>
                  )}
                  {processedResult.texto && (
                    <div className="whitespace-pre-wrap">
                      {formatList(processedResult.texto)}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="estrutura" className="h-full">
            <div className="h-full overflow-visible">
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <div className="space-y-4 pb-6">
                  {processedResult.h1 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-700">H1:</p>
                      <p className="pl-4 font-semibold">{processedResult.h1}</p>
                    </div>
                  )}
                  
                  {processedResult.h2s && processedResult.h2s.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-700">H2:</p>
                      <ul className="list-disc pl-8">
                        {processedResult.h2s.map((h2, index) => (
                          <li key={index} className="font-semibold">{h2}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {processedResult.meta_description && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-700">Meta Description:</p>
                      <p className="pl-4">{processedResult.meta_description}</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
