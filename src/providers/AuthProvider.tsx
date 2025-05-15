
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isApproved: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isApproved: false,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Função para verificar o status do usuário
  const checkUserStatus = async (userId: string) => {
    try {
      // Apenas verificar o status do usuário na tabela user_status
      const { data, error } = await supabase
        .from('user_status')
        .select('approved')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error("Erro ao verificar status do usuário:", error);
        
        // Se for o usuário admin, consideramos aprovado por padrão
        if (session?.user?.email === 'contato@mkart.com.br') {
          return { approved: true };
        }
        
        return { approved: false };
      }

      return { 
        approved: data?.approved ?? false
      };
    } catch (err) {
      console.error("Erro ao verificar status do usuário:", err);
      
      // Se for o usuário admin, consideramos aprovado por padrão
      if (session?.user?.email === 'contato@mkart.com.br') {
        return { approved: true };
      }
      
      return { approved: false };
    }
  };

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Tratamento especial para o email de administrador
          if (currentSession.user.email === 'contato@mkart.com.br') {
            setIsApproved(true);
            setLoading(false);
            return;
          }
          
          // Para outros usuários, verificar normalmente
          const status = await checkUserStatus(currentSession.user.id);
          setIsApproved(status.approved);
          
          // Se não estiver aprovado, fazer logout
          if (!status.approved) {
            await supabase.auth.signOut();
            toast.error("Sua conta ainda não foi aprovada pelo administrador");
          }
        } else {
          setIsApproved(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        // Tratamento especial para o email de administrador
        if (currentSession.user.email === 'contato@mkart.com.br') {
          setIsApproved(true);
          setLoading(false);
          return;
        }
        
        // Para outros usuários, verificar normalmente
        const status = await checkUserStatus(currentSession.user.id);
        setIsApproved(status.approved);
        
        // Se não estiver aprovado, fazer logout
        if (!status.approved) {
          await supabase.auth.signOut();
          toast.error("Sua conta ainda não foi aprovada pelo administrador");
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    isApproved,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user || !isApproved) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
