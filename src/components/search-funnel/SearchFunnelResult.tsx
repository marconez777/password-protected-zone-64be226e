
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFunnelResultProps {
  result: any;
}

export function SearchFunnelResult({ result }: SearchFunnelResultProps) {
  if (!result) return null;
  
  try {
    return (
      <Card className="shadow-lg w-full">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-4">Resultado do Funil de Busca</h3>
          <div className="h-full overflow-visible">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                <pre className="break-words">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return <div className="text-destructive">Erro ao exibir resultado.</div>;
  }
}
