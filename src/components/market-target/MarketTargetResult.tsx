
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
  
  // Function to format Markdown headings to proper HTML elements
  const formatHeadings = (text: string) => {
    if (!text) return null;
    
    // Replace # headings with proper HTML elements
    return text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      const className = level === 1 
        ? "text-2xl font-bold text-mkranker-purple mt-4 mb-3" 
        : level === 2 
          ? "text-xl font-bold text-mkranker-purple mt-3 mb-2" 
          : "text-lg font-bold text-mkranker-purple mt-2 mb-1";
      
      return `<h${level} class="${className}">${content}</h${level}>`;
    });
  };
  
  // Function to format text with bold and create proper lists
  const formatContent = (text: string) => {
    if (!text) return null;
    
    // First format headings
    let formattedText = formatHeadings(text);
    
    // Process the content line by line
    const lines = formattedText.split('\n');
    const result: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];
    let currentHTML = '';
    
    lines.forEach((line, index) => {
      // If it's already an HTML heading (from formatHeadings), render it directly
      if (line.startsWith('<h')) {
        // First close any open list
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
        
        // Then render the heading
        const element = document.createElement('div');
        element.innerHTML = line;
        const Tag = line.substring(1, 3) as keyof JSX.IntrinsicElements;
        const className = element.firstChild?.getAttribute('class') || '';
        const content = element.textContent || '';
        
        result.push(React.createElement(
          Tag, 
          { key: index, className }, 
          formatBoldText(content)
        ));
      }
      else if (line.trim().startsWith('- ')) {
        // If it's a list item
        inList = true;
        listItems.push(line.trim().substring(2));
      } 
      else if (line.trim().startsWith('* ')) {
        // Alternative list syntax
        inList = true;
        listItems.push(line.trim().substring(2));
      }
      else {
        // If it's not a list item but we have an open list
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
        
        // If it's a regular paragraph
        if (line.trim()) {
          result.push(<p key={index} className="mb-2">{formatBoldText(line)}</p>);
        } else {
          result.push(<div key={index} className="h-2" />);
        }
      }
    });
    
    // Close any open list at the end
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
  
  // Function to format bold text
  const formatBoldText = (text: string) => {
    if (!text) return null;
    
    // First handle **text** format (Markdown bold)
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">Resultado da Análise</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : hasMarkdownOutput ? (
          <div className="max-w-none">
            <div className="whitespace-pre-wrap">
              {formatContent(result.output)}
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="completo">Análise Completa</TabsTrigger>
              <TabsTrigger value="mercado">Mercado</TabsTrigger>
              <TabsTrigger value="publico">Público-Alvo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completo">
              <div className="space-y-6">
                {result.mercado && (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                      Análise de Mercado
                    </h4>
                    <div className="whitespace-pre-wrap">
                      {formatContent(result.mercado)}
                    </div>
                  </div>
                )}
                
                {result.publico && (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                      Público-Alvo
                    </h4>
                    <div className="whitespace-pre-wrap">
                      {formatContent(result.publico)}
                    </div>
                  </div>
                )}
                
                {result.recomendacoes && (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                      Recomendações
                    </h4>
                    <div className="whitespace-pre-wrap">
                      {formatContent(result.recomendacoes)}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="mercado">
              {result.mercado ? (
                <div className="bg-accent rounded-lg p-4">
                  <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                    Análise de Mercado
                  </h4>
                  <div className="whitespace-pre-wrap">
                    {formatContent(result.mercado)}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground italic">Nenhuma análise de mercado disponível</p>
              )}
            </TabsContent>
            
            <TabsContent value="publico">
              {result.publico ? (
                <div className="bg-accent rounded-lg p-4">
                  <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
                    Público-Alvo
                  </h4>
                  <div className="whitespace-pre-wrap">
                    {formatContent(result.publico)}
                  </div>
                </div>
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
