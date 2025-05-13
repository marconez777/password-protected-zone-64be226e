
import { corsHeaders, durationMap } from './config.ts';
import { fetchPaymentDetails } from './mercado-pago-api.ts';
import { updateUserSubscription } from './db.ts';

/**
 * Processes webhook notifications from Mercado Pago
 */
export async function handleWebhook(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const topic = url.searchParams.get("topic");
  
  console.log(`Recebido webhook: ${topic}, ID: ${id}`);
  
  if (topic !== "merchant_order") {
    console.log(`Ignorando webhook do tipo: ${topic}`);
    return new Response(JSON.stringify({ message: "Webhook recebido, mas tipo ignorado" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
  
  try {
    // Obter detalhes do pagamento
    const paymentData = await fetchPaymentDetails(id as string);
    
    // Verificar se o pagamento foi aprovado
    if (paymentData.order_status === "paid") {
      const externalReference = JSON.parse(paymentData.external_reference);
      const { userId, planType, duration } = externalReference;
      
      // Calcular a data de término do período
      const durationDays = durationMap[duration] || 30;
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + durationDays);
      
      // Atualizar a assinatura do usuário no banco de dados
      const result = await updateUserSubscription(userId, planType, endDate);
      
      if (!result.success) {
        throw new Error(`Erro ao atualizar assinatura: ${JSON.stringify(result.error)}`);
      }
      
      console.log(`Assinatura ativada para o usuário ${userId}, plano ${planType}, válido até ${endDate.toISOString()}`);
    } else {
      console.log(`Pagamento não aprovado. Status: ${paymentData.order_status}`);
    }
    
    return new Response(JSON.stringify({ message: "Webhook processado com sucesso" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
}
