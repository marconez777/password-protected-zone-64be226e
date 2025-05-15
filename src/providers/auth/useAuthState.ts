
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Function to check user status
  const checkUserStatus = async (userId: string) => {
    try {
      console.log("Verificando status para usuário:", userId);
      
      // Check for admin email as a special case
      if (session?.user?.email === 'contato@mkart.com.br') {
        console.log("Usuário admin detectado, aprovando automaticamente");
        return { approved: true, is_admin: true };
      }

      // Check user status in the database
      const { data, error } = await supabase
        .from('user_status')
        .select('approved, is_admin')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao verificar status do usuário:", error);
        return { approved: false, is_admin: false };
      }

      console.log("Status do usuário recebido:", data);
      return { 
        approved: data?.approved ?? false,
        is_admin: data?.is_admin ?? false
      };
    } catch (err) {
      console.error("Erro ao verificar status do usuário:", err);
      
      // Special case for admin email
      if (session?.user?.email === 'contato@mkart.com.br') {
        return { approved: true, is_admin: true };
      }
      
      return { approved: false, is_admin: false };
    }
  };

  // Sign out function
  const signOut = async () => {
    console.log("Iniciando logout");
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    console.log("Logout concluído");
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
            
            // Special handling for admin email
            if (currentSession.user.email === 'contato@mkart.com.br') {
              console.log("Email de administrador detectado");
              setIsApproved(true);
              setIsAdmin(true);
              setLoading(false);
              return;
            }
            
            // Check status for other users
            const status = await checkUserStatus(currentSession.user.id);
            setIsApproved(status.approved);
            setIsAdmin(status.is_admin);
            
            // Log out unapproved users
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

    // Check for existing session
    const checkExistingSession = async () => {
      try {
        console.log("Verificando sessão existente");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          console.log("Sessão existente encontrada:", currentSession.user.email);
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Special handling for admin email
          if (currentSession.user.email === 'contato@mkart.com.br') {
            console.log("Email de administrador detectado na sessão existente");
            setIsApproved(true);
            setIsAdmin(true);
            setLoading(false);
            return;
          }
          
          // Check status for other users
          const status = await checkUserStatus(currentSession.user.id);
          console.log("Status do usuário na sessão existente:", status);
          setIsApproved(status.approved);
          setIsAdmin(status.is_admin);
          
          // Log out unapproved users
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

  return {
    user,
    session,
    isApproved,
    isAdmin,
    loading,
    signOut
  };
};
