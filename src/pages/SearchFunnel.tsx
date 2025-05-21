
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { SearchFunnelForm } from "../components/search-funnel/SearchFunnelForm";

const SearchFunnel = () => {
  return (
    <DashboardLayout 
      title="Funil de Busca" 
      subtitle="Gere funis de busca para seu negócio"
    >
      <SearchFunnelForm />
    </DashboardLayout>
  );
};

export default SearchFunnel;
