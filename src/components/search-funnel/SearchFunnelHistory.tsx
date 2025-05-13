
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ArrowLeft } from 'lucide-react';

export function SearchFunnelHistory() {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('pt-BR');
  };

  if (selectedItem) {
    return (
      <div className="mt-4">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-1"
          onClick={() => setSelectedItem(null)}
        >
          <ArrowLeft size={16} />
          Voltar para o histórico
        </Button>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">
            Detalhes do funil criado em {formatDate(selectedItem.data_criacao)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

          <div>
            <h4 className="font-medium text-lg mb-3">Resultado</h4>
            <ScrollArea className="h-full overflow-visible max-h-[calc(100vh-300px)]">
              <div className="bg-muted rounded-md p-4">
                <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                  {JSON.stringify(selectedItem.output_gerado, null, 2)}
                </pre>
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    );
  }

  const renderHistoryItem = (item: any) => {
    return (
      <Card key={item.id} className="p-4 mb-4 hover:border-mkranker-purple/40 transition-colors cursor-pointer" 
        onClick={() => setSelectedItem(item)}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium mb-1">{item.input_original?.microNicho || "Sem título"}</h3>
            <p className="text-sm text-gray-500">
              Criado em: {formatDate(item.data_criacao)}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}>
            <Eye className="h-4 w-4 mr-1" /> Ver
          </Button>
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
