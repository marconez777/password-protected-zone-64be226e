
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatMarkdownContent } from "@/lib/utils"; // Import from utils where it's re-exported

export interface SearchFunnelHistoryProps {
  setActiveTab: Dispatch<SetStateAction<string>>;
  setFormResult: Dispatch<SetStateAction<any>>;
}

export function SearchFunnelHistory({ setActiveTab, setFormResult }: SearchFunnelHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('tipo_recurso', 'search_funnel')
          .order('data_criacao', { ascending: false });
          
        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        toast({
          title: "Erro ao carregar histórico",
          description: "Não foi possível carregar seu histórico.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [user, toast]);
  
  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_results')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setHistory(history.filter(item => item.id !== id));
      
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
      
      toast({
        title: "Item excluído",
        description: "O item foi removido do histórico com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o item do histórico.",
        variant: "destructive",
      });
    }
  };

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
  };

  const handleSelectItemForForm = (item: any) => {
    if (item.output_gerado) {
      setFormResult(item.output_gerado);
      setActiveTab('formulario');
    }
  };
  
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
          Nenhum resultado encontrado no histórico. Gere novos funis para visualizá-los aqui.
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
            onClick={() => setSelectedItem(null)}
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
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="divide-y">
              {history.map((item) => (
                <div key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.input_original?.microNicho || "Sem título"}</p>
                    <p className="text-sm text-gray-500">{new Date(item.data_criacao).toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewItem(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteItem(item.id)}
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
