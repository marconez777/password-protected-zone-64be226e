
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Usage {
  id: string;
  user_id: string;
  keyword_count: number;
  market_research_count: number;
  search_funnel_count: number;
  seo_text_count: number;
  topic_research_count: number;
  metadata_generation_count: number;
  created_at: string;
  updated_at: string;
}

interface PlanLimit {
  id: string;
  plan_type: 'solo' | 'discovery' | 'escala';
  keyword_limit: number | null;
  market_research_limit: number | null;
  search_funnel_limit: number | null;
  seo_text_limit: number | null;
  topic_research_limit: number | null;
  metadata_generation_limit: number | null;
  created_at: string;
  updated_at: string;
}

interface ResourceUsageCardProps {
  usage: Usage | null;
  planLimits: PlanLimit | null;
}

export const ResourceUsageCard = ({ usage, planLimits }: ResourceUsageCardProps) => {
  // Calcular porcentagem de uso
  const calculateUsagePercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0; // Plano escala (ilimitado)
    if (limit === 0) return 100; // Evitar divisão por zero
    return Math.min(Math.round((used / limit) * 100), 100);
  };

  // Formatar limite com base no plano
  const formatLimit = (limit: number | null) => {
    if (limit === null) return "Ilimitado";
    return limit.toString();
  };

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-6">Uso de Recursos</h2>
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
              {/* Pesquisas de Mercado */}
              <TableRow>
                <TableCell className="font-medium">Pesquisas de Mercado</TableCell>
                <TableCell>{usage?.market_research_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.market_research_limit)}</TableCell>
                <TableCell className="w-[300px]">
                  {planLimits?.market_research_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.market_research_count || 0, planLimits?.market_research_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.market_research_count || 0, planLimits?.market_research_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              
              {/* Funis de Busca */}
              <TableRow>
                <TableCell className="font-medium">Funis de Busca</TableCell>
                <TableCell>{usage?.search_funnel_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.search_funnel_limit)}</TableCell>
                <TableCell>
                  {planLimits?.search_funnel_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.search_funnel_count || 0, planLimits?.search_funnel_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.search_funnel_count || 0, planLimits?.search_funnel_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              
              {/* Palavras-chave */}
              <TableRow>
                <TableCell className="font-medium">Palavras-chave</TableCell>
                <TableCell>{usage?.keyword_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.keyword_limit)}</TableCell>
                <TableCell>
                  {planLimits?.keyword_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.keyword_count || 0, planLimits?.keyword_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.keyword_count || 0, planLimits?.keyword_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              
              {/* Textos SEO */}
              <TableRow>
                <TableCell className="font-medium">Textos SEO</TableCell>
                <TableCell>{usage?.seo_text_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.seo_text_limit)}</TableCell>
                <TableCell>
                  {planLimits?.seo_text_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.seo_text_count || 0, planLimits?.seo_text_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.seo_text_count || 0, planLimits?.seo_text_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              
              {/* Pautas para Blog */}
              <TableRow>
                <TableCell className="font-medium">Pautas para Blog</TableCell>
                <TableCell>{usage?.topic_research_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.topic_research_limit)}</TableCell>
                <TableCell>
                  {planLimits?.topic_research_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.topic_research_count || 0, planLimits?.topic_research_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.topic_research_count || 0, planLimits?.topic_research_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              
              {/* Meta Dados */}
              <TableRow>
                <TableCell className="font-medium">Meta Dados</TableCell>
                <TableCell>{usage?.metadata_generation_count || 0}</TableCell>
                <TableCell>{formatLimit(planLimits?.metadata_generation_limit)}</TableCell>
                <TableCell>
                  {planLimits?.metadata_generation_limit === null ? (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateUsagePercentage(usage?.metadata_generation_count || 0, planLimits?.metadata_generation_limit)} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {calculateUsagePercentage(usage?.metadata_generation_count || 0, planLimits?.metadata_generation_limit)}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
