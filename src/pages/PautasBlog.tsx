
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PautasBlogForm } from "@/components/pautas-blog/PautasBlogForm";
import { useAuth } from "@/hooks/useAuth";

const PautasBlog = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Pautas para Blog" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <PautasBlogForm />
    </DashboardLayout>
  );
};

export default PautasBlog;
