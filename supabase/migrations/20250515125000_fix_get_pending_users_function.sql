
-- Drop a função existente para recriá-la com os ajustes necessários
DROP FUNCTION IF EXISTS public.get_pending_users();

-- Recriar a função com qualificadores completos para todas as referências de colunas
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
    WHERE public.user_status.user_id = auth.uid() AND public.user_status.is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem visualizar usuários pendentes';
  END IF;
  
  -- Retorna os usuários pendentes de aprovação COM QUALIFICADORES COMPLETOS
  RETURN QUERY
  SELECT 
    public.user_status.user_id AS user_id,
    public.user_status.approved AS approved,
    auth.users.email AS email,
    auth.users.raw_user_meta_data->>'nome' AS name,
    auth.users.created_at AS created_at
  FROM 
    public.user_status
  JOIN 
    auth.users ON public.user_status.user_id = auth.users.id
  WHERE 
    public.user_status.approved = false;
END;
$$;

-- Atualizar a função count_pending_users para também usar qualificadores completos
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
