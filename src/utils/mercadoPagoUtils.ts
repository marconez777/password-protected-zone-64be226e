
import { supabaseClient } from '@/integrations/supabase/client';

export async function createMercadoPagoCheckout(planType: string, userId: string, successUrl?: string, failureUrl?: string) {
  try {
    const { data, error } = await supabaseClient.functions.invoke('mercado-pago', {
      body: {
        planType,
        userId,
        successUrl,
        failureUrl
      }
    });

    if (error) {
      console.error("Erro ao criar checkout:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    throw error;
  }
}
