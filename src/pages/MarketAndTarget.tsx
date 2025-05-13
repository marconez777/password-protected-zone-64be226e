
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MarketTargetForm } from "@/components/market-target/MarketTargetForm";
import { useAuth } from "@/hooks/useAuth";

const MarketAndTarget = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Mercado e Público Alvo" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <MarketTargetForm />
    </DashboardLayout>
  );
};

export default MarketAndTarget;
