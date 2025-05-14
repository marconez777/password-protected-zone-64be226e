
import { ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Button } from "@/components/ui/button";
import { User as UserIcon, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

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
  const { remainingUses, limit, endsAt } = useSubscription();
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };
  
  const usagePercentage = limit > 0 ? ((limit - remainingUses) / limit) * 100 : 0;
  
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
              <div className="hidden md:block">
                <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-mkranker-purple">{remainingUses}</span> de {limit} requisições restantes
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${usagePercentage > 75 ? 'bg-red-500' : 'bg-mkranker-purple'}`}
                      style={{ width: `${usagePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <SidebarTrigger className="block md:hidden" />
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  <Link to="/subscribe">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {endsAt ? `Assinatura até ${formatDate(endsAt)}` : "Assinar"}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Perfil
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
