
import { TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UsageDisplay } from "./UsageDisplay";
import { formatLimit } from "@/utils/formatLimit";
import { calculateUsagePercentage } from "@/utils/calculateUsage";

interface ResourceUsageRowProps {
  name: string;
  count: number;
  limit: number | null;
}

export const ResourceUsageRow = ({ name, count, limit }: ResourceUsageRowProps) => {
  // Format the count with thousands separators
  const formattedCount = new Intl.NumberFormat('pt-BR').format(count);
  const formattedLimit = formatLimit(limit);
  const percentage = calculateUsagePercentage(count, limit);
  
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <span className="font-semibold">{formattedCount}</span>
      </TableCell>
      <TableCell>
        <span className={limit === null ? "text-green-600 font-semibold" : ""}>
          {formattedLimit}
        </span>
      </TableCell>
      <TableCell className="w-[300px]">
        <UsageDisplay count={count} limit={limit} />
      </TableCell>
    </TableRow>
  );
};
