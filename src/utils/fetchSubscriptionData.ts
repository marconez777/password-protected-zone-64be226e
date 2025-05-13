
import { supabase } from '@/integrations/supabase/client';
import { Subscription } from '@/types/usage';

/**
 * Fetches subscription data for a user
 * @param userId The user's ID
 * @returns The subscription data or null if not found
 */
export async function fetchSubscriptionData(userId: string): Promise<Subscription | null> {
  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (subscriptionError && subscriptionError.code !== 'PGRST116') {
    console.error("Erro ao carregar assinatura:", subscriptionError);
    return null;
  }

  return subscriptionData;
}
