
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPendingApproval(false);

    try {
      console.log("Tentando login com email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro no login:", error);
        throw error;
      }

      console.log("Login bem-sucedido:", data);
      // AuthProvider vai lidar com a verificação de aprovação e redirecionamento
      
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      if (error.message?.includes("Email not confirmed")) {
        toast.error("Por favor, confirme seu email antes de fazer login");
      } else if (error.message?.includes("Invalid login credentials")) {
        toast.error("Email ou senha inválidos");
      } else {
        toast.error("Erro no login: " + (error.error_description || error.message || "Verifique suas credenciais e tente novamente"));
      }
      
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    pendingApproval,
    setPendingApproval,
    handleSignIn
  };
};
