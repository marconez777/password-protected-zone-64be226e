
import { Card, CardContent } from "@/components/ui/card";
import { ResourceUsageTable } from "./ResourceUsageTable";
import { Usage, PlanLimit } from "@/hooks/useUsageData";

interface ResourceUsageCardProps {
  usage: Usage | null;
  planLimits: PlanLimit | null;
}

export const ResourceUsageCard = ({ usage, planLimits }: ResourceUsageCardProps) => {
  // Early return if no plan limits are available
  if (!planLimits) {
    return (
      <Card className="border border-gray-200 shadow-sm mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-6">Uso de Recursos</h2>
          <div className="text-center py-10">
            <p className="text-gray-500">Carregando informações do plano...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-6">Uso de Recursos</h2>
        <ResourceUsageTable usage={usage} planLimits={planLimits} />
      </CardContent>
    </Card>
  );
};
