
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type KeywordHistoryProps = {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
};

export const KeywordHistory = ({ setActiveTab, setFormResult }: KeywordHistoryProps) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
        .order('data_criacao', { ascending: false });
      
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

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
  };

  const handleBackToHistory = () => {
    setSelectedItem(null);
  };

  const handleUseResult = (item: any) => {
    setFormResult(item.output_gerado);
    setActiveTab('formulario');
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchHistory();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const renderItemSummary = (item: any) => {
    const keyword = item.input_original?.palavras_chave || "Sem palavra-chave";
    const formattedDate = format(
      new Date(item.data_criacao), 
      "dd 'de' MMMM 'de' yyyy, HH:mm",
      { locale: ptBR }
    );
    
    return (
      <div>
        <div className="font-medium text-gray-800">{keyword}</div>
        <div className="text-xs text-gray-500 mt-1">{formattedDate}</div>
      </div>
    );
  };

  const renderItemPreview = (item: any) => {
    const keyword = item.input_original?.palavras_chave || "Sem palavra-chave";
    const formattedDate = format(
      new Date(item.data_criacao), 
      "dd 'de' MMMM 'de' yyyy, HH:mm",
      { locale: ptBR }
    );
    
    // Extract keywords from the result
    let keywords = [];
    const result = item.output_gerado;
    
    if (result?.output) {
      const lines = result.output
        .split('\n')
        .filter((line: string) => line.trim().length > 0);
      
      // Process lines, skipping the first two
      keywords = lines.slice(2).map((line: string) => {
        const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
        const parts = cleanLine.split('|').map((part: string) => part.trim()).filter(Boolean);
        
        return {
          keyword: parts[0] || cleanLine,
          relation: parts.length > 1 ? parts[1] : "-",
          volume: parts.length > 2 ? parts[2] : "-",
          cpc: parts.length > 3 ? parts[3] : "-"
        };
      });
    } else if (result?.palavras_relacionadas) {
      const keywordArray = Array.isArray(result.palavras_relacionadas) 
        ? result.palavras_relacionadas 
        : Object.values(result.palavras_relacionadas);
      
      // Skip first two entries
      keywords = keywordArray.slice(2).map((kw: string) => ({
        keyword: kw,
        relation: "-",
        volume: "-",
        cpc: "-"
      }));
    }
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Resultado para: "{keyword}"</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
            Palavras-chave relacionadas a "{keyword}"
          </h4>
          
          {keywords.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="border border-gray-300">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 border border-gray-300">Palavra-chave</TableHead>
                    <TableHead className="font-semibold text-gray-700 border border-gray-300">Relação</TableHead>
                    <TableHead className="font-semibold text-gray-700 border border-gray-300">Volume de Busca</TableHead>
                    <TableHead className="font-semibold text-gray-700 border border-gray-300">CPC (R$)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.map((item: any, index: number) => (
                    <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <TableCell className="py-2 border border-gray-300">{item.keyword}</TableCell>
                      <TableCell className="py-2 border border-gray-300">{item.relation}</TableCell>
                      <TableCell className="py-2 border border-gray-300">{item.volume}</TableCell>
                      <TableCell className="py-2 border border-gray-300">{item.cpc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma palavra-chave encontrada no resultado.</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => handleUseResult(item)}
          >
            Usar este resultado
          </Button>
        </div>
      </div>
    );
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

  if (selectedItem) {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={handleBackToHistory}
          className="mb-4"
        >
          ← Voltar para o histórico
        </Button>
        
        <Card>
          <CardContent className="p-6">
            {renderItemPreview(selectedItem)}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] max-h-[80vh]">
            <div className="divide-y">
              {history.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div className="flex-grow">
                    {renderItemSummary(item)}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewItem(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
