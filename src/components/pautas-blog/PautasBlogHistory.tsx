
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText } from 'lucide-react';

interface HistoryItem {
  id: string;
  user_id: string;
  tipo_recurso: string;
  input_original: any;
  output_gerado: any;
  created_at: string;
}

interface PautasBlogHistoryProps {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
}

export function PautasBlogHistory({ setActiveTab, setFormResult }: PautasBlogHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
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
          const formattedData = data.map((item) => ({
            ...item,
            created_at: item.data_criacao
          }));
          setHistory(formattedData as HistoryItem[]);
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

  const handleLoadResult = (item: HistoryItem) => {
    setFormResult(item.output_gerado);
    setActiveTab('formulario');
    
    toast({
      title: "Resultado carregado",
      description: "O resultado foi carregado com sucesso."
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium">Nenhum resultado encontrado</h3>
        <p className="mt-2">Você ainda não gerou nenhuma pauta para blog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-medium">Palavra-chave:</span> 
              <span className="ml-2">{item.input_original.palavraChave || 'N/A'}</span>
            </div>
            
            <div>
              <span className="font-medium">Data:</span> 
              <span className="ml-2">
                {new Date(item.created_at).toLocaleDateString('pt-BR')} às{' '}
                {new Date(item.created_at).toLocaleTimeString('pt-BR')}
              </span>
            </div>
            
            <div className="mt-2">
              <Button onClick={() => handleLoadResult(item)} size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Visualizar resultado
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
