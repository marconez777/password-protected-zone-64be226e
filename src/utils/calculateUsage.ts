
/**
 * Calculates the percentage of resource usage
 * @param used Number of resources used
 * @param limit Maximum limit of resources
 * @returns Percentage of usage (0-100)
 */
export const calculateUsagePercentage = (used: number, limit: number | null): number => {
  if (limit === null) return 0; // Plano escala (ilimitado)
  if (limit === 0) return 100; // Evitar divisão por zero
  return Math.min(Math.round((used / limit) * 100), 100);
};
