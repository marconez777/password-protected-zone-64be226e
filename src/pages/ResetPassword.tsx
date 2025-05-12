
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { Mail, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = useSupabaseClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error: any) {
      console.error("Erro ao enviar email de redefinição:", error);
      setError(error.message || "Ocorreu um erro ao enviar o email de redefinição. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="rounded-md bg-mkranker-purple w-10 h-10 flex items-center justify-center text-white font-bold">
              M
            </div>
          </div>
          <CardTitle className="text-2xl font-medium text-center">Redefinir senha</CardTitle>
          <CardDescription className="text-center">
            {success ? 
              "Verifique seu email para redefinir sua senha" : 
              "Informe seu email para redefinir sua senha"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center p-4">
              <p className="text-gray-600 mb-4">
                Se houver uma conta com este e-mail, você receberá um link para redefinir sua senha.
                Por favor, verifique sua caixa de entrada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="flex items-center text-sm text-gray-500 hover:text-mkranker-purple">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
