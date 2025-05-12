
import { format, isPast, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Check, 
  Clock, 
  CreditCard, 
  Calendar,
  X,
  Bell
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Subscription {
  id: string;
  user_id: string;
  is_active: boolean;
  plan_type: 'solo' | 'discovery' | 'escala';
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

interface SubscriptionCardProps {
  subscription: Subscription | null;
  userName: string;
}

export const SubscriptionCard = ({ subscription, userName }: SubscriptionCardProps) => {
  const navigate = useNavigate();

  // Determinar o status da assinatura
  const getSubscriptionStatus = () => {
    if (!subscription) return "pendente";
    
    if (!subscription.is_active) return "pendente";
    
    if (subscription.current_period_end) {
      const endDate = new Date(subscription.current_period_end);
      if (isPast(endDate)) return "expirado";
      return "ativo";
    }
    
    return "ativo";
  };

  // Verificar se o plano está prestes a expirar
  const isExpiringSoon = () => {
    if (!subscription || !subscription.current_period_end) return false;
    
    const endDate = new Date(subscription.current_period_end);
    const daysLeft = differenceInDays(endDate, new Date());
    return daysLeft <= 5 && daysLeft >= 0;
  };

  // Formatar data de vencimento
  const formatExpirationDate = () => {
    if (!subscription || !subscription.current_period_end) return "N/A";
    return format(new Date(subscription.current_period_end), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const subscriptionStatus = getSubscriptionStatus();
  const expirationDate = formatExpirationDate();
  const expiringSoon = isExpiringSoon();

  return (
    <>
      {/* Aviso de expiração */}
      {expiringSoon && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6 flex items-center">
          <Bell className="h-5 w-5 text-amber-500 mr-2" />
          <div>
            <h3 className="font-medium text-amber-700">Sua assinatura está prestes a expirar</h3>
            <p className="text-sm text-amber-600">Renove seu plano até {expirationDate} para continuar usando todos os recursos.</p>
          </div>
        </div>
      )}
      
      {/* Informações da Assinatura */}
      <Card className="border border-gray-200 shadow-sm mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">Informações da Assinatura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Plano Atual</span>
              <div className="flex items-center">
                <span className="text-lg font-medium capitalize">
                  {subscription?.plan_type === 'solo' ? 'Solo' : 
                   subscription?.plan_type === 'discovery' ? 'Discovery' : 
                   subscription?.plan_type === 'escala' ? 'Escala' : 'N/A'}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-auto p-1 ml-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-48 text-xs">
                      {subscription?.plan_type === 'solo' ? 'Plano mensal com recursos básicos' : 
                       subscription?.plan_type === 'discovery' ? 'Plano anual com recursos avançados' : 
                       subscription?.plan_type === 'escala' ? 'Plano com recursos ilimitados' : 'N/A'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Status</span>
              <div className="flex items-center">
                {subscriptionStatus === 'ativo' && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-0.5 text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Ativo
                  </Badge>
                )}
                {subscriptionStatus === 'pendente' && (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-2 py-0.5 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Pendente
                  </Badge>
                )}
                {subscriptionStatus === 'expirado' && (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200 px-2 py-0.5 text-xs">
                    <X className="h-3 w-3 mr-1" />
                    Expirado
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Vencimento</span>
              <div className="flex items-center">
                <span className="text-lg font-medium">{expirationDate}</span>
                <Calendar className="h-4 w-4 text-gray-400 ml-2" />
              </div>
            </div>
          </div>
          
          {(subscriptionStatus === 'pendente' || subscriptionStatus === 'expirado') && (
            <div className="mt-6">
              <Button 
                className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
                onClick={() => navigate("/subscribe")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {subscriptionStatus === 'expirado' ? 'Renovar Assinatura' : 'Ativar Assinatura'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
