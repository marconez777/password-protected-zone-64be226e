
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SearchFunnelHistoryItemView } from "./SearchFunnelHistoryItemView";
import { SearchFunnelHistoryList } from "./SearchFunnelHistoryList";
import { LoadingState, EmptyState } from "./SearchFunnelHistoryStates";

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
    fetchHistory();
  }, [user, toast]);
  
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
  
  const handleBackToHistory = () => {
    setSelectedItem(null);
  };
  
  if (loading) {
    return <LoadingState isLoading={loading} />;
  }
  
  if (history.length === 0) {
    return <EmptyState isEmpty={true} />;
  }

  if (selectedItem) {
    return (
      <SearchFunnelHistoryItemView
        selectedItem={selectedItem}
        onBack={handleBackToHistory}
      />
    );
  }

  return (
    <SearchFunnelHistoryList
      history={history}
      onViewItem={handleViewItem}
      onDeleteItem={handleDeleteItem}
    />
  );
}
