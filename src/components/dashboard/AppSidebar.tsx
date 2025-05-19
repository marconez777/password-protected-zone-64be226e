
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import {
  Home,
  SearchCheck,
  KeyRound,
  Target,
  FileText,
  BookText,
  ScrollText,
  LogOut,
  X,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth";
import { toast } from "sonner";

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    toast.success("Você saiu com sucesso.");
    navigate('/login');
  };
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex items-center px-4 py-2">
        <Logo variant="light" className="h-8" />
        <Button 
          variant="ghost" 
          size="icon"
          className="ml-auto md:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        {user && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-4 py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="truncate" title={user.email || ""}>{user.email}</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/market-and-target-tool">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Mercado e Público-alvo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/search-funnel">
                    <SearchCheck className="h-4 w-4 mr-2" />
                    <span>Funil de Busca</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/keywords-tool">
                    <KeyRound className="h-4 w-4 mr-2" />
                    <span>Palavras-chave</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/texto-seo-lp-tool">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Texto SEO para LP</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/texto-seo-produto-tool">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Texto SEO para Produto</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/texto-seo-blog-tool">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Texto SEO para Blog</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/pautas-blog-tool">
                    <BookText className="h-4 w-4 mr-2" />
                    <span>Pautas para Blog</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/meta-dados-tool">
                    <ScrollText className="h-4 w-4 mr-2" />
                    <span>Meta Dados</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
