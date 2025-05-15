
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface UserStatus {
  user_id: string;
  approved: boolean;
  email?: string;
  name?: string;
  created_at?: string;
}

export function useUserApproval() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserStatus[]>([]);
  
  // Busca todos os usuários com seu status de aprovação
  const fetchUsersPendingApproval = async () => {
    setLoading(true);
    try {
      // Primeiro, obter os user_status não aprovados
      const { data: userStatusData, error: statusError } = await supabase
        .from('user_status')
        .select('user_id, approved')
        .eq('approved', false);

      if (statusError) {
        throw statusError;
      }

      if (!userStatusData || userStatusData.length === 0) {
        setUsers([]);
        return [];
      }

      // Depois, para cada user_id, buscar os detalhes do usuário na tabela auth.users
      // usando a admin API (isso será feito através de uma Edge Function)
      const userDetails: UserStatus[] = [];
      
      for (const status of userStatusData) {
        try {
          // Usar a função para buscar detalhes do usuário
          const { data: userData, error: userError } = await supabase.functions.invoke('get-user-details', {
            body: { userId: status.user_id }
          });
          
          if (userError) {
            console.error('Erro ao buscar detalhes do usuário:', userError);
            continue;
          }
          
          if (userData) {
            userDetails.push({
              user_id: status.user_id,
              approved: status.approved,
              email: userData.email,
              name: userData.user_metadata?.nome || '',
              created_at: userData.created_at
            });
          }
        } catch (error) {
          console.error(`Erro ao processar usuário ${status.user_id}:`, error);
        }
      }

      setUsers(userDetails);
      return userDetails;
    } catch (error) {
      console.error('Erro ao buscar usuários pendentes:', error);
      toast.error('Falha ao carregar usuários pendentes');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Aprovar um usuário
  const approveUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_status')
        .update({ approved: true })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      // Atualiza a lista local de usuários
      setUsers(users.filter(user => user.user_id !== userId));
      toast.success('Usuário aprovado com sucesso!');
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
      toast.error('Falha ao aprovar usuário');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Rejeitar um usuário (deleta o usuário completamente)
  const rejectUser = async (userId: string) => {
    setLoading(true);
    try {
      // Esta operação requer service_role key, então usaremos uma Edge Function
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId }
      });

      if (error) {
        throw error;
      }

      // Atualiza a lista local de usuários
      setUsers(users.filter(user => user.user_id !== userId));
      toast.success('Usuário rejeitado e removido');
    } catch (error) {
      console.error('Erro ao rejeitar usuário:', error);
      toast.error('Falha ao rejeitar usuário');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    users,
    fetchUsersPendingApproval,
    approveUser,
    rejectUser
  };
}
