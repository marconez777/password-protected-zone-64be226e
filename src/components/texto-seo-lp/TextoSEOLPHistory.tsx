
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type HistoryProps = {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
};

type HistoryItem = {
  id: string;
  created_at: string;
  input_original: any;
  output_gerado: any;
};

export function TextoSEOLPHistory({ setActiveTab, setFormResult }: HistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from("user_results")
          .select("*")
          .eq("user_id", user.id)
          .eq("tipo_recurso", "texto_seo_lp")
          .order("data_criacao", { ascending: false });
          
        if (error) throw error;
        
        // Map database fields to HistoryItem interface
        const mappedData: HistoryItem[] = (data || []).map(item => ({
          id: item.id,
          created_at: item.data_criacao,
          input_original: item.input_original,
          output_gerado: item.output_gerado
        }));
        
        setHistory(mappedData);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        toast({
          title: "Erro ao carregar histórico",
          description: "Não foi possível carregar seu histórico de texto SEO para LP.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [user, toast]);

  const handleViewResult = (item: HistoryItem) => {
    setFormResult(item.output_gerado);
    setActiveTab("formulario");
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("user_results")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      setHistory(history.filter(item => item.id !== id));
      toast({
        title: "Item excluído",
        description: "O item foi excluído do seu histórico.",
      });
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o item do histórico.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Você ainda não possui histórico de textos SEO para LP.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {history.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-100 p-4 hover:bg-gray-50"
            >
              <div className="mb-2">
                <div className="font-medium">
                  {item.input_original.tema || "Sem título"}
                </div>
                <div className="text-sm text-gray-500">
                  Palavra-chave: {item.input_original.palavraChave || "N/A"}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(item.created_at).toLocaleDateString()} às{" "}
                  {new Date(item.created_at).toLocaleTimeString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewResult(item)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Ver Resultado
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
