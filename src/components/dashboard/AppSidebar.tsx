import { SidebarCloseButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import {
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarNavLinkIcon,
  SidebarNavLinkText,
  SidebarNavMain,
  SidebarNavSection,
  SidebarNavSectionContent,
  SidebarNavSectionHeader,
  SidebarNavSectionTitle,
} from "@/components/ui/sidebar";
import {
  CreditCard,
  Home,
  SearchCheck,
  KeyRound,
  Target,
  FileText,
  BookText,
  FileQuestion,
  ScrollText,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SubscriptionNotification } from '@/components/ui/sidebar/SubscriptionNotification';
import { useSubscription } from '@/hooks/useSubscription';

export function AppSidebar() {
  const { signOut } = useAuth();
  const { active, remainingUses, limit } = useSubscription();
  
  return (
    <SidebarNav className="w-72 border-r px-2 py-2 flex flex-col overflow-hidden">
      <SidebarNavHeader>
        <Logo className="h-8 w-8 text-mkranker-purple" />
        <SidebarNavHeaderTitle>MK Ranker</SidebarNavHeaderTitle>
        <SidebarCloseButton className="w-8 h-8 absolute top-3 right-2 md:hidden" />
      </SidebarNavHeader>
      
      <SubscriptionNotification />
      
      <SidebarNavMain>
        <SidebarNavSection>
          <SidebarNavSectionHeader>
            <SidebarNavSectionTitle>Principal</SidebarNavSectionTitle>
          </SidebarNavSectionHeader>
          <SidebarNavSectionContent>
            <SidebarNavLink to="/dashboard">
              <SidebarNavLinkIcon>
                <Home className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Dashboard</SidebarNavLinkText>
            </SidebarNavLink>
            
            {active && (
              <SidebarNavLink to="/subscription-management">
                <SidebarNavLinkIcon>
                  <CreditCard className="h-4 w-4" />
                </SidebarNavLinkIcon>
                <SidebarNavLinkText>
                  Assinatura
                  <span className="ml-2 text-xs py-0.5 px-1.5 rounded-full bg-gray-200 text-gray-700">
                    {remainingUses}/{limit}
                  </span>
                </SidebarNavLinkText>
              </SidebarNavLink>
            )}
          </SidebarNavSectionContent>
        </SidebarNavSection>
        
        <SidebarNavSection>
          <SidebarNavSectionHeader>
            <SidebarNavSectionTitle>Ferramentas</SidebarNavSectionTitle>
          </SidebarNavSectionHeader>
          <SidebarNavSectionContent>
            <SidebarNavLink to="/search-funnel">
              <SidebarNavLinkIcon>
                <SearchCheck className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Funil de Busca</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/keywords">
              <SidebarNavLinkIcon>
                <KeyRound className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Palavras-chave</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/market-and-target">
              <SidebarNavLinkIcon>
                <Target className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Mercado e Público-alvo</SidebarNavLinkText>
            </SidebarNavLink>
          </SidebarNavSectionContent>
        </SidebarNavSection>
        
        <SidebarNavSection>
          <SidebarNavSectionHeader>
            <SidebarNavSectionTitle>Conteúdo SEO</SidebarNavSectionTitle>
          </SidebarNavSectionHeader>
          <SidebarNavSectionContent>
            <SidebarNavLink to="/texto-seo-lp">
              <SidebarNavLinkIcon>
                <FileText className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Texto SEO para LP</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/texto-seo-produto">
              <SidebarNavLinkIcon>
                <FileText className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Texto SEO para Produto</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/texto-seo-blog">
              <SidebarNavLinkIcon>
                <FileText className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Texto SEO para Blog</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/pautas-blog">
              <SidebarNavLinkIcon>
                <BookText className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Pautas para Blog</SidebarNavLinkText>
            </SidebarNavLink>
            <SidebarNavLink to="/meta-dados">
              <SidebarNavLinkIcon>
                <ScrollText className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Meta Dados</SidebarNavLinkText>
            </SidebarNavLink>
          </SidebarNavSectionContent>
        </SidebarNavSection>
        
        <SidebarNavSection>
          <SidebarNavSectionHeader>
            <SidebarNavSectionTitle>Ajuda</SidebarNavSectionTitle>
          </SidebarNavSectionHeader>
          <SidebarNavSectionContent>
            <SidebarNavLink to="/docs">
              <SidebarNavLinkIcon>
                <FileQuestion className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Documentação</SidebarNavLinkText>
            </SidebarNavLink>
          </SidebarNavSectionContent>
        </SidebarNavSection>
        
        <SidebarNavSection>
          <SidebarNavSectionHeader>
            <SidebarNavSectionTitle>Conta</SidebarNavSectionTitle>
          </SidebarNavSectionHeader>
          <SidebarNavSectionContent>
            {!active && (
              <SidebarNavLink to="/subscribe">
                <SidebarNavLinkIcon>
                  <CreditCard className="h-4 w-4" />
                </SidebarNavLinkIcon>
                <SidebarNavLinkText>Assinar</SidebarNavLinkText>
              </SidebarNavLink>
            )}
            <SidebarNavLink onClick={signOut} to="#">
              <SidebarNavLinkIcon>
                <LogOut className="h-4 w-4" />
              </SidebarNavLinkIcon>
              <SidebarNavLinkText>Sair</SidebarNavLinkText>
            </SidebarNavLink>
          </SidebarNavSectionContent>
        </SidebarNavSection>
      </SidebarNavMain>
    </SidebarNav>
  );
}
