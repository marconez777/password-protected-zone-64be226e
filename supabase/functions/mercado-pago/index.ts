import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/crypto/hmac.ts";

// Configuração dos headers CORS para a função
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// URL de retorno após pagamento bem-sucedido
const SUCCESS_URL = "https://mkranker.com/payment-success";
// URL de retorno em caso de cancelamento ou falha
const FAILURE_URL = "https://mkranker.com/subscribe";

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MERCADO-PAGO] ${step}${detailsStr}`);
};

// Função de verificação de assinatura para webhooks do Mercado Pago
const verifyWebhookSignature = (requestBody: string, signature: string | null, secret: string): boolean => {
  if (!signature) return false;
  
  try {
    // Create HMAC using the secret
    const hmac = createHmac("sha256", secret);
    hmac.update(requestBody);
    const computedSignature = hmac.toString();
    
    // Compare with received signature
    return computedSignature === signature;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return false;
  }
};

// Função para registrar eventos de segurança
const logSecurityEvent = async (
  supabaseAdmin: any, 
  userId: string, 
  actionType: string, 
  status: string, 
  details: string
) => {
  try {
    await supabaseAdmin.rpc('log_security_event', {
      p_user_id: userId,
      p_action_type: actionType,
      p_ip_address: 'server-side',
      p_device_info: 'Mercado Pago Edge Function',
      p_status: status,
      p_details: details
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

serve(async (req) => {
  // Lidando com requisições OPTIONS (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();
    
    logStep(`Request received for path: ${path}`, { method: req.method });

    // Inicializa o cliente Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Inicializa o cliente Supabase com role de serviço para operações de admin
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Webhook handler - verificação adicional de assinatura
    if (req.method === "POST" && path === "webhook") {
      const requestBody = await req.text();
      const webhookSignature = req.headers.get("mercadopago-signature");
      const webhookSecret = Deno.env.get("MERCADO_PAGO_WEBHOOK_SECRET") ?? "";
      
      // Verificação de assinatura
      const isSignatureValid = verifyWebhookSignature(requestBody, webhookSignature, webhookSecret);
      
      if (!isSignatureValid) {
        logStep("Invalid webhook signature", { signature: webhookSignature });
        
        // Log security event for invalid signature
        await supabaseAdmin.rpc('log_security_event', {
          p_user_id: 'system',
          p_action_type: 'payment',
          p_ip_address: req.headers.get("X-Forwarded-For") || 'unknown',
          p_device_info: req.headers.get("User-Agent") || 'unknown',
          p_status: 'blocked',
          p_details: 'Invalid Mercado Pago webhook signature'
        });
        
        // Return 401 but with 200 status to prevent retries
        return new Response(JSON.stringify({ status: "invalid_signature" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      // Parse the body JSON after signature verification
      const requestData = JSON.parse(requestBody);
      logStep("Webhook signature verified successfully", requestData);
      
      // Verificamos se é uma notificação de pagamento
      if (requestData.type === "payment" && requestData.data && requestData.data.id) {
        const paymentId = requestData.data.id;
        const mpAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");

        // Obter detalhes do pagamento do Mercado Pago
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${mpAccessToken}`,
          },
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentResponse.ok && paymentData) {
          const externalReference = paymentData.external_reference; // ID do usuário
          const status = paymentData.status; // 'approved', 'pending', 'rejected', etc.
          
          logStep("Payment details retrieved", { status, userId: externalReference });
          
          // Atualizar a transação no banco de dados
          const { error: updateTxError } = await supabaseAdmin
            .from("payment_transactions")
            .update({ 
              status: status,
              updated_at: new Date().toISOString()
            })
            .eq("payment_id", paymentId);
          
          if (updateTxError) {
            console.error("Erro ao atualizar transação:", updateTxError);
          }
          
          // Se o pagamento foi aprovado, ativamos a assinatura
          if (status === "approved") {
            logStep("Payment approved, updating subscription");
            
            // Calcular data de fim do período (30 dias)
            const currentDate = new Date();
            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() + 30);
            
            // Atualizar ou criar assinatura
            const { error: subError } = await supabaseAdmin
              .from("subscriptions")
              .upsert({
                user_id: externalReference,
                is_active: true,
                plan_type: "solo",
                current_period_start: currentDate.toISOString(),
                current_period_end: endDate.toISOString(),
                updated_at: currentDate.toISOString()
              }, {
                onConflict: 'user_id'
              });
              
            if (subError) {
              console.error("Erro ao atualizar assinatura:", subError);
            }
            
            // Resetar o contador de uso global
            const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(externalReference);
            
            if (userError) {
              console.error("Erro ao obter dados do usuário:", userError);
            } else if (userData.user?.email) {
              logStep("Resetting usage counter", { email: userData.user.email });
              await supabaseAdmin.rpc("admin_reset_user_usage", {
                user_email: userData.user.email,
                reset_all: true
              });
              logStep("Usage counter reset successful");
            }
          }
        } else {
          console.error("Erro ao obter detalhes do pagamento:", paymentData);
        }
      }
      
      // Sempre retornar 200 para o Mercado Pago
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Verifica a sessão do usuário para obter o ID
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError) {
      logStep("Session Error", { error: sessionError.message });
      return new Response(
        JSON.stringify({ error: "Erro ao obter sessão: " + sessionError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!session) {
      logStep("User not authenticated");
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;
    logStep("User authenticated", { userId, userEmail });

    // Endpoint para criar um link de pagamento
    if (req.method === "POST" && path === "create-payment") {
      logStep("Creating payment link");
      // Obtém o token de acesso do Mercado Pago
      const mpAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
      if (!mpAccessToken) {
        return new Response(
          JSON.stringify({ error: "Configuração de Mercado Pago não encontrada" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Verificar tentativas de pagamento recentes para prevenir fraude
      const { data: recentAttempts, error: attemptsError } = await supabaseAdmin
        .from("payment_transactions")
        .select("created_at")
        .eq("user_id", userId)
        .eq("status", "pending")
        .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Últimos 5 minutos
        .order("created_at", { ascending: false });
      
      if (attemptsError) {
        logStep("Error checking recent payment attempts", { error: attemptsError.message });
      } else if (recentAttempts && recentAttempts.length >= 3) {
        // Log too many attempts as potential fraud
        await logSecurityEvent(
          supabaseAdmin,
          userId,
          'payment',
          'blocked',
          'Too many payment attempts in a short period'
        );
        
        return new Response(
          JSON.stringify({ error: "Muitas tentativas de pagamento. Por favor, aguarde alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Determinar se é uma renovação baseado na assinatura atual
      const { data: subscription } = await supabaseClient
        .from("subscriptions")
        .select("is_active, current_period_end")
        .eq("user_id", userId)
        .single();
      
      const isRenewal = subscription?.is_active || false;
      logStep("Subscription check", { isRenewal, subscription });
      
      // Gerar ID único para esta transação para rastreamento
      const transactionId = crypto.randomUUID();

      // Criando objeto de preferência de pagamento com ID de transação
      const preference = {
        items: [
          {
            title: isRenewal ? "Renovação MKRanker - Plano Mensal" : "Assinatura MKRanker - Plano Mensal",
            unit_price: 97.00,
            quantity: 1,
            currency_id: "BRL",
            description: isRenewal ? "Renovação de assinatura com reset de limite de uso" : "Nova assinatura com 80 requisições"
          },
        ],
        back_urls: {
          success: SUCCESS_URL,
          failure: FAILURE_URL,
          pending: SUCCESS_URL,
        },
        auto_return: "approved",
        external_reference: `${userId}|${transactionId}`, // Format: userId|transactionId for tracking
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago/webhook`,
        // Adicionar metadados para verificação
        metadata: {
          user_id: userId,
          transaction_id: transactionId,
          timestamp: new Date().toISOString()
        }
      };

      // Fazendo a requisição para o Mercado Pago
      const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mpAccessToken}`,
        },
        body: JSON.stringify(preference),
      });

      const mpData = await mpResponse.json();

      if (!mpResponse.ok) {
        console.error("Erro ao criar link de pagamento:", mpData);
        
        // Log failed payment attempt
        await logSecurityEvent(
          supabaseAdmin,
          userId,
          'payment',
          'error',
          `Failed to create payment link: ${JSON.stringify(mpData)}`
        );
        
        return new Response(
          JSON.stringify({ error: "Erro ao criar link de pagamento" }),
          { status: mpResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Registrar transação pendente no banco de dados com ID de rastreamento
      const { error: dbError } = await supabaseClient.from("payment_transactions").insert({
        user_id: userId,
        amount: 97.00,
        status: "pending",
        payment_id: mpData.id,
        payment_method: "mercado_pago",
        transaction_id: transactionId
      });

      if (dbError) {
        console.error("Erro ao registrar transação:", dbError);
        
        // Log database error
        await logSecurityEvent(
          supabaseAdmin,
          userId,
          'system',
          'error',
          `Failed to record transaction: ${dbError.message}`
        );
      } else {
        // Log successful payment initiation
        await logSecurityEvent(
          supabaseAdmin,
          userId,
          'payment',
          'success',
          `Payment link created successfully: ${mpData.id}`
        );
      }

      logStep("Payment link created", { preferenceId: mpData.id, url: mpData.init_point, transactionId });
      return new Response(
        JSON.stringify({ 
          payment_url: mpData.init_point,
          preference_id: mpData.id,
          is_renewal: isRenewal,
          transaction_id: transactionId
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Endpoint para processar webhooks do Mercado Pago
    else if (req.method === "POST" && path === "webhook") {
      // Parse do corpo da requisição
      const requestData = await req.json();
      logStep("Webhook received", requestData);

      // Verificamos se é uma notificação de pagamento
      if (requestData.type === "payment" && requestData.data && requestData.data.id) {
        const paymentId = requestData.data.id;
        const mpAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");

        // Obter detalhes do pagamento do Mercado Pago
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${mpAccessToken}`,
          },
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentResponse.ok && paymentData) {
          const externalReference = paymentData.external_reference; // ID do usuário
          const status = paymentData.status; // 'approved', 'pending', 'rejected', etc.
          
          logStep("Payment details retrieved", { status, userId: externalReference });
          
          // Atualizar a transação no banco de dados
          const { error: updateTxError } = await supabaseAdmin
            .from("payment_transactions")
            .update({ 
              status: status,
              updated_at: new Date().toISOString()
            })
            .eq("payment_id", paymentId);
          
          if (updateTxError) {
            console.error("Erro ao atualizar transação:", updateTxError);
          }
          
          // Se o pagamento foi aprovado, ativamos a assinatura
          if (status === "approved") {
            logStep("Payment approved, updating subscription");
            
            // Calcular data de fim do período (30 dias)
            const currentDate = new Date();
            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() + 30);
            
            // Atualizar ou criar assinatura
            const { error: subError } = await supabaseAdmin
              .from("subscriptions")
              .upsert({
                user_id: externalReference,
                is_active: true,
                plan_type: "solo",
                current_period_start: currentDate.toISOString(),
                current_period_end: endDate.toISOString(),
                updated_at: currentDate.toISOString()
              }, {
                onConflict: 'user_id'
              });
              
            if (subError) {
              console.error("Erro ao atualizar assinatura:", subError);
            }
            
            // Resetar o contador de uso global
            const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(externalReference);
            
            if (userError) {
              console.error("Erro ao obter dados do usuário:", userError);
            } else if (userData.user?.email) {
              logStep("Resetting usage counter", { email: userData.user.email });
              await supabaseAdmin.rpc("admin_reset_user_usage", {
                user_email: userData.user.email,
                reset_all: true
              });
              logStep("Usage counter reset successful");
            }
          }
        } else {
          console.error("Erro ao obter detalhes do pagamento:", paymentData);
        }
      }
      
      // Sempre retornar 200 para o Mercado Pago
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Endpoint para verificar status de assinatura com segurança adicional
    else if (req.method === "GET" && path === "subscription-status") {
      logStep("Checking subscription status");
      
      // Verifica uso suspeito
      const { data: suspiciousActivity } = await supabaseAdmin.rpc('detect_suspicious_activity', {
        user_id_param: userId
      });
      
      if (suspiciousActivity && suspiciousActivity.suspicious) {
        logStep("Suspicious activity detected", suspiciousActivity);
        
        // Log the suspicious activity
        await logSecurityEvent(
          supabaseAdmin,
          userId,
          'usage',
          'warning',
          `Suspicious activity detected: ${suspiciousActivity.reason || 'Multiple accesses'}`
        );
      }
      
      // Continue with normal subscription check
      const { data: subscription, error: subError } = await supabaseClient
        .from("subscriptions")
        .select("is_active, current_period_end, plan_type")
        .eq("user_id", userId)
        .single();
        
      if (subError) {
        logStep("No subscription found", { error: subError.message });
        return new Response(
          JSON.stringify({ active: false, message: "Sem assinatura ativa" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Verificar uso atual
      const { data: usage, error: usageError } = await supabaseClient
        .from("user_usage")
        .select("total_usage")
        .eq("user_id", userId)
        .single();
        
      const usageCount = usage ? usage.total_usage : 0;
      const remainingUses = Math.max(0, 80 - usageCount);
      
      logStep("Subscription status checked", { 
        active: subscription?.is_active, 
        endsAt: subscription?.current_period_end,
        usageCount,
        remainingUses
      });
      
      return new Response(
        JSON.stringify({
          active: subscription?.is_active || false,
          endsAt: subscription?.current_period_end,
          planType: subscription?.plan_type,
          usage: usageCount,
          remainingUses,
          limit: 80
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    
    return new Response(
      JSON.stringify({ error: "Endpoint não encontrado" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro na função Edge:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
