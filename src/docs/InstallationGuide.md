
# Guia de Instalação e Configuração do MKRanker

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Supabase para o backend

## 1. Configuração do Ambiente de Desenvolvimento

### Clone o Repositório

```bash
git clone <url-do-repositorio>
cd mkranker
```

### Instale as Dependências

```bash
npm install
# ou
yarn install
```

### Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.io)
2. Obtenha as credenciais de acesso (URL e chave anônima)
3. Configure os webhooks e funções necessárias

### Configuração do Ambiente Local

Crie um arquivo `.env.local` na raiz do projeto:

```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 2. Estrutura SQL do Banco de Dados

Execute os seguintes comandos SQL no Editor SQL do seu projeto Supabase:

```sql
-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ativar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política RLS para perfis
CREATE POLICY "Usuários podem visualizar apenas seu próprio perfil" 
ON public.profiles FOR ALL 
USING (auth.uid() = id);

-- Tabela para armazenar resultados de consultas
CREATE TABLE IF NOT EXISTS public.user_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tipo_recurso TEXT NOT NULL,
  input_original JSONB NOT NULL,
  output_gerado JSONB NOT NULL,
  data_criacao TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ativar RLS na tabela user_results
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

-- Política RLS para resultados
CREATE POLICY "Usuários podem visualizar apenas seus próprios resultados" 
ON public.user_results FOR ALL 
USING (auth.uid() = user_id);

-- Trigger para criar perfil automaticamente ao registrar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 3. Iniciando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (ou a porta especificada pelo Vite).

## 4. Construção para Produção

```bash
npm run build
# ou
yarn build
```

Os arquivos de build serão criados no diretório `dist/`.

## 5. Webhooks e Integrações

O MKRanker utiliza webhooks do n8n para processamento de conteúdo. Configure os webhooks no n8n com os seguintes endpoints:

- Funil de Busca: https://mkseo77.app.n8n.cloud/webhook/funildebusca
- Palavras-chave: [Endpoint configurado no n8n]
- Mercado e Público-Alvo: https://mkseo77.app.n8n.cloud/webhook/pesquisa-mercado
- Texto SEO LP: https://mkseo77.app.n8n.cloud/webhook/texto-lp
- Texto SEO Produto: https://mkseo77.app.n8n.cloud/webhook/texto-produto
- Texto SEO Blog: https://mkseo77.app.n8n.cloud/webhook/post
- Pautas Blog: https://mkseo77.app.n8n.cloud/webhook/pautas-blog
- Meta Dados: https://mkseo77.app.n8n.cloud/webhook/metadados

## 6. Customização

Para customizar a aplicação:

- Modifique os componentes de UI em `src/components`
- Adicione novas páginas em `src/pages`
- Ajuste os estilos usando Tailwind CSS modificando `tailwind.config.js`
