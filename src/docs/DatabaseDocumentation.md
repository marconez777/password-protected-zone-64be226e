
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

#### `user_usage` (Mantida para estrutura apenas)
Estrutura para possível monitoramento de uso futuro.

| Coluna | Tipo | Descrição | Nullable | Default |
|--------|------|-----------|----------|---------|
| id | uuid | ID do registro de uso | Não | gen_random_uuid() |
| user_id | uuid | ID do usuário | Não | - |
| keyword_count | integer | Contagem de uso da ferramenta de palavras-chave | Não | 0 |
| market_research_count | integer | Contagem de uso da ferramenta de pesquisa de mercado | Não | 0 |
| search_funnel_count | integer | Contagem de uso da ferramenta de funil de busca | Não | 0 |
| seo_text_count | integer | Contagem de uso da ferramenta de texto SEO | Não | 0 |
| topic_research_count | integer | Contagem de uso da ferramenta de pesquisa de tópicos | Não | 0 |
| metadata_generation_count | integer | Contagem de uso da ferramenta de geração de meta dados | Não | 0 |
| created_at | timestamp with time zone | Data de criação | Não | now() |
| updated_at | timestamp with time zone | Data de atualização | Não | now() |

## 3. Relacionamentos entre Tabelas

- A tabela `user_results` possui uma relação com a tabela `auth.users` através do campo `user_id`.
- A tabela `profiles` possui uma relação com a tabela `auth.users` através do campo `id`.

## 4. Funções do Banco de Dados

### `user_has_exceeded_limit(resource_type text, target_user_id uuid DEFAULT NULL::uuid)`
Esta função está implementada mas não é mais utilizada ativamente no sistema.

### `increment_user_usage(resource_type text, target_user_id uuid DEFAULT NULL::uuid)`
Esta função está implementada mas não é mais utilizada ativamente no sistema.

## 5. Segurança e Row-Level Security (RLS)

O banco de dados utiliza policies de Row-Level Security para garantir que usuários só possam acessar seus próprios dados:

- Usuários só podem visualizar e manipular seus próprios registros em `user_results`
- Usuários só podem acessar seus próprios dados de perfil em `profiles`

## 6. Estrutura da Autenticação

A autenticação é gerenciada pelo Supabase através do esquema `auth`. Os usuários são armazenados na tabela `auth.users`, que não é diretamente acessível pela API pública, mas é utilizada para autenticação e autorização.

## 7. Manutenção e Backup

- O Supabase realiza backups automáticos do banco de dados
- Para modificações no esquema, é recomendado utilizar migrations SQL para manter o controle de versão
