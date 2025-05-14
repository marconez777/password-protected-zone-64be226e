
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Permite acesso de qualquer origem
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req: Request) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create a Supabase client with the Auth context of the logged in user
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const authHeader = req.headers.get('Authorization')!;
  
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Não autorizado: Cabeçalho de autorização ausente' }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error(userError?.message || 'Usuário não autenticado');
    }

    // Get user's subscription
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (subError) {
      console.error('Error fetching subscription:', subError);
      throw new Error(`Error fetching subscription: ${subError.message}`);
    }

    // Check if subscription is active
    const isActive = !!subscriptions && new Date(subscriptions.current_period_end) > new Date();
    
    // Get user's usage
    const { data: usageData, error: usageError } = await supabase
      .from('user_usage')
      .select('total_usage')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (usageError) {
      console.error('Error fetching usage:', usageError);
      throw new Error(`Error fetching usage: ${usageError.message}`);
    }
    
    const usage = usageData?.total_usage || 0;
    const limit = 80; // Fixed limit
    const remainingUses = Math.max(0, limit - usage);
    
    return new Response(
      JSON.stringify({
        active: isActive,
        endsAt: isActive ? subscriptions.current_period_end : null,
        planType: isActive ? subscriptions.plan_type : null,
        usage,
        remainingUses,
        limit,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error in subscription-status function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
