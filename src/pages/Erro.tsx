
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Erro = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Ocorreu um erro
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Não foi possível completar sua solicitação
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-700">
            Houve um problema ao processar sua requisição. Por favor, tente novamente ou entre em contato com nosso suporte.
          </p>
          
          <div className="mt-8 space-y-3">
            <Button 
              asChild 
              className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
            >
              <Link to="/cadastro">Tentar novamente</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              className="w-full"
            >
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Erro;
