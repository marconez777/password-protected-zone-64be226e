
// Este endpoint recebe uma solicitação com um userId e exclui o usuário do sistema
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

    // Primeiro, remove a entrada na tabela user_status
    const { error: statusError } = await supabaseAdmin
      .from('user_status')
      .delete()
      .eq('user_id', userId)

    if (statusError) {
      console.error('Erro ao excluir status do usuário:', statusError)
      // Continuamos mesmo com erro, pois o importante é excluir o usuário
    }

    // Exclui o usuário usando a API de administração
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      userId,
      true // hard delete = true
    )

    if (authError) {
      return new Response(
        JSON.stringify({ error: 'Erro ao excluir usuário', details: authError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Usuário excluído com sucesso' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
