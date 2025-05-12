
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if subscription is active
      try {
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from("subscriptions")
          .select("is_active")
          .eq("user_id", data.user.id)
          .single();

        if (subscriptionError) {
          console.error("Error checking subscription:", subscriptionError);
          navigate("/subscribe");
          return;
        }

        if (!subscriptionData || !subscriptionData.is_active) {
          navigate("/subscribe");
          toast({
            title: "Assinatura necessária",
            description: "Você precisa ter um plano ativo para acessar o sistema.",
          });
          return;
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
        navigate("/subscribe");
        return;
      }

      toast({
        title: "Login realizado com sucesso!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setError(error.message || "Ocorreu um erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        
        <div>
          <Link to="/reset-password">Esqueceu sua senha?</Link>
        </div>
        <div>
          <span>Não tem uma conta? </span>
          <Link to="/register">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
