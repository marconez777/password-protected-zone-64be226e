
import { Link } from "react-router-dom";
import { LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { Logo } from "@/components/ui/logo";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center mb-6">
          <Logo className="mb-4" showText={true} variant="light" />
        </div>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Sistema de análise e otimização de palavras-chave.
        </p>
        
        {user ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Bem-vindo de volta</CardTitle>
              <CardDescription>Você está logado como {user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
                <Link to="/dashboard">
                  Acessar o Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Acesso restrito</CardTitle>
              <CardDescription>Digite suas credenciais para acessar o sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Fazer Login
                </Link>
              </Button>
              <div className="text-center">
                <Link to="/cadastro" className="text-mkranker-purple hover:underline">
                  Ainda não tem uma conta? Cadastre-se
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
