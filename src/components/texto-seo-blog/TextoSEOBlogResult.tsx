
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
};

export function TextoSEOBlogResult({ result }: { result: SEOResult | null }) {
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

  // Se não tiver conteúdo para mostrar
  if (!result.texto && !result.titulo && !result.h1) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="texto" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="texto">Texto Completo</TabsTrigger>
            <TabsTrigger value="estrutura">Estrutura SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="texto">
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-4">
                {result.titulo && (
                  <h1 className="text-2xl font-bold text-gray-800">{result.titulo}</h1>
                )}
                {result.texto && (
                  <div className="whitespace-pre-wrap">
                    {result.texto}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="estrutura">
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-4">
                {result.h1 && (
                  <div>
                    <p className="font-medium text-gray-500">H1:</p>
                    <p className="pl-4 font-semibold">{result.h1}</p>
                  </div>
                )}
                
                {result.h2s && result.h2s.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-500">H2:</p>
                    <ul className="list-disc pl-8">
                      {result.h2s.map((h2, index) => (
                        <li key={index} className="font-semibold">{h2}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.meta_description && (
                  <div>
                    <p className="font-medium text-gray-500">Meta Description:</p>
                    <p className="pl-4">{result.meta_description}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
