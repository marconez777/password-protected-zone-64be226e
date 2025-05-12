
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Home, 
  LogOut, 
  Search,
  Users 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export const AppSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
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
                isActive={window.location.pathname === '/dashboard'} 
                className="text-mkranker-sidebar-text data-[active=true]:text-mkranker-sidebar-active data-[active=true]:bg-mkranker-purple/10"
                onClick={() => navigate('/dashboard')}
              >
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
              <SidebarMenuButton 
                isActive={window.location.pathname === '/funil-de-busca'}
                className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
                onClick={() => navigate('/funil-de-busca')}
              >
                <Search className="text-mkranker-sidebar-text" />
                <span>Funil de Busca</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
              >
                <Users className="text-mkranker-sidebar-text" />
                <span>Mercado e Público Alvo</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
              >
                <BarChart3 className="text-mkranker-sidebar-text" />
                <span>Palavras Chaves</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="text-mkranker-sidebar-text hover:text-mkranker-sidebar-active hover:bg-mkranker-purple/10"
              >
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
  );
};
