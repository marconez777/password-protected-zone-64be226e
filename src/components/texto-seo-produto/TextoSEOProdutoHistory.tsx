
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ResourceHistoryDisplay } from "@/components/shared/ResourceHistoryDisplay";
import { TextoSEOProdutoResult } from "./TextoSEOProdutoResult";

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

export function TextoSEOProdutoHistory({ setActiveTab, setFormResult }: HistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
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
          .eq("tipo_recurso", "texto_seo_produto")
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
          description: "Não foi possível carregar seu histórico de texto SEO para produto.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [user, toast]);

  const handleViewItem = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  const handleViewOnForm = (item: HistoryItem) => {
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
      setSelectedItem(null);
      
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

  const handleBackToHistory = () => {
    setSelectedItem(null);
  };

  return (
    <ResourceHistoryDisplay
      loading={loading}
      history={history}
      selectedItem={selectedItem}
      onViewItem={handleViewItem}
      onDeleteItem={handleDeleteItem}
      onBackToHistory={handleBackToHistory}
      noHistoryMessage="Você ainda não possui histórico de textos SEO para produto."
      renderItemPreview={(item) => <TextoSEOProdutoResult result={item.output_gerado} />}
      renderItemSummary={(item) => (
        <div>
          <div className="font-medium">
            {item.input_original.nomeProduto || "Sem título"}
          </div>
          <div className="text-sm text-gray-500">
            Palavra-chave: {item.input_original.palavraChave || "N/A"}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(item.created_at).toLocaleDateString()} às{" "}
            {new Date(item.created_at).toLocaleTimeString()}
          </div>
        </div>
      )}
    />
  );
}
