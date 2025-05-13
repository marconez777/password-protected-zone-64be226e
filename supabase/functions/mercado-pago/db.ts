
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const SUPABASE_URL = "https://buizhanvxiykyapyndsh.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Updates user subscription in the database
 */
export async function updateUserSubscription(
  userId: string, 
  planType: string, 
  endDate: Date
): Promise<{ success: boolean, error?: any }> {
  const { error } = await supabase
    .from("subscriptions")
    .upsert({
      user_id: userId,
      plan_type: planType,
      is_active: true,
      current_period_end: endDate.toISOString(),
    }, { onConflict: "user_id" });
    
  if (error) {
    console.error(`Erro ao atualizar assinatura: ${JSON.stringify(error)}`);
    return { success: false, error };
  }
  
  return { success: true };
}
