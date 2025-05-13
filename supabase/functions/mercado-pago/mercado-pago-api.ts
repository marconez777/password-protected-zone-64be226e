
import { PLAN_CONFIG } from './config.ts';

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN") ?? "";

/**
 * Creates a new Mercado Pago payment preference
 */
export async function createMercadoPagoPreference(
  planType: string, 
  userId: string, 
  successUrl: string, 
  failureUrl: string
) {
  const planConfig = PLAN_CONFIG[planType as keyof typeof PLAN_CONFIG];
  
  if (!planConfig) {
    throw new Error(`Plano não encontrado: ${planType}`);
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: `plan-${planType}`,
          title: planConfig.name,
          description: planConfig.description,
          quantity: 1,
          unit_price: planConfig.unit_price,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: successUrl,
        failure: failureUrl,
      },
      auto_return: "approved",
      external_reference: JSON.stringify({
        userId,
        planType,
        duration: planConfig.duration,
      }),
      notification_url: `${SUPABASE_URL}/functions/v1/mercado-pago?webhook=true`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao criar preferência: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

/**
 * Fetches payment details from Mercado Pago
 */
export async function fetchPaymentDetails(paymentId: string) {
  const paymentResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
    },
  });
  
  if (!paymentResponse.ok) {
    throw new Error(`Erro ao obter detalhes do pagamento: ${await paymentResponse.text()}`);
  }
  
  return await paymentResponse.json();
}

// Ensure SUPABASE_URL is defined for notification URL
const SUPABASE_URL = "https://buizhanvxiykyapyndsh.supabase.co";
