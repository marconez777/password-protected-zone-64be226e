
import { Link } from "react-router-dom";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";

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
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-md bg-mkranker-purple w-16 h-16 flex items-center justify-center text-white font-bold text-3xl">
            M
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">MKRanker</h1>
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
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Card className="w-full max-w-xs">
              <CardHeader>
                <CardTitle className="text-xl">Já tem uma conta?</CardTitle>
                <CardDescription>Acesse sua conta para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Fazer Login
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="w-full max-w-xs">
              <CardHeader>
                <CardTitle className="text-xl">Novo por aqui?</CardTitle>
                <CardDescription>Crie sua conta e comece agora</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-mkranker-purple text-mkranker-purple hover:bg-mkranker-purple/10">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Cadastre-se
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
