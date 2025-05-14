
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-medium text-center mt-4">Cadastro realizado!</CardTitle>
          <CardDescription className="text-center">
            Sua conta foi criada com sucesso. Agora você pode acessar todas as funcionalidades do MKRanker.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Para começar a utilizar a plataforma, você precisa assinar um de nossos planos.
          </p>
          <p className="text-gray-600">
            Com sua assinatura, você terá acesso a ferramentas poderosas para otimização de SEO e pesquisa de palavras-chave.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
            <Link to="/subscribe">
              Assinar Agora
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/login">
              Fazer Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
