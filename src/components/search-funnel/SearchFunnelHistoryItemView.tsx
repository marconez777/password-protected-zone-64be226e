
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatMarkdownContent } from "@/lib/utils"; 

interface SearchFunnelHistoryItemViewProps {
  selectedItem: any;
  onBack: () => void;
}

export function SearchFunnelHistoryItemView({ 
  selectedItem, 
  onBack 
}: SearchFunnelHistoryItemViewProps) {
  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o histórico
      </Button>
      
      <Card className="shadow-lg w-full bg-white">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium">Consulta de {new Date(selectedItem.data_criacao).toLocaleString()}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Micro Nicho</p>
                <p className="font-medium">{selectedItem.input_original?.microNicho || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Público Alvo</p>
                <p className="font-medium">{selectedItem.input_original?.publicoAlvo || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Segmento</p>
                <p className="font-medium">{selectedItem.input_original?.segmento || "-"}</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-full overflow-auto max-h-[calc(100vh-300px)] pr-4">
            <div className="space-y-6 pb-6">
              {selectedItem.output_gerado?.output && typeof selectedItem.output_gerado.output === 'string' ? (
                <div className="bg-accent rounded-lg p-4">
                  <div dangerouslySetInnerHTML={{ 
                    __html: formatMarkdownContent(selectedItem.output_gerado.output) 
                  }} />
                </div>
              ) : (
                <div className="bg-muted rounded-md p-4">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {JSON.stringify(selectedItem.output_gerado, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
