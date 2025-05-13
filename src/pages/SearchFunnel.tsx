
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SearchFunnelForm } from "@/components/search-funnel/SearchFunnelForm";
import { useAuth } from "@/hooks/useAuth";

const SearchFunnel = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Funil de Busca" 
      subtitle="Gere funis de busca para seu negócio"
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <div className="bg-white rounded-lg">
        <SearchFunnelForm />
      </div>
    </DashboardLayout>
  );
};

export default SearchFunnel;
