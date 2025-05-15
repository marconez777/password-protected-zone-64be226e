
-- Criar uma função para buscar usuários pendentes com segurança
-- Esta função retorna apenas os dados que precisamos, sem expor informações sensíveis
CREATE OR REPLACE FUNCTION public.get_pending_users()
RETURNS TABLE (
  user_id uuid,
  approved boolean,
  email text,
  name text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verifica se o usuário atual é um administrador
  IF NOT EXISTS (
    SELECT 1 FROM public.user_status 
    WHERE user_id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem visualizar usuários pendentes';
  END IF;
  
  -- Retorna os usuários pendentes de aprovação
  RETURN QUERY
  SELECT 
    us.user_id,
    us.approved,
    au.email,
    au.raw_user_meta_data->>'nome' as name,
    au.created_at
  FROM 
    public.user_status us
  JOIN 
    auth.users au ON us.user_id = au.id
  WHERE 
    us.approved = false;
END;
$$;
