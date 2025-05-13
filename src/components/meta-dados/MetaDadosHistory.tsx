
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText } from 'lucide-react';
import { ResourceHistoryDisplay } from '@/components/shared/ResourceHistoryDisplay';
import { MetaDadosResult } from '@/components/meta-dados/MetaDadosResult';

interface HistoryItem {
  id: string;
  user_id: string;
  tipo_recurso: string;
  input_original: any;
  output_gerado: any;
  created_at: string;
  data_criacao?: string;
}

interface MetaDadosHistoryProps {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
}

export function MetaDadosHistory({ setActiveTab, setFormResult }: MetaDadosHistoryProps) {
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
        
        // Check if session is valid before querying
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          throw new Error('Session invalid or expired');
        }
        
        const { data, error } = await supabase
          .from('user_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('tipo_recurso', 'metadata_generation')
          .order('data_criacao', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedData = data.map((item) => ({
            ...item,
            created_at: item.data_criacao || new Date().toISOString()
          }));
          setHistory(formattedData as HistoryItem[]);
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar seu histórico. Tente fazer login novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user, supabase, toast]);

  const handleViewItem = (item: HistoryItem) => {
    console.log("Visualizando item do histórico:", item);
    setSelectedItem(item);
  };

  const handleBackToHistory = () => {
    setSelectedItem(null);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      // Check if session is valid before deleting
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('Session invalid or expired');
      }
      
      const { error } = await supabase
        .from('user_results')
        .delete()
        .match({ id });

      if (error) throw error;

      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "Excluído",
        description: "O resultado foi excluído com sucesso."
      });
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o resultado. Tente fazer login novamente.",
        variant: "destructive",
      });
    }
  };

  const handleLoadResult = (item: HistoryItem) => {
    console.log("Carregando resultado do histórico:", item.output_gerado);
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
      noHistoryMessage="Você ainda não gerou nenhum meta dado."
      renderItemPreview={(item) => (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Dados do Formulário</h3>
            <div className="space-y-2 bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Nome da Empresa:</span> {item.input_original?.nomeEmpresa || 'N/A'}</p>
              <p><span className="font-medium">Palavra-chave:</span> {item.input_original?.palavraChave || 'N/A'}</p>
              <p><span className="font-medium">Palavra Relacionada:</span> {item.input_original?.palavraRelacionada || 'N/A'}</p>
              <p><span className="font-medium">Tipo de Página:</span> {item.input_original?.tipoPagina || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Meta Dados Gerados</h3>
            <MetaDadosResult result={item.output_gerado} />
          </div>

          <div className="pt-4 flex justify-center">
            <Button onClick={() => handleLoadResult(item)}>
              Usar Este Resultado
            </Button>
          </div>
        </div>
      )}
      renderItemSummary={(item) => (
        <>
          <p className="font-medium">Nome da Empresa: {item.input_original?.nomeEmpresa || 'N/A'}</p>
          <p className="font-medium">Palavra-chave: {item.input_original?.palavraChave || 'N/A'}</p>
          <p className="text-sm text-gray-500">
            {new Date(item.data_criacao || item.created_at || '').toLocaleDateString('pt-BR')} às{' '}
            {new Date(item.data_criacao || item.created_at || '').toLocaleTimeString('pt-BR')}
          </p>
        </>
      )}
    />
  );
}
