
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { useToast } from "@/hooks/use-toast";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      toast({
        title: "Senha atualizada com sucesso",
        description: "Sua senha foi atualizada. Agora você pode fazer login.",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Erro ao atualizar senha:", error);
      setError(error.message || "Ocorreu um erro ao atualizar sua senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Nova senha</h1>
      <form onSubmit={handleUpdatePassword}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        
        <div>
          <label htmlFor="password">Nova senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword">Confirmar nova senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Atualizando..." : "Atualizar senha"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
