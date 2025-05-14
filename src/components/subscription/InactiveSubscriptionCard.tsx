
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface InactiveSubscriptionCardProps {
  error: string | null;
  isLoading: boolean;
  onSubscribe: () => Promise<void>;
}

export const InactiveSubscriptionCard = ({
  error,
  isLoading,
  onSubscribe
}: InactiveSubscriptionCardProps) => {
  return (
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
          onClick={onSubscribe}
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
  );
};
