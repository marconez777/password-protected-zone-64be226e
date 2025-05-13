
/**
 * Formats the resource limit for display
 * @param limit The resource limit value
 * @returns Formatted limit string
 */
export const formatLimit = (limit: number | null): string => {
  if (limit === null) return "Ilimitado";
  return String(limit);
};
