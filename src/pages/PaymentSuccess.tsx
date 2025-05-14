
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

const PaymentSuccess = () => {
  const [isChecking, setIsChecking] = useState(true);
  const { checkSubscription, active } = useSubscription();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyPayment = async () => {
      // Esperar um pouco para dar tempo do webhook processar
      await new Promise(resolve => setTimeout(resolve, 3000));
      await checkSubscription();
      setIsChecking(false);
      
      // Redirecionar para dashboard automaticamente após 5 segundos
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    };
    
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center pb-2">
          {isChecking ? (
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-mkranker-purple animate-spin" />
            </div>
          ) : active ? (
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
            </div>
          )}
          
          <CardTitle className="text-2xl font-medium text-center pt-4">
            {isChecking 
              ? "Processando seu pagamento..." 
              : active 
                ? "Pagamento aprovado!" 
                : "Verificando pagamento..."}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          {isChecking ? (
            <p className="text-gray-600">
              Estamos verificando o status do seu pagamento. Isso pode levar alguns instantes.
            </p>
          ) : active ? (
            <>
              <p className="text-gray-600">
                Sua assinatura foi ativada com sucesso!
              </p>
              <p className="text-gray-600">
                Você agora tem acesso a todas as ferramentas do MKRanker e pode 
                utilizar até 80 requisições.
              </p>
            </>
          ) : (
            <p className="text-gray-600">
              Ainda estamos processando seu pagamento. Isso pode levar alguns minutos.
              Caso o problema persista, entre em contato com o suporte.
            </p>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            asChild 
            variant="default" 
            className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
            disabled={isChecking}
          >
            <Link to="/dashboard">
              Ir para o Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
