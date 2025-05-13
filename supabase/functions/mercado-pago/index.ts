import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = "https://buizhanvxiykyapyndsh.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Configurações dos planos
const PLAN_CONFIG = {
  solo: {
    name: 'Plano Solo',
    description: 'Plano para profissionais individuais',
    unit_price: 47.0,
    duration: '1 month',
  },
  discovery: {
    name: 'Plano Discovery',
    description: 'Plano para pequenas empresas',
    unit_price: 97.0,
    duration: '1 month',
  },
  escala: {
    name: 'Plano Escala',
    description: 'Plano para empresas em crescimento',
    unit_price: 197.0,
    duration: '1 month',
  }
};

async function createMercadoPagoPreference(planType: string, userId: string, successUrl: string, failureUrl: string) {
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

async function handleWebhook(req: Request) {
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
    const paymentResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${id}`, {
      headers: {
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    });
    
    if (!paymentResponse.ok) {
      throw new Error(`Erro ao obter detalhes do pagamento: ${await paymentResponse.text()}`);
    }
    
    const paymentData = await paymentResponse.json();
    
    // Verificar se o pagamento foi aprovado
    if (paymentData.order_status === "paid") {
      const externalReference = JSON.parse(paymentData.external_reference);
      const { userId, planType, duration } = externalReference;
      
      // Calcular a data de término do período
      const durationMap: Record<string, number> = {
        "1 month": 30,
        "1 year": 365,
      };
      
      const durationDays = durationMap[duration] || 30;
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + durationDays);
      
      // Atualizar a assinatura do usuário no banco de dados
      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: userId,
          plan_type: planType,
          is_active: true,
          current_period_end: endDate.toISOString(),
        }, { onConflict: "user_id" });
      
      if (error) {
        throw new Error(`Erro ao atualizar assinatura: ${JSON.stringify(error)}`);
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

serve(async (req) => {
  // Lidar com CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  const url = new URL(req.url);
  
  try {
    // Verificar se é uma solicitação de webhook
    if (url.searchParams.get("webhook") === "true") {
      return await handleWebhook(req);
    }
    
    // Se não for webhook, é uma solicitação para criar um checkout
    if (req.method === "POST") {
      const { planType, userId, successUrl, failureUrl } = await req.json();
      
      if (!planType || !userId) {
        throw new Error("Parâmetros inválidos: planType e userId são obrigatórios");
      }
      
      // Criar uma preferência de pagamento no Mercado Pago
      const preferenceData = await createMercadoPagoPreference(
        planType, 
        userId, 
        successUrl || `${url.origin}/dashboard`, 
        failureUrl || `${url.origin}/subscribe?error=payment_failed`
      );
      
      return new Response(JSON.stringify(preferenceData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    return new Response(JSON.stringify({ error: "Método não suportado" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
