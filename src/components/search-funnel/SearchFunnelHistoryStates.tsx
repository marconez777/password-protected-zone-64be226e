
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  isLoading: boolean;
}

export function LoadingState({ isLoading }: LoadingStateProps) {
  if (!isLoading) return null;
  
  return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-mkranker-purple" />
    </div>
  );
}

interface EmptyStateProps {
  isEmpty: boolean;
}

export function EmptyState({ isEmpty }: EmptyStateProps) {
  if (!isEmpty) return null;
  
  return (
    <Alert>
      <AlertDescription>
        Nenhum resultado encontrado no histórico. Gere novos funis para visualizá-los aqui.
      </AlertDescription>
    </Alert>
  );
}
