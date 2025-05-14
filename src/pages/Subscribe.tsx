
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Subscribe = () => {
  const { user } = useAuth();
  const { active, endsAt, remainingUses } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Assinatura MKRanker
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Acesse todas as ferramentas para otimização de keywords e conteúdo
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Plano:</span>
                  <span className="font-medium">Mensal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Requisições restantes:</span>
                  <span className="font-medium">{remainingUses} de 80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Expira em:</span>
                  <span className="font-medium">{formatDate(endsAt)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-end">
              <Button asChild variant="outline">
                <Link to="/dashboard">Ir para o Dashboard</Link>
              </Button>
              <Button onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Renovar Assinatura"
                )}
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
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Análises de palavras-chave</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Otimização para SEO</span>
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
                onClick={handleSubscribe}
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
              <p className="text-xs text-gray-500 mt-3 text-center">
                Pagamento seguro via Mercado Pago. Cancele a qualquer momento.
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
