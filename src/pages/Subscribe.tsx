
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Subscribe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  // Verificar se há erro na URL (redirecionamento após falha de pagamento)
  const searchParams = new URLSearchParams(location.search);
  const paymentError = searchParams.get("error") === "payment_failed";
  
  if (paymentError) {
    toast({
      title: "Falha no pagamento",
      description: "Não foi possível processar seu pagamento. Por favor, tente novamente.",
      variant: "destructive",
    });
  }

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Você precisa fazer login antes de assinar um plano.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(prev => ({ ...prev, [planType]: true }));

    try {
      const response = await supabase.functions.invoke("mercado-pago", {
        body: {
          planType,
          userId: user.id,
          successUrl: window.location.origin + "/dashboard",
          failureUrl: window.location.origin + "/subscribe?error=payment_failed",
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Redirecionar para a página de checkout do Mercado Pago
      window.location.href = response.data.init_point;
    } catch (error) {
      console.error("Erro ao processar assinatura:", error);
      toast({
        title: "Erro ao processar assinatura",
        description: "Não foi possível iniciar o processo de assinatura. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [planType]: false }));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">Escolha seu plano</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Para acessar o sistema, você precisa ter um plano ativo.
            Escolha o plano que melhor se adequa às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Plano Mensal */}
          <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Plano Mensal</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-800">R$29,90</span>
                <span className="text-gray-500">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Acesso mensal ao sistema</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Acesso completo a todas as funcionalidades</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Cancelamento a qualquer momento</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
                onClick={() => handleSubscribe("solo")}
                disabled={isLoading["solo"]}
              >
                {isLoading["solo"] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                  </>
                ) : (
                  <>
                    <span>Assinar agora</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Anual */}
          <Card className="border-2 border-mkranker-purple shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <div className="bg-mkranker-purple text-white text-xs font-semibold py-1 px-3 rounded-full w-fit mb-2">
                MAIS POPULAR
              </div>
              <CardTitle className="text-xl font-semibold">Plano Anual</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-800">R$299,90</span>
                <span className="text-gray-500">/ano</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Economize 16% em comparação ao plano mensal</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Acesso completo a todas as funcionalidades</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>Cancelamento a qualquer momento</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>2 meses grátis</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
                onClick={() => handleSubscribe("discovery")}
                disabled={isLoading["discovery"]}
              >
                {isLoading["discovery"] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                  </>
                ) : (
                  <>
                    <span>Assinar agora</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Já tem um plano ativo?{" "}
            <Link to="/login" className="text-mkranker-purple hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
