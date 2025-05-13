
import { supabase } from '@/integrations/supabase/client';
import { Usage } from '@/types/usage';

/**
 * Fetches usage data for a user
 * @param userId The user's ID
 * @returns The usage data or null if not found
 */
export async function fetchUsageData(userId: string): Promise<Usage | null> {
  // Add query parameter to avoid browser caching
  const timestamp = new Date().getTime();
  
  const { data: usageData, error: usageError } = await supabase
    .from("user_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (usageError && usageError.code !== 'PGRST116') {
    console.error("Erro ao carregar dados de uso:", usageError);
    return null;
  }

  return usageData;
}
