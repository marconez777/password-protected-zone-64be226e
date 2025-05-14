
import { ReactNode, useState, useEffect } from "react";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useSecurityCheck } from "@/hooks/useSecurityCheck";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResourceWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  resourceType?: string; // Type of resource for specific verification
}

export const ResourceWrapper = ({ 
  children, 
  title,
  description,
  resourceType = 'generic' 
}: ResourceWrapperProps) => {
  const { canUseResource, remainingUses, isLoading } = useUsageTracking(false);
  const { verifyResourceAccess, checkingAccess } = useSecurityCheck();
  const [hasChecked, setHasChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reset verification state when component mounts or when resourceType changes
    setIsVerified(false);
    setHasChecked(false);
  }, [resourceType]);

  const handleContinue = async () => {
    // Perform security verification
    const accessVerified = await verifyResourceAccess(resourceType);
    setIsVerified(accessVerified);
    setHasChecked(true);
  };
  
  if (isLoading || checkingAccess) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">Verificando acesso...</span>
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
        
        <div className="bg-gray-50 p-4 rounded-md mb-4 flex items-center justify-center">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-sm text-gray-600">
            Esta ação consumirá 1 de suas {remainingUses} requisições restantes.
          </p>
        </div>
        
        <Button 
          onClick={handleContinue}
          className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
        >
          Continuar com Segurança
        </Button>
      </div>
    );
  }
  
  if (!isVerified) {
    return (
      <div className="border rounded-lg p-6 bg-red-50 border-red-200 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">
          Verificação de acesso falhou
        </h3>
        <p className="text-red-700 mb-4">
          Não foi possível verificar seu acesso a este recurso. Por favor, tente novamente.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => setHasChecked(false)}
            className="bg-red-600 hover:bg-red-700"
          >
            Tentar novamente
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
  
  return <>{children}</>;
};
