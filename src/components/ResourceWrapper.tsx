
import { ReactNode, useState } from "react";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResourceWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const ResourceWrapper = ({ 
  children, 
  title,
  description 
}: ResourceWrapperProps) => {
  const { canUseResource, remainingUses, isLoading } = useUsageTracking(false);
  const [hasChecked, setHasChecked] = useState(false);
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">Verificando disponibilidade...</span>
      </div>
    );
  }
  
  if (!canUseResource && hasChecked) {
    return (
      <div className="border rounded-lg p-6 bg-amber-50 border-amber-200 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-amber-800 mb-2">
          {remainingUses <= 0 ? "Limite de uso atingido" : "Assinatura necessária"}
        </h3>
        <p className="text-amber-700 mb-4">
          {remainingUses <= 0 
            ? "Você atingiu o limite de 80 requisições do seu plano." 
            : "Você precisa ter uma assinatura ativa para usar este recurso."}
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => navigate(remainingUses <= 0 ? '/usage-limit' : '/subscribe')}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {remainingUses <= 0 ? "Ver detalhes" : "Assinar agora"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  if (!hasChecked) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        {description && <p className="text-gray-500 mb-4">{description}</p>}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-600">
            Esta ação consumirá 1 de suas {remainingUses} requisições restantes.
          </p>
        </div>
        <Button 
          onClick={() => setHasChecked(true)}
          className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
        >
          Continuar
        </Button>
      </div>
    );
  }
  
  return <>{children}</>;
};
