
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, RotateCw } from "lucide-react";

export type MetaDadosHistoryProps = {
  setActiveTab: (tab: string) => void;
  setFormResult: (result: any) => void;
};

export function MetaDadosHistory({ setActiveTab, setFormResult }: MetaDadosHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("user_results")
        .select("*")
        .eq("user_id", user.id)
        .eq("tipo_recurso", "metadata_generation")
        .order("created_at", { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      setHistory(data || []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHistory();
  }, [user]);

  const handleHistoryItemClick = (resultData: any) => {
    setFormResult(resultData.output_gerado);
    setActiveTab("result");
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Histórico</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchHistory} disabled={isLoading}>
            <RotateCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Nenhum registro encontrado.
          </div>
        ) : (
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 border rounded flex justify-between items-center hover:bg-accent cursor-pointer"
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.input_original?.nomeEmpresa || "Sem nome"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.input_original?.tipoPagina || "Tipo não especificado"}: {item.input_original?.palavraChave || "Sem palavra-chave"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
