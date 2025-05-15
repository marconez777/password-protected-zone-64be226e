
# Documentação do Banco de Dados MKRanker

## 1. Visão Geral do Banco de Dados

O MKRanker utiliza o PostgreSQL como sistema de banco de dados, gerenciado pelo Supabase. A estrutura foi projetada para armazenar dados de usuários, resultados de análises e histórico de uso dos recursos da plataforma.

## 2. Esquema do Banco de Dados

### Tabelas Principais

#### `profiles`
Armazena informações adicionais dos usuários.

| Coluna | Tipo | Descrição | Nullable | Default |
|--------|------|-----------|----------|---------|
| id | uuid | Identificador único do usuário | Não | - |
| email | text | Email do usuário | Sim | - |
| full_name | text | Nome completo do usuário | Sim | - |
| created_at | timestamp with time zone | Data de criação | Não | now() |
| updated_at | timestamp with time zone | Data de atualização | Não | now() |

#### `user_results`
Armazena todos os resultados gerados pelos usuários ao utilizar as ferramentas do sistema.

| Coluna | Tipo | Descrição | Nullable | Default |
|--------|------|-----------|----------|---------|
| id | uuid | Identificador único do resultado | Não | gen_random_uuid() |
| user_id | uuid | ID do usuário | Não | - |
| tipo_recurso | text | Tipo de recurso utilizado (ex: 'search_funnel', 'keyword') | Não | - |
| input_original | jsonb | Dados de entrada (formato JSON) | Não | - |
| output_gerado | jsonb | Resultado gerado (formato JSON) | Não | - |
| data_criacao | timestamp with time zone | Data de criação | Não | now() |

#### `user_status`
Armazena o status de aprovação e o nível de acesso dos usuários.

| Coluna | Tipo | Descrição | Nullable | Default |
|--------|------|-----------|----------|---------|
| user_id | uuid | ID do usuário | Não | - |
| approved | boolean | Status de aprovação | Não | false |
| is_admin | boolean | Indica se o usuário é administrador | Sim | false |

#### `subscriptions` (Mantida para estrutura apenas)
Estrutura para possível implementação de assinaturas futuras.

| Coluna | Tipo | Descrição | Nullable | Default |
|--------|------|-----------|----------|---------|
| id | uuid | ID da assinatura | Não | gen_random_uuid() |
| user_id | uuid | ID do usuário | Não | - |
| is_active | boolean | Status da assinatura | Não | false |
| plan_type | plan_type | Tipo de plano | Não | 'solo' |
| current_period_start | timestamp with time zone | Início do período atual | Sim | now() |
| current_period_end | timestamp with time zone | Término do período atual | Sim | - |
| created_at | timestamp with time zone | Data de criação | Não | now() |
| updated_at | timestamp with time zone | Data de atualização | Não | now() |

## 3. Relacionamentos entre Tabelas

- A tabela `user_results` possui uma relação com a tabela `auth.users` através do campo `user_id`.
- A tabela `profiles` possui uma relação com a tabela `auth.users` através do campo `id`.
- A tabela `user_status` possui uma relação com a tabela `auth.users` através do campo `user_id`.

## 4. Funções do Banco de Dados

### `get_pending_users()`
Esta função retorna os usuários pendentes de aprovação, utilizando aliases para evitar ambiguidade nas colunas.

### `count_pending_users()`
Esta função retorna a contagem de usuários pendentes de aprovação.

### `is_admin_user()`
Esta função verifica se o usuário atual é administrador.

## 5. Segurança e Row-Level Security (RLS)

O banco de dados utiliza policies de Row-Level Security para garantir que usuários só possam acessar seus próprios dados:

- Usuários só podem visualizar e manipular seus próprios registros em `user_results`
- Usuários só podem acessar seus próprios dados de perfil em `profiles`
- Administradores podem visualizar e gerenciar o status de todos os usuários

## 6. Estrutura da Autenticação

A autenticação é gerenciada pelo Supabase através do esquema `auth`. Os usuários são armazenados na tabela `auth.users`, que não é diretamente acessível pela API pública, mas é utilizada para autenticação e autorização.

## 7. Manutenção e Backup

- O Supabase realiza backups automáticos do banco de dados
- Para modificações no esquema, é recomendado utilizar migrations SQL para manter o controle de versão
