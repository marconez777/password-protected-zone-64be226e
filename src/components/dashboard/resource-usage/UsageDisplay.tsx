
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { calculateUsagePercentage } from "../../../utils/calculateUsage";

interface UsageDisplayProps {
  count: number;
  limit: number | null;
}

export const UsageDisplay = ({ count, limit }: UsageDisplayProps) => {
  // For Escala plan (unlimited) or any null limit
  if (limit === null) {
    return (
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
    );
  }
  
  const percentage = calculateUsagePercentage(count, limit);
  
  let statusColor = "bg-green-100 text-green-800";
  if (percentage > 90) {
    statusColor = "bg-red-100 text-red-800";
  } else if (percentage > 70) {
    statusColor = "bg-amber-100 text-amber-800";
  }
  
  return (
    <div className="flex items-center gap-2">
      <Progress 
        value={percentage} 
        className={`h-2 ${percentage > 90 ? 'bg-red-100' : percentage > 70 ? 'bg-amber-100' : ''}`}
      />
      <span className="text-xs text-gray-500">
        {percentage}%
      </span>
    </div>
  );
};
