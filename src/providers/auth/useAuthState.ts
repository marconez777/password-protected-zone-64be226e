
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

  // Function to check user status with improved debugging
  const checkUserStatus = async (userId: string) => {
    try {
      console.log("[AuthProvider] Verificando status para usuário:", userId);
      
      // Special case for admin email
      if (session?.user?.email === 'contato@mkart.com.br') {
        console.log("[AuthProvider] Email de admin detectado, aprovando automaticamente");
        return { approved: true, is_admin: true };
      }

      // Check user status with detailed debugging
      const { data, error, count } = await supabase
        .from('user_status')
        .select('approved, is_admin', { count: 'exact' })
        .eq('user_id', userId)
        .maybeSingle();

      console.log('[AuthProvider] checkUserStatus - userId:', userId);
      console.log('[AuthProvider] checkUserStatus - data:', data);
      console.log('[AuthProvider] checkUserStatus - error:', error);
      console.log('[AuthProvider] checkUserStatus - count:', count);

      if (error) {
        console.error("[AuthProvider] Erro DIRETO ao verificar status do usuário:", error);
        return { approved: false, is_admin: false };
      }

      if (!data) {
        console.warn("[AuthProvider] Nenhum registro encontrado em user_status para o userId:", userId);
        
        // Create a status record if one doesn't exist - this helps recover from data inconsistencies
        try {
          console.log("[AuthProvider] Tentando criar registro em user_status para:", userId);
          const { error: insertError } = await supabase
            .from('user_status')
            .insert([{ 
              user_id: userId, 
              approved: false, 
              is_admin: false 
            }]);
          
          if (insertError) {
            console.error("[AuthProvider] Erro ao criar registro de status:", insertError);
          } else {
            console.log("[AuthProvider] Registro de status criado com sucesso");
          }
        } catch (insertErr) {
          console.error("[AuthProvider] Exceção ao criar registro de status:", insertErr);
        }
      }

      const finalStatus = {
        approved: data?.approved ?? false,
        is_admin: data?.is_admin ?? false
      };
      
      console.log('[AuthProvider] checkUserStatus - finalStatus:', finalStatus);
      return finalStatus;
    } catch (err) {
      console.error("[AuthProvider] Exceção ao verificar status do usuário:", err);
      
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
            console.log("Status do usuário após verificação:", status);
            
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
          
          // Always ensure loading is set to false
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
        // Always ensure loading is set to false, even if there's an error
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
