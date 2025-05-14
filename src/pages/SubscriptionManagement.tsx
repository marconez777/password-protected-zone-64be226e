
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionManagement = () => {
  const { user } = useAuth();
  const { active, endsAt, remainingUses, limit, checkSubscription, usage } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const usagePercentage = Math.floor((usage / limit) * 100);
  
  const handleRenew = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('mercado-pago/create-payment', {});

      if (error) {
        throw new Error(error.message || 'Erro ao criar pagamento');
      }

      if (data && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('Não foi possível obter o link de pagamento');
      }
    } catch (err: any) {
      console.error('Erro no checkout:', err);
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefreshStatus = async () => {
    setIsLoading(true);
    try {
      await checkSubscription();
      toast({
        title: "Status atualizado",
        description: "Informações da assinatura atualizadas com sucesso!",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da assinatura.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Gerenciar Assinatura
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Controle sua assinatura e limite de uso
          </p>
        </div>

        {active ? (
          <Card className="mb-8 border-green-500 shadow-md">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-green-800">Assinatura Ativa</CardTitle>
                  <CardDescription>Seu plano está ativo até {formatDate(endsAt)}</CardDescription>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Uso da Assinatura</h3>
                    <span className="text-sm">{usage} de {limit} requisições ({usagePercentage}%)</span>
                  </div>
                  <Progress 
                    value={usagePercentage} 
                    className={`h-2 ${usagePercentage > 80 ? 'bg-red-100' : 'bg-gray-100'}`} 
                  />
                  <div className="mt-1 text-sm text-gray-500 flex justify-between">
                    <span>{remainingUses} requisições restantes</span>
                    {remainingUses < 20 && (
                      <span className="text-amber-600 font-medium">Limite próximo do fim!</span>
                    )}
                  </div>
                </div>
                
                {remainingUses <= 20 && (
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800">Atenção: Limite próximo do fim</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Você tem apenas {remainingUses} requisições restantes. Considere renovar sua assinatura antecipadamente para evitar interrupções.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Plano:</span>
                    <span className="font-medium">Mensal - R$ 97,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Válido até:</span>
                    <span className="font-medium">{formatDate(endsAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-end">
              <Button 
                variant="outline" 
                onClick={handleRefreshStatus}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aguarde...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Atualizar Status
                  </>
                )}
              </Button>
              <Button onClick={handleRenew} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : "Renovar Assinatura"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mb-8 shadow-lg border-2 border-mkranker-purple">
            <CardHeader className="bg-mkranker-purple/10">
              <CardTitle className="text-2xl text-mkranker-purple">Plano Mensal</CardTitle>
              <CardDescription>Acesso completo por 30 dias</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold">R$ 97,00</span>
                <span className="text-gray-500 ml-2">/mês</span>
              </div>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Acesso a todas as ferramentas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>80 requisições totais</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Resultados detalhados</span>
                </li>
              </ul>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple" 
                size="lg"
                onClick={handleRenew}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Assinar Agora"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
