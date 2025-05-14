
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  userName: string | null;
}

export const DashboardLayout = ({ 
  children, 
  title, 
  subtitle, 
  userName 
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
              {subtitle && <p className="text-gray-500">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="block md:hidden" />
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  <Link to="/dashboard">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Meu Perfil
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  <Link to="/dashboard">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
