
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface RequestBody {
  userId: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Criar cliente Supabase com service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    
    // Verificar se o usuário chamando a função está autenticado
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Não autenticado' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    // Processar o corpo da requisição
    const { userId } = await req.json() as RequestBody;
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID do usuário não fornecido' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    // Buscar detalhes do usuário usando Admin API
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: userError ? userError.message : 'Usuário não encontrado' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    // Retornar apenas os campos necessários
    return new Response(
      JSON.stringify({
        email: userData.user.email,
        created_at: userData.user.created_at
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
