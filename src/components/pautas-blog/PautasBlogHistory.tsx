
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ResourceHistoryDisplay } from '@/components/shared/ResourceHistoryDisplay';
import { PautasBlogResult } from './PautasBlogResult';

interface HistoryItem {
  id: string;
  user_id: string;
  tipo_recurso: string;
  input_original: any;
  output_gerado: any;
  created_at?: string;
  data_criacao: string;
}

interface PautasBlogHistoryProps {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
}

export function PautasBlogHistory({ setActiveTab, setFormResult }: PautasBlogHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('tipo_recurso', 'pautas_blog')
          .order('data_criacao', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          console.log("History data loaded:", data);
          setHistory(data as HistoryItem[]);
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar seu histórico.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user, supabase, toast]);

  const handleViewItem = (item: HistoryItem) => {
    console.log("Viewing history item:", item);
    setSelectedItem(item);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_results')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setHistory(history.filter(item => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }

      toast({
        title: "Excluído com sucesso",
        description: "O item foi removido do histórico.",
      });
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o item.",
        variant: "destructive",
      });
    }
  };

  const handleBackToHistory = () => {
    setSelectedItem(null);
  };

  const handleLoadResult = (item: HistoryItem) => {
    console.log("Loading result from history:", item.output_gerado);
    setFormResult(item.output_gerado);
    setActiveTab('formulario');
    
    toast({
      title: "Resultado carregado",
      description: "O resultado foi carregado com sucesso."
    });
  };

  return (
    <ResourceHistoryDisplay
      loading={loading}
      history={history}
      selectedItem={selectedItem}
      onViewItem={handleViewItem}
      onDeleteItem={handleDeleteItem}
      onBackToHistory={handleBackToHistory}
      renderItemPreview={(item) => (
        <PautasBlogResult result={item.output_gerado} />
      )}
      renderItemSummary={(item) => (
        <>
          <p className="font-medium">Palavra-chave: {item.input_original.palavraChave}</p>
          <p className="text-sm text-gray-500">
            {new Date(item.data_criacao || item.created_at || '').toLocaleDateString('pt-BR')} às{' '}
            {new Date(item.data_criacao || item.created_at || '').toLocaleTimeString('pt-BR')}
          </p>
        </>
      )}
      noHistoryMessage="Você ainda não gerou nenhuma pauta para blog. Gere novas pautas para visualizá-las aqui."
    />
  );
}
