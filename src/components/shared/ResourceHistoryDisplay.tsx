
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResourceHistoryDisplayProps {
  loading: boolean;
  history: any[];
  selectedItem: any | null;
  onViewItem: (item: any) => void;
  onDeleteItem: (id: string) => void;
  onBackToHistory: () => void;
  renderItemPreview: (item: any) => React.ReactNode;
  renderItemSummary: (item: any) => React.ReactNode;
  noHistoryMessage?: string;
}

export function ResourceHistoryDisplay({
  loading,
  history,
  selectedItem,
  onViewItem,
  onDeleteItem,
  onBackToHistory,
  renderItemPreview,
  renderItemSummary,
  noHistoryMessage = "Nenhum resultado encontrado no histórico. Gere novas análises para visualizá-las aqui."
}: ResourceHistoryDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-mkranker-purple" />
      </div>
    );
  }
  
  if (history.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          {noHistoryMessage}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {selectedItem ? (
        <div>
          <Button 
            variant="ghost" 
            onClick={onBackToHistory}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o histórico
          </Button>
          
          <Card className="shadow-lg w-full bg-white">
            <CardContent className="pt-6">
              <ScrollArea className="h-full overflow-auto max-h-[calc(100vh-300px)] pr-4">
                <div className="space-y-6 pb-6">
                  {renderItemPreview(selectedItem)}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="divide-y">
              {history.map((item) => (
                <div key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    {renderItemSummary(item)}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewItem(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
