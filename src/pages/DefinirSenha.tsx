
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const DefinirSenha = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Fix: Change the type to NodeJS.Timeout | null to match setTimeout's return type
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract access token from URL
    const hash = window.location.hash;
    const query = new URLSearchParams(window.location.search);
    
    // Check for token in hash (fragment) first - Supabase often puts it there
    if (hash && hash.includes("access_token=")) {
      const params = new URLSearchParams(hash.substring(1));
      setAccessToken(params.get("access_token"));
    } 
    // Then check query parameters
    else if (query.get("access_token")) {
      setAccessToken(query.get("access_token"));
    }
  }, []);

  useEffect(() => {
    // Cleanup redirect timer if component unmounts
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [redirectTimer]);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem");
      return;
    }
    
    // Validate password length
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Use the access token to update the password
      if (!accessToken) {
        throw new Error("Token de acesso ausente");
      }

      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (error) {
        throw error;
      }

      toast.success("Senha definida com sucesso! Redirecionando para o login...");
      
      // Redirect to login after 3 seconds
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      
      setRedirectTimer(timer);
      
    } catch (error: any) {
      console.error("Erro ao definir senha:", error);
      toast.error(`Não foi possível definir a senha: ${error.message || "Erro desconhecido"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Link inválido
            </CardTitle>
            <CardDescription className="text-center">
              O link para definir sua senha é inválido ou expirou.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
              onClick={() => navigate("/login")}
            >
              Voltar para o login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-mkranker-purple">MKRanker</h1>
          <p className="mt-2 text-gray-600">
            Defina sua nova senha para acessar sua conta
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Definir Nova Senha</CardTitle>
            <CardDescription>
              Digite e confirme sua nova senha abaixo
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSetPassword}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Definir nova senha"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DefinirSenha;
