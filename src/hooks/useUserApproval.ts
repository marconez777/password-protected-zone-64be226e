
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
      console.log('Iniciando busca de usuários pendentes...');
      
      // Usar a função RPC get_pending_users que foi ajustada para usar is_current_admin()
      const { data, error } = await supabase
        .rpc('get_pending_users');
      
      if (error) {
        console.error('Erro ao buscar usuários pendentes:', error);
        toast.error('Falha ao carregar usuários pendentes');
        setUsers([]);
        throw error;
      }
      
      console.log('Resposta da função get_pending_users:', data);
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('Nenhum usuário pendente encontrado');
        setUsers([]);
        return [];
      }
      
      // Os dados já vêm formatados da função RPC
      console.log('Usuários pendentes encontrados:', data);
      setUsers(data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar usuários pendentes:', error);
      toast.error('Falha ao carregar usuários pendentes');
      setUsers([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Aprovar um usuário
  const approveUser = async (userId: string) => {
    setLoading(true);
    try {
      console.log('Tentando aprovar usuário:', userId);
      const { error } = await supabase
        .from('user_status')
        .update({ approved: true })
        .eq('user_id', userId);

      if (error) {
        console.error('Erro ao aprovar usuário:', error);
        toast.error('Falha ao aprovar usuário');
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
      console.log('Tentando rejeitar usuário:', userId);
      // Esta operação requer service_role key, então usaremos uma Edge Function
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId }
      });

      if (error) {
        console.error('Erro ao rejeitar usuário:', error);
        toast.error('Falha ao rejeitar usuário');
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
