
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isApproved: boolean;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isApproved: false,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Função para verificar o status do usuário
  const checkUserStatus = async (userId: string) => {
    try {
      console.log("Verificando status para usuário:", userId);
      
      // Verificar o status do usuário na tabela user_status
      // Usamos maybeSingle para evitar erros se o registro não existir
      const { data, error } = await supabase
        .from('user_status')
        .select('approved, is_admin')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao verificar status do usuário:", error);
        
        // Se for o usuário admin, consideramos aprovado por padrão
        if (session?.user?.email === 'contato@mkart.com.br') {
          console.log("Usuário admin detectado, aprovando automaticamente");
          return { approved: true, is_admin: true };
        }
        
        return { approved: false, is_admin: false };
      }

      console.log("Status do usuário recebido:", data);
      return { 
        approved: data?.approved ?? false,
        is_admin: data?.is_admin ?? false
      };
    } catch (err) {
      console.error("Erro ao verificar status do usuário:", err);
      
      // Se for o usuário admin, consideramos aprovado por padrão
      if (session?.user?.email === 'contato@mkart.com.br') {
        return { approved: true, is_admin: true };
      }
      
      return { approved: false, is_admin: false };
    }
  };

  useEffect(() => {
    console.log("AuthProvider inicializado");
    let authListenerUnsubscribe: (() => void) | null = null;
    
    // First set up the auth state listener
    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, currentSession) => {
          console.log("Evento de mudança de autenticação:", _event);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            console.log("Usuário autenticado:", currentSession.user.email);
            
            // Tratamento especial para o email de administrador
            if (currentSession.user.email === 'contato@mkart.com.br') {
              console.log("Email de administrador detectado");
              setIsApproved(true);
              setIsAdmin(true);
              setLoading(false);
              return;
            }
            
            // Para outros usuários, verificar normalmente
            const status = await checkUserStatus(currentSession.user.id);
            setIsApproved(status.approved);
            setIsAdmin(status.is_admin);
            
            // Se não estiver aprovado, fazer logout
            if (!status.approved) {
              console.log("Usuário não aprovado, fazendo logout");
              await supabase.auth.signOut();
              toast.error("Sua conta ainda não foi aprovada pelo administrador");
            }
          } else {
            console.log("Nenhum usuário autenticado");
            setIsApproved(false);
            setIsAdmin(false);
          }
          
          setLoading(false);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };

    // Then check for existing session
    const checkExistingSession = async () => {
      try {
        console.log("Verificando sessão existente");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          console.log("Sessão existente encontrada:", currentSession.user.email);
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Tratamento especial para o email de administrador
          if (currentSession.user.email === 'contato@mkart.com.br') {
            console.log("Email de administrador detectado na sessão existente");
            setIsApproved(true);
            setIsAdmin(true);
            setLoading(false);
            return;
          }
          
          // Para outros usuários, verificar normalmente
          const status = await checkUserStatus(currentSession.user.id);
          console.log("Status do usuário na sessão existente:", status);
          setIsApproved(status.approved);
          setIsAdmin(status.is_admin);
          
          // Se não estiver aprovado, fazer logout
          if (!status.approved) {
            console.log("Usuário não aprovado na sessão existente, fazendo logout");
            await supabase.auth.signOut();
            toast.error("Sua conta ainda não foi aprovada pelo administrador");
          }
        } else {
          console.log("Nenhuma sessão existente encontrada");
          setSession(null);
          setUser(null);
          setIsApproved(false);
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Erro ao verificar sessão existente:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Execute initialization
    authListenerUnsubscribe = setupAuthListener();
    checkExistingSession();

    return () => {
      console.log("Limpando AuthProvider");
      if (authListenerUnsubscribe) {
        authListenerUnsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    console.log("Iniciando logout");
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    console.log("Logout concluído");
  };

  const value = {
    session,
    user,
    isApproved,
    isAdmin,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isApproved, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - loading:", loading, "user:", !!user, "isApproved:", isApproved);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user || !isApproved) {
    console.log("Redirecionando para login - user:", !!user, "isApproved:", isApproved);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Renderizando rota protegida");
  return <>{children}</>;
};
