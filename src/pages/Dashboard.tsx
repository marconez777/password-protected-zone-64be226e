
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUsageData } from "@/hooks/useUsageData";
import { format, isPast, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client"; // Added missing import
import { 
  BarChart3, 
  Calendar, 
  Check, 
  ChevronRight,
  Clock, 
  CreditCard, 
  DollarSign, 
  FileText, 
  Home, 
  LogOut, 
  Search,
  Settings, 
  User, 
  Users,
  X,
  Bell,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

// Tipos para os dados
interface Subscription {
  id: string;
  user_id: string;
  is_active: boolean;
  plan_type: 'solo' | 'discovery' | 'escala';
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

interface Usage {
  id: string;
  user_id: string;
  keyword_count: number;
  market_research_count: number;
  search_funnel_count: number;
  seo_text_count: number;
  topic_research_count: number;
  metadata_generation_count: number;
  created_at: string;
  updated_at: string;
}

interface PlanLimit {
  id: string;
  plan_type: 'solo' | 'discovery' | 'escala';
  keyword_limit: number | null;
  market_research_limit: number | null;
  search_funnel_limit: number | null;
  seo_text_limit: number | null;
  topic_research_limit: number | null;
  metadata_generation_limit: number | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    subscription, 
    usage, 
    planLimits, 
    loading 
  } = useUsageData();

  // Determinar o status da assinatura
  const getSubscriptionStatus = () => {
    if (!subscription) return "pendente";
    
    if (!subscription.is_active) return "pendente";
    
    if (subscription.current_period_end) {
      const endDate = new Date(subscription.current_period_end);
      if (isPast(endDate)) return "expirado";
      return "ativo";
    }
    
    return "ativo";
  };

  // Verificar se o plano está prestes a expirar
  const isExpiringSoon = () => {
    if (!subscription || !subscription.current_period_end) return false;
    
    const endDate = new Date(subscription.current_period_end);
    const daysLeft = differenceInDays(endDate, new Date());
    return daysLeft <= 5 && daysLeft >= 0;
  };

  // Formatar data de vencimento
  const formatExpirationDate = () => {
    if (!subscription || !subscription.current_period_end) return "N/A";
    return format(new Date(subscription.current_period_end), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  // Calcular porcentagem de uso
  const calculateUsagePercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0; // Plano escala (ilimitado)
    if (limit === 0) return 100; // Evitar divisão por zero
    return Math.min(Math.round((used / limit) * 100), 100);
  };

  // Formatar limite com base no plano
  const formatLimit = (limit: number | null) => {
    if (limit === null) return "Ilimitado";
    return limit.toString();
  };

  useEffect(() => {
    // Se não autenticado, redirecionar para login
    if (!session) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const subscriptionStatus = getSubscriptionStatus();
  const expirationDate = formatExpirationDate();
  const expiringSoon = isExpiringSoon();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="bg-mkranker-sidebar-bg border-r border-gray-200">
          <SidebarHeader className="flex items-center px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-mkranker-purple w-8 h-8 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="text-lg font-medium text-gray-800">MKRanker</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-mkranker-sidebar-text">GERAL</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive className="text-mkranker-sidebar-text data-[active=true]:text-mkranker-sidebar-active data-[active=true]:bg-mkranker-purple/10">
                    <Home className="text-mkranker-sidebar-text data-[active=true]:text-mkranker-sidebar-active" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-mkranker-sidebar-text">FERRAMENTAS</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10">
                    <Search className="text-mkranker-sidebar-text" />
                    <span>Funil de Busca</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10">
                    <Users className="text-mkranker-sidebar-text" />
                    <span>Mercado e Público Alvo</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10">
                    <BarChart3 className="text-mkranker-sidebar-text" />
                    <span>Palavras Chaves</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10">
                    <FileText className="text-mkranker-sidebar-text" />
                    <span>Texto SEO para LP</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto border-t border-gray-200 p-4">
            <SidebarMenuButton onClick={handleLogout} className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Bem-vindo, {user?.user_metadata?.full_name || "Usuário"}</p>
            </div>
            <SidebarTrigger className="block md:hidden" />
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>

          {/* Aviso de expiração */}
          {expiringSoon && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6 flex items-center">
              <Bell className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <h3 className="font-medium text-amber-700">Sua assinatura está prestes a expirar</h3>
                <p className="text-sm text-amber-600">Renove seu plano até {expirationDate} para continuar usando todos os recursos.</p>
              </div>
            </div>
          )}
          
          {/* Informações da Assinatura */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">Informações da Assinatura</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Plano Atual</span>
                <div className="flex items-center">
                  <span className="text-lg font-medium capitalize">
                    {subscription?.plan_type === 'solo' ? 'Solo' : 
                     subscription?.plan_type === 'discovery' ? 'Discovery' : 
                     subscription?.plan_type === 'escala' ? 'Escala' : 'N/A'}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto p-1 ml-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-48 text-xs">
                        {subscription?.plan_type === 'solo' ? 'Plano mensal com recursos básicos' : 
                         subscription?.plan_type === 'discovery' ? 'Plano anual com recursos avançados' : 
                         subscription?.plan_type === 'escala' ? 'Plano com recursos ilimitados' : 'N/A'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Status</span>
                <div className="flex items-center">
                  {subscriptionStatus === 'ativo' && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-0.5 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  )}
                  {subscriptionStatus === 'pendente' && (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-2 py-0.5 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Pendente
                    </Badge>
                  )}
                  {subscriptionStatus === 'expirado' && (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 px-2 py-0.5 text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Expirado
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Vencimento</span>
                <div className="flex items-center">
                  <span className="text-lg font-medium">{expirationDate}</span>
                  <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
            </div>
            
            {(subscriptionStatus === 'pendente' || subscriptionStatus === 'expirado') && (
              <div className="mt-6">
                <Button 
                  className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
                  onClick={() => navigate("/subscribe")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {subscriptionStatus === 'expirado' ? 'Renovar Assinatura' : 'Ativar Assinatura'}
                </Button>
              </div>
            )}
          </div>
          
          {/* Uso de Recursos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-medium mb-6">Uso de Recursos</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Recurso</TableHead>
                    <TableHead className="w-[180px]">Utilizado</TableHead>
                    <TableHead className="w-[180px]">Limite</TableHead>
                    <TableHead>Uso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Pesquisas de Mercado */}
                  <TableRow>
                    <TableCell className="font-medium">Pesquisas de Mercado</TableCell>
                    <TableCell>{usage?.market_research_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.market_research_limit)}</TableCell>
                    <TableCell className="w-[300px]">
                      {planLimits?.market_research_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.market_research_count || 0, planLimits?.market_research_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.market_research_count || 0, planLimits?.market_research_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Funis de Busca */}
                  <TableRow>
                    <TableCell className="font-medium">Funis de Busca</TableCell>
                    <TableCell>{usage?.search_funnel_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.search_funnel_limit)}</TableCell>
                    <TableCell>
                      {planLimits?.search_funnel_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.search_funnel_count || 0, planLimits?.search_funnel_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.search_funnel_count || 0, planLimits?.search_funnel_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Palavras-chave */}
                  <TableRow>
                    <TableCell className="font-medium">Palavras-chave</TableCell>
                    <TableCell>{usage?.keyword_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.keyword_limit)}</TableCell>
                    <TableCell>
                      {planLimits?.keyword_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.keyword_count || 0, planLimits?.keyword_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.keyword_count || 0, planLimits?.keyword_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Textos SEO */}
                  <TableRow>
                    <TableCell className="font-medium">Textos SEO</TableCell>
                    <TableCell>{usage?.seo_text_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.seo_text_limit)}</TableCell>
                    <TableCell>
                      {planLimits?.seo_text_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.seo_text_count || 0, planLimits?.seo_text_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.seo_text_count || 0, planLimits?.seo_text_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Pautas para Blog */}
                  <TableRow>
                    <TableCell className="font-medium">Pautas para Blog</TableCell>
                    <TableCell>{usage?.topic_research_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.topic_research_limit)}</TableCell>
                    <TableCell>
                      {planLimits?.topic_research_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.topic_research_count || 0, planLimits?.topic_research_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.topic_research_count || 0, planLimits?.topic_research_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Meta Dados */}
                  <TableRow>
                    <TableCell className="font-medium">Meta Dados</TableCell>
                    <TableCell>{usage?.metadata_generation_count || 0}</TableCell>
                    <TableCell>{formatLimit(planLimits?.metadata_generation_limit)}</TableCell>
                    <TableCell>
                      {planLimits?.metadata_generation_limit === null ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculateUsagePercentage(usage?.metadata_generation_count || 0, planLimits?.metadata_generation_limit)} 
                            className="h-2"
                          />
                          <span className="text-xs text-gray-500">
                            {calculateUsagePercentage(usage?.metadata_generation_count || 0, planLimits?.metadata_generation_limit)}%
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Páginas e Ferramentas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Funil de Busca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Search className="h-8 w-8 text-mkranker-purple" />
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Mercado e Público</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Users className="h-8 w-8 text-mkranker-purple" />
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Palavras Chaves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <BarChart3 className="h-8 w-8 text-mkranker-purple" />
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Texto SEO para LP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <FileText className="h-8 w-8 text-mkranker-purple" />
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
