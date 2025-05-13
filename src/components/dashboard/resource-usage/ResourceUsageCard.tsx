
import { Card, CardContent } from "@/components/ui/card";
import { ResourceUsageTable } from "./ResourceUsageTable";
import { Usage, PlanLimit } from "@/types/usage";

interface ResourceUsageCardProps {
  usage: Usage | null;
  planLimits: PlanLimit | null;
  loading?: boolean;
}

export const ResourceUsageCard = ({ usage, planLimits, loading = false }: ResourceUsageCardProps) => {
  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Uso de Recursos</h2>
          {loading && (
            <span className="text-xs text-gray-500 animate-pulse">
              Atualizando...
            </span>
          )}
        </div>
        
        <ResourceUsageTable 
          usage={usage} 
          planLimits={planLimits} 
          isLoading={loading}
        />
      </CardContent>
    </Card>
  );
};
