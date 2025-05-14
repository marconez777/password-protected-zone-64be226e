
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";

export const SubscriptionUsageCard = () => {
  const { active, endsAt, remainingUses, limit } = useSubscription();
  
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
        </div>
      </CardContent>
    </Card>
  );
};
