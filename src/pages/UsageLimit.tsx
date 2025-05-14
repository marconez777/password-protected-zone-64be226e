
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const UsageLimit = () => {
  const { usage, limit, active, endsAt } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="shadow-lg border-amber-400">
          <CardHeader className="bg-amber-50 border-b border-amber-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-amber-800 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
                Limite de Uso Atingido
              </CardTitle>
            </div>
            <CardDescription>
              Você utilizou todas as {limit} requisições disponíveis no seu plano.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Uso atual:</span>
                <span className="font-medium">{usage} de {limit}</span>
              </div>
              
              {active && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Assinatura válida até:</span>
                  <span className="font-medium">{formatDate(endsAt)}</span>
                </div>
              )}
              
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <p className="mb-2 font-medium">Você tem duas opções:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aguardar até o fim do período atual ({formatDate(endsAt)}) e seu limite será restaurado automaticamente.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Renovar sua assinatura agora para receber instantaneamente mais {limit} requisições.</span>
                  </li>
                </ul>
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple" 
              onClick={handleRenew}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : "Renovar Agora"}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">
                Voltar ao Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UsageLimit;
