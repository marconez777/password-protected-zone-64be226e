
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado, redirecionar para login
    if (!session) {
      navigate("/login");
    }

    // Verificar status da assinatura
    const checkSubscription = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("is_active")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error checking subscription:", error);
          navigate("/subscribe");
          return;
        }

        if (!data || !data.is_active) {
          navigate("/subscribe");
        }
      } catch (err) {
        console.error("Error:", err);
        navigate("/subscribe");
      }
    };

    checkSubscription();
  }, [session, user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user) {
    return null; // Não renderizar nada enquanto verifica autenticação
  }

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <p>Bem-vindo, {user?.user_metadata?.full_name || "usuário"}!</p>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Seu plano</h2>
          <p>Detalhes da sua assinatura atual</p>
          <div>
            <div>Status: <span>Ativo</span></div>
            <div>Tipo de plano: <span>Mensal</span></div>
            <div>Próxima cobrança: <span>10/06/2025</span></div>
          </div>
          <button>Gerenciar assinatura</button>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Seu perfil</h2>
          <p>Informações da sua conta</p>
          <div>
            <div>Nome: <span>{user?.user_metadata?.full_name || "N/A"}</span></div>
            <div>E-mail: <span>{user?.email}</span></div>
            <div>Membro desde: <span>{new Date(user?.created_at).toLocaleDateString("pt-BR")}</span></div>
          </div>
          <button>Editar perfil</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
