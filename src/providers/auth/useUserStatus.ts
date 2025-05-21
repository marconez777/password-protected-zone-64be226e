
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface StatusResult {
  approved: boolean;
  is_admin: boolean;
  error?: boolean;
  noRecord?: boolean;
}

export const useUserStatus = (user: User | null, setLoading: (value: boolean) => void) => {
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Function to check user status with improved debugging
  const checkUserStatus = async (userId: string): Promise<StatusResult> => {
    try {
      console.log("[UserStatus] Verificando status para usuário:", userId);
      
      // Special case for admin email
      if (user?.email === 'contato@mkart.com.br') {
        console.log("[UserStatus] Email de admin detectado, aprovando automaticamente");
        return { approved: true, is_admin: true };
      }

      // Check user status with detailed debugging
      const { data, error, count } = await supabase
        .from('user_status')
        .select('approved, is_admin', { count: 'exact' })
        .eq('user_id', userId)
        .maybeSingle();

      console.log('[UserStatus] checkUserStatus - userId:', userId);
      console.log('[UserStatus] checkUserStatus - data:', data);
      console.log('[UserStatus] checkUserStatus - error:', error);
      console.log('[UserStatus] checkUserStatus - count:', count);

      if (error) {
        console.error("[UserStatus] Erro DIRETO ao verificar status do usuário:", error);
        return { approved: false, is_admin: false, error: true };
      }

      if (!data) {
        console.warn("[UserStatus] Nenhum registro encontrado em user_status para o userId:", userId);
        
        // Create a status record if one doesn't exist - this helps recover from data inconsistencies
        try {
          console.log("[UserStatus] Tentando criar registro em user_status para:", userId);
          const { error: insertError } = await supabase
            .from('user_status')
            .insert([{ 
              user_id: userId, 
              approved: false, 
              is_admin: false 
            }]);
          
          if (insertError) {
            console.error("[UserStatus] Erro ao criar registro de status:", insertError);
          } else {
            console.log("[UserStatus] Registro de status criado com sucesso");
          }
        } catch (insertErr) {
          console.error("[UserStatus] Exceção ao criar registro de status:", insertErr);
        }
        
        return { approved: false, is_admin: false, noRecord: true };
      }

      const finalStatus = {
        approved: data.approved ?? false,
        is_admin: data.is_admin ?? false
      };
      
      console.log('[UserStatus] checkUserStatus - finalStatus:', finalStatus);
      return finalStatus;
    } catch (err: any) {
      console.error("[UserStatus] Exceção ao verificar status do usuário:", err);
      
      // Special case for admin email
      if (user?.email === 'contato@mkart.com.br') {
        return { approved: true, is_admin: true };
      }
      
      return { approved: false, is_admin: false, error: true };
    }
  };

  // Effect to check user status when user changes
  useEffect(() => {
    // Only check status if we have a user
    if (user) {
      const updateUserStatus = async () => {
        try {
          // Special handling for admin email
          if (user.email === 'contato@mkart.com.br') {
            console.log("[UserStatus] Email de administrador detectado");
            setIsApproved(true);
            setIsAdmin(true);
            setLoading(false);
            return;
          }
          
          // Check status for other users
          const status = await checkUserStatus(user.id);
          console.log("[UserStatus] Status do usuário após verificação:", status);
          
          setIsApproved(status.approved);
          setIsAdmin(status.is_admin);
          
          // Log out unapproved users
          if (!status.approved && !status.error && !status.noRecord) {
            console.log("[UserStatus] Usuário não aprovado, fazendo logout");
            await supabase.auth.signOut();
            toast.error("Sua conta ainda não foi aprovada pelo administrador");
          } else if (status.error || status.noRecord) {
            console.warn("[UserStatus] Problema ao verificar status, não deslogando automaticamente");
          }
          
        } catch (err) {
          console.error("[UserStatus] Erro ao atualizar status do usuário:", err);
        } finally {
          setLoading(false);
        }
      };
      
      updateUserStatus();
    } else {
      // Reset status when no user
      setIsApproved(false);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user, setLoading]);

  return {
    isApproved,
    isAdmin,
    checkUserStatus
  };
};
