
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type KeywordHistoryProps = {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
};

export const KeywordHistory = ({ setActiveTab, setFormResult }: KeywordHistoryProps) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, [user?.id]);

  const fetchHistory = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('tipo_recurso', 'keyword')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching keyword history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: any) => {
    setFormResult(item.output_gerado);
    setActiveTab('formulario');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-mkranker-purple" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-12">
        <p className="text-gray-500 mb-4">Você ainda não gerou nenhuma palavra-chave relacionada.</p>
        <Button onClick={() => setActiveTab('formulario')}>
          Criar Nova Pesquisa
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="hover:border-mkranker-purple/40 transition-colors cursor-pointer" onClick={() => handleItemClick(item)}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {item.input_original.palavras_chave}
                  </h3>
                  {item.output_gerado?.palavras_relacionadas && (
                    <p className="text-sm text-gray-500 mt-1">
                      {Array.isArray(item.output_gerado.palavras_relacionadas) 
                        ? item.output_gerado.palavras_relacionadas.slice(0, 3).join(', ') + 
                          (item.output_gerado.palavras_relacionadas.length > 3 ? '...' : '')
                        : 'Sem resultado detalhado'}
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {format(new Date(item.created_at), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
