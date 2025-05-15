
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApprovalPanel } from "@/components/admin/UserApprovalPanel";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    // Verificamos se o usuário tem permissão de administrador
    if (!user) {
      toast.error('Você precisa estar logado para acessar esta página');
      navigate('/login');
      return;
    }
    
    // Verificar se o usuário é administrador
    const checkAdminStatus = async () => {
      try {
        // Usar a nova função count_pending_users para obter contagem de usuários pendentes
        const { data, error } = await supabase.rpc('count_pending_users');
        
        if (error) throw error;
        
        setPendingCount(data);
      } catch (error) {
        console.error("Erro ao verificar status de admin:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      checkAdminStatus();
    }
  }, [user, navigate, isAdmin]);

  // Redireciona se não for admin, após verificação completa
  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error('Você não tem permissão para acessar esta página');
      navigate('/dashboard');
    }
  }, [loading, isAdmin, navigate]);

  // Só renderiza o conteúdo após verificação e se for admin
  if (loading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Painel de Administração</h1>
      
      {pendingCount !== null && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-amber-800">
            {pendingCount === 0 
              ? 'Não há usuários pendentes de aprovação.' 
              : `Há ${pendingCount} usuário(s) pendente(s) de aprovação.`}
          </p>
        </div>
      )}
      
      <Separator className="my-6" />
      
      <UserApprovalPanel />
    </div>
  );
};

export default Admin;
