
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function SearchFunnelHistory() {
  const { user } = useAuth();

  // Fetch previous results for history tab
  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['search-funnel-history'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('tipo_recurso', 'search_funnel')
        .order('data_criacao', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const renderHistoryItem = (item: any) => {
    return (
      <Card key={item.id} className="p-4 mb-4">
        <h3 className="font-medium mb-2">Criado em: {new Date(item.data_criacao).toLocaleString('pt-BR')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Envio:</h4>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-[200px]">
              {JSON.stringify(item.input_original, null, 2)}
            </pre>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Resposta:</h4>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-[200px]">
              {JSON.stringify(item.output_gerado, null, 2)}
            </pre>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="mt-4">
      {isHistoryLoading ? (
        <p>Carregando histórico...</p>
      ) : historyData && historyData.length > 0 ? (
        <div className="space-y-4">
          {historyData.map(renderHistoryItem)}
        </div>
      ) : (
        <p>Nenhum resultado encontrado no histórico.</p>
      )}
    </div>
  );
}
