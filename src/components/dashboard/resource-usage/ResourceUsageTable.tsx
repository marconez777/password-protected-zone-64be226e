
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceUsageRow } from "./ResourceUsageRow";
import { Usage, PlanLimit } from "@/types/usage";

interface ResourceUsageTableProps {
  usage: Usage | null;
  planLimits: PlanLimit | null;
  isLoading?: boolean;
}

export const ResourceUsageTable = ({ usage, planLimits, isLoading = false }: ResourceUsageTableProps) => {
  if (!planLimits) {
    return (
      <div className="text-center p-4 text-gray-500">
        Não foi possível carregar os limites do plano.
      </div>
    );
  }
  
  // Use a default value of 0 for usage counts if usage data is null
  const safeUsage = usage || {
    market_research_count: 0,
    search_funnel_count: 0,
    keyword_count: 0,
    seo_text_count: 0,
    topic_research_count: 0,
    metadata_generation_count: 0
  } as Usage;
  
  // Define the resource mapping for display with clear labels
  const resources = [
    {
      name: "Pesquisas de Mercado",
      count: safeUsage.market_research_count || 0,
      limit: planLimits.market_research_limit
    },
    {
      name: "Funis de Busca",
      count: safeUsage.search_funnel_count || 0,
      limit: planLimits.search_funnel_limit
    },
    {
      name: "Palavras-chave",
      count: safeUsage.keyword_count || 0,
      limit: planLimits.keyword_limit
    },
    {
      name: "Textos SEO",
      count: safeUsage.seo_text_count || 0,
      limit: planLimits.seo_text_limit
    },
    {
      name: "Pautas para Blog",
      count: safeUsage.topic_research_count || 0,
      limit: planLimits.topic_research_limit
    },
    {
      name: "Meta Dados",
      count: safeUsage.metadata_generation_count || 0,
      limit: planLimits.metadata_generation_limit
    }
  ];
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto opacity-70">
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
              <TableRow key={resource.name} className="animate-pulse">
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell className="bg-gray-200 h-6 rounded"></TableCell>
                <TableCell className="bg-gray-200 h-6 rounded"></TableCell>
                <TableCell className="w-[300px]">
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
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
              key={resource.name}
              name={resource.name}
              count={resource.count}
              limit={resource.limit}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
