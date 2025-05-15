
import { useEffect, useState } from 'react';
import { useUserApproval } from '@/hooks/useUserApproval';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export const UserApprovalPanel = () => {
  const { loading, users, fetchUsersPendingApproval, approveUser, rejectUser } = useUserApproval();
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setError(null);
        await fetchUsersPendingApproval();
      } catch (err) {
        console.error("Erro ao carregar usuários pendentes:", err);
        setError("Falha ao carregar usuários pendentes. Por favor, tente novamente.");
      } finally {
        setInitialLoadAttempted(true);
      }
    };
    
    loadUsers();
  }, []);

  // Formatar a data
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };

  // Handlers para aprovar e rejeitar usuários com melhor feedback
  const handleApprove = async (userId: string) => {
    setActionInProgress(userId);
    setError(null);
    try {
      await approveUser(userId);
    } catch (err) {
      setError("Falha ao aprovar usuário. Por favor, tente novamente.");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (userId: string) => {
    setActionInProgress(userId);
    setError(null);
    try {
      await rejectUser(userId);
    } catch (err) {
      setError("Falha ao rejeitar usuário. Por favor, tente novamente.");
    } finally {
      setActionInProgress(null);
    }
  };

  // Função para atualizar a lista de usuários
  const handleRefresh = () => {
    setError(null);
    fetchUsersPendingApproval().catch(() => {
      setError("Erro ao atualizar lista de usuários pendentes. Por favor, tente novamente.");
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aprovação de Usuários</h2>
        <Button 
          onClick={handleRefresh}
          variant="outline"
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && !initialLoadAttempted ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-md">
          <p className="text-muted-foreground">
            {initialLoadAttempted && !loading ? "Nenhum usuário pendente de aprovação" : "Carregando usuários..."}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Data de cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.email || 'N/A'}</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(user.user_id)}
                      disabled={loading || actionInProgress === user.user_id}
                    >
                      {actionInProgress === user.user_id ? (
                        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                      )}
                      Aprovar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(user.user_id)}
                      disabled={loading || actionInProgress === user.user_id}
                    >
                      {actionInProgress === user.user_id ? (
                        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      Rejeitar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
