
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/auth";
import { useLoginForm } from "@/hooks/useLoginForm";

const Login = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loading, 
    pendingApproval, 
    handleSignIn 
  } = useLoginForm();
  
  const { user, isApproved, isAdmin } = useAuth();

  useEffect(() => {
    // Log para debug
    console.log("Login - user:", !!user, "isApproved:", isApproved, "isAdmin:", isAdmin);
  }, [user, isApproved, isAdmin]);

  // If already authenticated, redirect to appropriate page
  if (user) {
    console.log("Usuário já autenticado, redirecionando...");
    
    // Redirecionar admins para a página de admin
    if (isAdmin) {
      console.log("Redirecionando admin para /admin");
      return <Navigate to="/admin" />;
    }
    
    console.log("Redirecionando usuário para /dashboard");
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-mkranker-purple">MKRanker</h1>
          <p className="mt-2 text-gray-600">
            Faça login para acessar sua conta
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com seu e-mail e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          {pendingApproval ? (
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-medium text-yellow-800">Conta em análise</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Sua conta está pendente de aprovação pelo administrador. 
                  Você receberá uma notificação por email quando sua conta for aprovada.
                </p>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
