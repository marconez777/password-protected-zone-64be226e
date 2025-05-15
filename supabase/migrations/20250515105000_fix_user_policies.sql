
-- Remova o trigger existente, se houver
DROP TRIGGER IF EXISTS init_user_status ON auth.users;

-- Recriar a função do trigger com tratamento de erros melhorado
CREATE OR REPLACE FUNCTION public.init_user_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Aprova automaticamente se for o admin
  IF NEW.email = 'contato@mkart.com.br' THEN
    INSERT INTO public.user_status (user_id, approved, is_admin)
    VALUES (NEW.id, true, true);
  ELSE
    INSERT INTO public.user_status (user_id, approved, is_admin)
    VALUES (NEW.id, false, false);
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log do erro para debugging
    RAISE LOG 'Erro ao criar user_status para %: %', NEW.id, SQLERRM;
    RETURN NEW; -- Continua o fluxo mesmo com erro para não bloquear o cadastro
END;
$$;

-- Recriar o trigger
CREATE TRIGGER init_user_status
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.init_user_status();

-- Remova a política anterior se já existir
DROP POLICY IF EXISTS "Allow insert for trigger" ON public.user_status;

-- Crie uma política de INSERT mais permissiva para o trigger
CREATE POLICY "Allow insert for trigger"
ON public.user_status
FOR INSERT
TO public
USING (true)
WITH CHECK (true);

-- Adicionar política para usuários visualizarem seus próprios status
CREATE POLICY IF NOT EXISTS "Users can view their own status"
ON public.user_status
FOR SELECT
USING (auth.uid() = user_id);

-- Adicionar política para admin visualizar todos os status
CREATE POLICY IF NOT EXISTS "Admins can view all status"
ON public.user_status
FOR SELECT
USING (
  (SELECT is_admin FROM public.user_status WHERE user_id = auth.uid()) = true
);

-- Adicionar política para admin atualizar status
CREATE POLICY IF NOT EXISTS "Admins can update status"
ON public.user_status
FOR UPDATE
USING (
  (SELECT is_admin FROM public.user_status WHERE user_id = auth.uid()) = true
)
WITH CHECK (
  (SELECT is_admin FROM public.user_status WHERE user_id = auth.uid()) = true
);
