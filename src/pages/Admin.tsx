
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApprovalPanel } from "@/components/admin/UserApprovalPanel";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário logado é um admin
    if (user && !isAdmin) {
      toast.error('Você não tem permissão para acessar esta página');
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  // Só renderiza o conteúdo se for o admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Painel de Administração</h1>
      <Separator className="my-6" />
      
      <UserApprovalPanel />
    </div>
  );
};

export default Admin;
