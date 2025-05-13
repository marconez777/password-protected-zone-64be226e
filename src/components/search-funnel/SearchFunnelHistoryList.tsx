
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

interface SearchFunnelHistoryListProps {
  history: any[];
  onViewItem: (item: any) => void;
  onDeleteItem: (id: string) => void;
}

export function SearchFunnelHistoryList({ 
  history, 
  onViewItem, 
  onDeleteItem 
}: SearchFunnelHistoryListProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="divide-y">
          {history.map((item) => (
            <div key={item.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.input_original?.microNicho || "Sem título"}</p>
                <p className="text-sm text-gray-500">{new Date(item.data_criacao).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewItem(item)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
