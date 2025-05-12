
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const RegisterSuccess = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-medium text-center">Cadastro realizado com sucesso!</CardTitle>
          <CardDescription className="text-center">
            Sua conta foi criada e está pronta para uso.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Para acessar o sistema, você precisará ativar um plano.
          </p>
          <p className="text-gray-600">
            Verifique seu e-mail para confirmar seu cadastro e acesse sua conta.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          {user ? (
            <Button asChild variant="default" className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
              <Link to="/dashboard">
                Acessar Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild variant="default" className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
              <Link to="/login">
                Fazer login
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link to="/subscribe">
              Ver planos
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
