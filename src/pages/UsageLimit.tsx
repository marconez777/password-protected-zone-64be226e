
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { AlertTriangle, InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";

const UsageLimit = () => {
  const { usage, limit } = useSubscription();
  
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
              Você utilizou todas as {limit} requisições disponíveis.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Uso atual:</span>
                <span className="font-medium">{usage} de {limit}</span>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <div className="flex items-start">
                  <InfoIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p>
                    Você atingiu seu limite de requisições. Por favor, aguarde até que seu limite seja reiniciado.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
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
