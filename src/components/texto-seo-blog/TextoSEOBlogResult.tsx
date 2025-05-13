
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";
import { formatMarkdownContent } from "@/lib/utils";

type SEOResult = {
  titulo?: string;
  texto?: string;
  h1?: string;
  h2s?: string[];
  meta_description?: string;
  message?: string;
  input_original?: {
    tema?: string;
    palavraChave?: string;
  };
};

export function TextoSEOBlogResult({ result }: { result: SEOResult | null }) {
  const [activeTab, setActiveTab] = useState<string>("texto");
  
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
  if (result.message) {
    return (
      <ResourceResultDisplay 
        title="Texto SEO para Blog" 
        message={result.message}
      >
        <div></div>
      </ResourceResultDisplay>
    );
  }

  // Se não tiver conteúdo para mostrar
  if (!result.texto && !result.titulo && !result.h1) {
    return null;
  }

  // Título para o resultado com base no tema ou título gerado
  const pageTitle = result.input_original?.tema || result.titulo || "Texto SEO para Blog";

  return (
    <ResourceResultDisplay title={pageTitle}>
      <Tabs defaultValue="texto" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="texto">Texto Completo</TabsTrigger>
          <TabsTrigger value="estrutura">Estrutura SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="texto">
          {result.titulo && (
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{result.titulo}</h1>
          )}
          {result.texto && (
            <div className="text-gray-700">
              {formatMarkdownContent(result.texto)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="estrutura">
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
        </TabsContent>
      </Tabs>
    </ResourceResultDisplay>
  );
}
