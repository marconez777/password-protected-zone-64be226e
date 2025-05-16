
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const DashboardLayout = ({ 
  children, 
  title, 
  subtitle
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
            </div>
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
