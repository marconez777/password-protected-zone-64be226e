
-- Drop a função existente para recriá-la com os ajustes necessários
DROP FUNCTION IF EXISTS public.get_pending_users();

-- Recriar a função com aliases explícitos para todas as colunas, especialmente user_id
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
    WHERE user_status.user_id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem visualizar usuários pendentes';
  END IF;
  
  -- Retorna os usuários pendentes de aprovação COM ALIASES EXPLÍCITOS para todas as colunas
  RETURN QUERY
  SELECT 
    us.user_id AS user_id,
    us.approved AS approved,
    au.email AS email,
    au.raw_user_meta_data->>'nome' AS name,
    au.created_at AS created_at
  FROM 
    public.user_status us
  JOIN 
    auth.users au ON us.user_id = au.id
  WHERE 
    us.approved = false;
END;
$$;

-- Atualizar a função count_pending_users para também usar referências explícitas
DROP FUNCTION IF EXISTS public.count_pending_users();

CREATE OR REPLACE FUNCTION public.count_pending_users()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  pending_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO pending_count
  FROM public.user_status
  WHERE public.user_status.approved = false;
  
  RETURN pending_count;
END;
$$;
