
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './config.ts';
import { createMercadoPagoPreference } from './mercado-pago-api.ts';
import { handleWebhook } from './webhook-handler.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  const url = new URL(req.url);
  
  try {
    // Handle webhook requests - webhooks don't need authentication
    if (url.searchParams.get("webhook") === "true") {
      return await handleWebhook(req);
    }
    
    // Handle checkout creation requests
    if (req.method === "POST") {
      const { planType, userId, successUrl, failureUrl } = await req.json();
      
      if (!planType || !userId) {
        throw new Error("Parâmetros inválidos: planType e userId são obrigatórios");
      }
      
      // Create payment preference in Mercado Pago
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
