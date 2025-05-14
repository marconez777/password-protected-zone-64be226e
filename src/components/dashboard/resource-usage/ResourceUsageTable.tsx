
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceUsageRow } from "./ResourceUsageRow";
import { Usage, PlanLimit } from "@/types/usage";
import { resources } from "@/config/resources";

interface ResourceUsageTableProps {
  usage: Usage | null;
  planLimits: PlanLimit | null;
}

export const ResourceUsageTable = ({ usage, planLimits }: ResourceUsageTableProps) => {
  if (!planLimits) return null;
  
  // Use a default value of 0 for usage counts if usage data is null
  const safeUsage = usage || {
    market_research_count: 0,
    search_funnel_count: 0,
    keyword_count: 0,
    seo_text_count: 0,
    topic_research_count: 0,
    metadata_generation_count: 0
  } as Usage;
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Recurso</TableHead>
            <TableHead className="w-[180px]">Utilizado</TableHead>
            <TableHead className="w-[180px]">Limite</TableHead>
            <TableHead>Uso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <ResourceUsageRow 
              key={resource.key}
              name={resource.label}
              count={Number(safeUsage[resource.usageField] || 0)}
              limit={planLimits[resource.limitField] === null ? null : Number(planLimits[resource.limitField])}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
