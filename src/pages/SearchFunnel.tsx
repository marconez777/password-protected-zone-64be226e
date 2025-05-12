
import { SearchFunnelForm } from "@/components/SearchFunnelForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Calendar, 
  Check, 
  ChevronRight, 
  Clock, 
  CreditCard, 
  FileText, 
  Home, 
  LogOut, 
  Search, 
  Settings, 
  User, 
  Users
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function SearchFunnel() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
                  <SidebarMenuButton 
                    className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Home className="text-mkranker-sidebar-text" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-mkranker-sidebar-text">FERRAMENTAS</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive
                    className="text-mkranker-sidebar-text data-[active=true]:text-mkranker-sidebar-active data-[active=true]:bg-mkranker-purple/10"
                    onClick={() => navigate("/funil-de-busca")}
                  >
                    <Search className="text-mkranker-sidebar-text data-[active=true]:text-mkranker-sidebar-active" />
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
            <SidebarMenuButton 
              onClick={handleLogout} 
              className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
            >
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-medium text-gray-800">Funil de Busca</h1>
                <p className="text-gray-500">Gere funis de busca para seu nicho</p>
              </div>
              <SidebarTrigger className="block md:hidden" />
              <div className="hidden md:flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
              </div>
            </div>
            
            <SearchFunnelForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
