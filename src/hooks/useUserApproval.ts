
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface UserStatus {
  user_id: string;
  approved: boolean;
  email?: string;
  created_at?: string;
}

export function useUserApproval() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserStatus[]>([]);
  
  // Busca todos os usuários com seu status de aprovação
  const fetchUsersPendingApproval = async () => {
    setLoading(true);
    try {
      // Consulta especial que junta informações de auth.users com user_status
      const { data: userStatusData, error } = await supabase
        .from('user_status')
        .select(`
          user_id,
          approved,
          auth_users:user_id (
            email,
            created_at
          )
        `)
        .eq('approved', false);

      if (error) {
        throw error;
      }

      // Formatar os dados para uso no componente
      const formattedUsers = userStatusData?.map(item => ({
        user_id: item.user_id,
        approved: item.approved,
        email: item.auth_users?.email,
        created_at: item.auth_users?.created_at
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários pendentes:', error);
      toast.error('Falha ao carregar usuários pendentes');
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
