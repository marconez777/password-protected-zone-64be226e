
/**
 * Calculates the percentage of resource usage
 * @param used Number of resources used
 * @param limit Maximum limit of resources
 * @returns Percentage of usage (0-100)
 */
export const calculateUsagePercentage = (used: number, limit: number | null): number => {
  if (limit === null) return 0; // Plano escala (ilimitado)
  if (limit === 0) return 100; // Evitar divisão por zero
  const percentage = (used / limit) * 100;
  return Math.min(Math.round(percentage), 100); // Ensure it's between 0-100
};
