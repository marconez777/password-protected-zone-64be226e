
// Este endpoint recebe uma solicitação com um userId e retorna os detalhes do usuário
import { createClient } from '@supabase/supabase-js'

// Configuração do cliente Supabase com a service role key
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  try {
    // Verifica se a solicitação é um POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Este endpoint só aceita solicitações POST' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Obtém o corpo da solicitação como JSON
    const { userId } = await req.json()

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID do usuário não fornecido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Obtém os detalhes do usuário usando a API de administração
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(
      userId
    )

    if (userError) {
      return new Response(
        JSON.stringify({ error: 'Erro ao obter detalhes do usuário', details: userError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Retorna apenas os dados relevantes do usuário
    return new Response(
      JSON.stringify({
        id: userData.user.id,
        email: userData.user.email,
        created_at: userData.user.created_at,
        user_metadata: userData.user.user_metadata
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
