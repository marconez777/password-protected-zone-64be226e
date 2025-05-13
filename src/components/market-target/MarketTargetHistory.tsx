
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";

export function MarketTargetHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('tipo_recurso', 'market_target')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-mkranker-purple" />
      </div>
    );
  }
  
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Nenhum resultado encontrado no histórico.</p>
        </CardContent>
      </Card>
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
            ← Voltar para o histórico
          </Button>
          
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">Consulta de {new Date(selectedItem.created_at).toLocaleString()}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Nicho</p>
                    <p className="font-medium">{selectedItem.input_original?.nicho || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Serviço</p>
                    <p className="font-medium">{selectedItem.input_original?.servico || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Segmentos</p>
                    <p className="font-medium">{selectedItem.input_original?.segmentos || "-"}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Problema ou Necessidade</p>
                  <p className="font-medium">{selectedItem.input_original?.problema || "-"}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {selectedItem.output_gerado?.mercado && (
                  <div>
                    <h4 className="text-lg font-medium text-mkranker-purple mb-2">Análise de Mercado:</h4>
                    <p className="whitespace-pre-wrap">{selectedItem.output_gerado.mercado}</p>
                  </div>
                )}
                
                {selectedItem.output_gerado?.publico && (
                  <div>
                    <h4 className="text-lg font-medium text-mkranker-purple mb-2">Público-Alvo:</h4>
                    <p className="whitespace-pre-wrap">{selectedItem.output_gerado.publico}</p>
                  </div>
                )}
                
                {selectedItem.output_gerado?.recomendacoes && (
                  <div>
                    <h4 className="text-lg font-medium text-mkranker-purple mb-2">Recomendações:</h4>
                    <p className="whitespace-pre-wrap">{selectedItem.output_gerado.recomendacoes}</p>
                  </div>
                )}
              </div>
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
                    <p className="font-medium">{item.input_original?.nicho || "Sem título"}</p>
                    <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedItem(item)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
