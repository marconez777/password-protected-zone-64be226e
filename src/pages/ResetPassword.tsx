
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";

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
    <div>
      <h1>Redefinir senha</h1>
      
      {success ? (
        <div>
          <p>
            Se houver uma conta com este e-mail, você receberá um link para redefinir sua senha.
            Por favor, verifique sua caixa de entrada.
          </p>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
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
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar link de redefinição"}
          </button>
        </form>
      )}
      
      <div>
        <Link to="/login">Voltar para o login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
