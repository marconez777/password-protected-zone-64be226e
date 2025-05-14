
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MarketTargetForm } from "@/components/market-target/MarketTargetForm";

const MarketAndTarget = () => {
  return (
    <DashboardLayout 
      title="Mercado e Público Alvo" 
      subtitle="Gere análises de mercado para seu negócio"
    >
      <MarketTargetForm />
    </DashboardLayout>
  );
};

export default MarketAndTarget;
