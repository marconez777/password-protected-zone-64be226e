
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const SubscriptionUsageCard = () => {
  const { active, endsAt, remainingUses, limit, usage } = useSubscription();
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };
  
  const getProgressColor = () => {
    const usagePercent = ((limit - remainingUses) / limit) * 100;
    if (usagePercent > 80) return "bg-red-500";
    if (usagePercent > 60) return "bg-amber-500";
    return "bg-green-500";
  };

  const getAlertContent = () => {
    if (remainingUses <= 5) {
      return {
        title: "Alerta crítico de uso",
        message: `Você tem apenas ${remainingUses} requisições restantes! Renove sua assinatura agora para evitar interrupção.`,
        icon: <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />,
        color: "bg-red-50 border-red-200 text-red-800"
      };
    } else if (remainingUses <= 20) {
      return {
        title: "Aviso de uso",
        message: `Você está com poucas requisições disponíveis (${remainingUses}). Considere renovar em breve.`,
        icon: <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />,
        color: "bg-amber-50 border-amber-200 text-amber-800"
      };
    }
    return null;
  };
  
  const alertContent = getAlertContent();
  
  if (!active) return null;
  
  return (
    <Card className="border-mkranker-purple/30">
      <CardHeader className="pb-3">
        <CardTitle>Status da Assinatura</CardTitle>
        <CardDescription>
          Sua assinatura está ativa até {formatDate(endsAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Requisições Utilizadas:</span>
            <span className="font-medium">{limit - remainingUses} de {limit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${getProgressColor()}`}
              style={{ width: `${((limit - remainingUses) / limit) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Requisições Restantes:</span>
            <span className="font-medium text-mkranker-purple">{remainingUses}</span>
          </div>
          
          {alertContent && (
            <div className={`mt-3 p-3 rounded-md border ${alertContent.color}`}>
              <div className="flex items-start">
                {alertContent.icon}
                <div>
                  <h4 className="font-medium">{alertContent.title}</h4>
                  <p className="text-sm">{alertContent.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {remainingUses <= 20 && (
        <CardFooter className="pt-0">
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className={`w-full ${remainingUses <= 5 ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-amber-600 border-amber-200 hover:bg-amber-50'}`}
          >
            <Link to="/subscription-management">
              Renovar Assinatura
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
