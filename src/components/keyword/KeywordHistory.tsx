
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Trash2 } from 'lucide-react';
import { ResourceHistoryDisplay } from '@/components/shared/ResourceHistoryDisplay';
import { KeywordHistoryItem } from './KeywordHistoryItem';
import { KeywordHistoryPreview } from './KeywordHistoryPreview';

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

  // Custom render functions for ResourceHistoryDisplay
  const renderItemSummary = (item: any) => {
    return <KeywordHistoryItem item={item} />;
  };

  const renderItemPreview = (item: any) => {
    return <KeywordHistoryPreview 
      item={item} 
      onUseResult={handleUseResult} 
    />;
  };

  // If selected item is set, render a detailed view
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

  // Render the history list with ResourceHistoryDisplay
  return (
    <ResourceHistoryDisplay
      loading={loading}
      history={history}
      selectedItem={null}
      onViewItem={handleViewItem}
      onDeleteItem={handleDeleteItem}
      onBackToHistory={handleBackToHistory}
      renderItemPreview={renderItemPreview}
      renderItemSummary={renderItemSummary}
      noHistoryMessage="Você ainda não gerou nenhuma palavra-chave relacionada."
    />
  );
};
