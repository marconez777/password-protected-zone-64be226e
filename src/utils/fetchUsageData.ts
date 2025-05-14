
import { supabase } from '@/integrations/supabase/client';
import { Usage } from '@/types/usage';

/**
 * Fetches usage data for a user
 * @param userId The user's ID
 * @returns The usage data or null if not found
 */
export async function fetchUsageData(userId: string): Promise<Usage | null> {
  const { data: usageData, error: usageError } = await supabase
    .from("user_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (usageError) {
    if (usageError.code === 'PGRST116') {
      // PGRST116 means no data found - this is expected for new users
      console.log("Nenhum registro de uso encontrado para o usuário. Isto é normal para novos usuários.");
    } else {
      // Log other errors
      console.error("Erro ao carregar dados de uso:", usageError);
    }
    return null;
  }

  return usageData;
}
