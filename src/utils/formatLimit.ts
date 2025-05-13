
/**
 * Formats the resource limit for display
 * @param limit The resource limit value
 * @returns Formatted limit string
 */
export const formatLimit = (limit: number | null): string => {
  if (limit === null) return "Ilimitado";
  if (limit === 0) return "0"; // Handle zero explicitly
  return new Intl.NumberFormat('pt-BR').format(limit); // Format with thousands separators
};
