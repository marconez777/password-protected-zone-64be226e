
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Aguarde = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Obrigado pela sua assinatura!
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Estamos processando seu pagamento
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-700">
            Assim que o pagamento for confirmado, você receberá um e-mail com o
            link para criar sua senha e acessar a MKRanker.
          </p>
          
          <div className="mt-8">
            <Button 
              asChild 
              className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
            >
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Aguarde;
