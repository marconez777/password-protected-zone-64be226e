
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle } from "lucide-react";

export const SupabaseWarning = () => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Configuração incompleta</AlertTitle>
      <AlertDescription>
        O Supabase não está configurado corretamente. Por favor, conecte seu projeto ao Supabase
        usando a integração nativa do Lovable.
      </AlertDescription>
    </Alert>
  );
};
