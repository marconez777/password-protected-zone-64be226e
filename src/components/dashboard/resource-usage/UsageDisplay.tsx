
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { calculateUsagePercentage } from "../../../utils/calculateUsage";

interface UsageDisplayProps {
  count: number;
  limit: number | null;
}

export const UsageDisplay = ({ count, limit }: UsageDisplayProps) => {
  if (limit === null) {
    return (
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ilimitado</Badge>
    );
  }
  
  const percentage = calculateUsagePercentage(count, limit);
  
  return (
    <div className="flex items-center gap-2">
      <Progress 
        value={percentage} 
        className="h-2"
      />
      <span className="text-xs text-gray-500">
        {percentage}%
      </span>
    </div>
  );
};
