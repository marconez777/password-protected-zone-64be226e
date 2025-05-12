
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Sistema de Autenticação</h1>
      <p>Bem-vindo ao sistema de autenticação com verificação de assinatura ativa.</p>
      
      {user ? (
        <div>
          <p>Você já está logado como {user.email}</p>
          <Link to="/dashboard">
            <button>Ir para o Dashboard</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Cadastre-se</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
