
# MKRanker - Documentação Completa do Sistema

## 1. Visão Geral

MKRanker é uma plataforma de análise e otimização SEO que oferece diversas ferramentas para profissionais de marketing digital. A aplicação permite realizar análises de palavras-chave, funil de busca, pesquisa de mercado, e geração de conteúdo otimizado para SEO.

## 2. Arquitetura do Sistema

### 2.1 Frontend
- **Framework**: React com TypeScript
- **Estilização**: Tailwind CSS e componentes Shadcn UI
- **Roteamento**: React Router para navegação entre páginas
- **Gerenciamento de Formulários**: React Hook Form com validação Zod
- **Estado Global**: Hooks contextuais (useAuth para autenticação)
- **Requisições HTTP**: Integração direta com Supabase para operações de banco de dados
- **Formatação de Conteúdo**: Suporte para conteúdo Markdown

### 2.2 Backend
- **Infraestrutura**: Supabase
- **Autenticação**: Sistema de autenticação do Supabase
- **Banco de Dados**: PostgreSQL gerenciado pelo Supabase
- **Integrações**: APIs externas para processamento de conteúdo via webhooks (n8n)
- **Segurança**: Row Level Security (RLS) para controle de acesso aos dados

## 3. Estrutura de Arquivos

```
src/
├── components/         # Componentes reutilizáveis
│   ├── dashboard/      # Componentes do dashboard
│   ├── keyword/        # Componentes de palavras-chave
│   ├── market-target/  # Componentes de mercado e público-alvo
│   ├── meta-dados/     # Componentes de meta dados
│   ├── pautas-blog/    # Componentes de pautas para blog
│   ├── search-funnel/  # Componentes de funil de busca
│   ├── shared/         # Componentes compartilhados
│   ├── texto-seo-*/    # Componentes para textos SEO
│   └── ui/             # Componentes de interface (Shadcn UI)
├── docs/               # Documentação do sistema
├── hooks/              # Hooks personalizados
├── integrations/       # Integrações com serviços externos
│   └── supabase/       # Cliente Supabase e tipos
├── lib/                # Utilitários e funções auxiliares
├── pages/              # Páginas da aplicação
└── types/              # Definições de tipos TypeScript
```

## 4. Páginas Principais

1. **Login/Registro**: Autenticação de usuários
2. **Dashboard**: Painel principal com acesso às ferramentas
3. **Palavras-chave**: Análise e geração de palavras-chave relacionadas
4. **Funil de Busca**: Análise de funil de busca para SEO
5. **Mercado e Público-Alvo**: Análise de mercado e identificação de público-alvo
6. **Texto SEO**: Geração de conteúdo para landing pages, produtos e blog
7. **Pautas Blog**: Geração de ideias para pautas de blog
8. **Meta Dados**: Geração de meta tags otimizadas para SEO

## 5. Fluxo de Autenticação

O sistema implementa autenticação completa via Supabase:
1. Login com email/senha
2. Registro de novos usuários
3. Redirecionamento para rotas protegidas
4. Gerenciamento de sessão com recuperação automática

### 5.1 Componentes de Autenticação

- `useAuth`: Hook para gerenciar estado de autenticação
- `ProtectedRoute`: Componente para proteger rotas que exigem autenticação

## 6. Banco de Dados

### 6.1 Tabelas Principais

#### `profiles`
Armazena informações adicionais dos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único do usuário |
| email | text | Email do usuário |
| full_name | text | Nome completo do usuário |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

#### `user_results`
Armazena todos os resultados gerados pelos usuários ao utilizar as ferramentas do sistema.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único do resultado |
| user_id | uuid | ID do usuário |
| tipo_recurso | text | Tipo de recurso (ex: 'keyword', 'search_funnel') |
| input_original | jsonb | Dados de entrada em formato JSON |
| output_gerado | jsonb | Resultado gerado em formato JSON |
| data_criacao | timestamp | Data de criação |

#### `security_events`
Registra eventos de segurança para auditoria.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único do evento |
| user_id | uuid | ID do usuário |
| action_type | text | Tipo de ação ('usage', 'auth', 'system') |
| ip_address | text | Endereço IP |
| device_info | text | Informação do dispositivo |
| status | text | Status do evento |
| details | text | Detalhes do evento |
| created_at | timestamp | Data de criação |

### 6.2 Políticas de Segurança (RLS)

O sistema implementa Row Level Security (RLS) para garantir que usuários só possam acessar seus próprios dados:

1. **Tabela user_results**:
   - Usuários podem visualizar, criar, atualizar e excluir apenas seus próprios resultados

2. **Tabela security_events**:
   - Usuários podem inserir eventos de segurança relacionados a eles mesmos
   - Usuários podem visualizar apenas seus próprios eventos de segurança
   - Apenas a função de serviço pode atualizar ou excluir eventos

### 6.3 Funções do Banco de Dados

Algumas funções importantes ainda estão implementadas no banco de dados mas não são ativamente utilizadas:

- `user_has_exceeded_limit`: Verifica se um usuário excedeu o limite para um tipo específico de recurso
- `increment_user_usage`: Incrementa o contador de uso para um tipo de recurso

## 7. Integrações Externas

### 7.1 Webhooks

O sistema se integra com webhooks n8n para processamento de conteúdo:

| Recurso | Webhook URL |
|---------|-------------|
| Palavras-chave | `https://mkseo77.app.n8n.cloud/webhook/palavra-chave` |
| Funil de Busca | `https://mkseo77.app.n8n.cloud/webhook/funildebusca` |
| Mercado e Público-Alvo | `https://mkseo77.app.n8n.cloud/webhook/pesquisa-mercado` |
| Texto SEO LP | `https://mkseo77.app.n8n.cloud/webhook/texto-lp` |
| Texto SEO Blog | `https://mkseo77.app.n8n.cloud/webhook/post` |
| Texto SEO Produto | `https://mkseo77.app.n8n.cloud/webhook/texto-produto` |
| Pautas Blog | `https://mkseo77.app.n8n.cloud/webhook/pautas-blog` |
| Meta Dados | `https://mkseo77.app.n8n.cloud/webhook/metadados` |

## 8. Fluxo de Processamento de Recursos

1. O usuário preenche um formulário para usar um recurso (ex: gerar meta dados)
2. O formulário é validado usando Zod
3. Os dados são enviados para um webhook externo (n8n)
4. O resultado é processado e exibido na interface
5. Os dados originais e o resultado são salvos no banco de dados para histórico

### 8.1 Hooks Personalizados

- `useAuth`: Gerenciamento do estado de autenticação
- `useWebhookSubmission`: Envio de dados para webhooks externos
- `useSupabaseClient`: Acesso facilitado ao cliente Supabase
- `useSecurityCheck`: Verificação de segurança e registro de eventos

## 9. Componentes Principais

### 9.1 Componentes de Formulários

Cada recurso do sistema possui uma estrutura de componentes semelhante:

- `[Recurso]Form`: Componente de formulário principal
- `[Recurso]FormInputs`: Campos específicos do formulário
- `[Recurso]Schema`: Validação do formulário usando Zod
- `[Recurso]Result`: Exibição do resultado gerado
- `[Recurso]History`: Histórico de resultados anteriores

### 9.2 Componentes Compartilhados

- `ResourceForm`: Base para formulários de recursos
- `ResourceResultDisplay`: Exibição padronizada de resultados
- `ResourceHistoryDisplay`: Exibição padronizada de histórico
- `DashboardLayout`: Layout compartilhado para páginas autenticadas

## 10. Segurança

### 10.1 Autenticação

- Login com email/senha
- Proteção de rotas que exigem autenticação
- Redirecionamento automático para login quando necessário

### 10.2 Proteção de Dados

- Row Level Security (RLS) para garantir que usuários só acessem seus próprios dados
- Auditoria de eventos de segurança
- Validação de input em formulários

## 11. Considerações para Manutenção

- Para adicionar um novo recurso, siga a estrutura existente de componentes (Form, Result, History)
- Mantenha a consistência nas políticas de segurança ao adicionar novas tabelas
- Mantenha a estrutura de componentes pequena e focada para facilitar a manutenção
- Use os hooks existentes como `useWebhookSubmission` para integrar novos recursos

## 12. Glossário de Termos

- **SEO**: Search Engine Optimization (Otimização para Motores de Busca)
- **Palavra-chave**: Termo de busca alvo para otimização
- **Funil de Busca**: Análise da jornada do usuário em motores de busca
- **Meta Dados**: Informações como title, description para HTML
- **Pauta**: Ideia para criação de conteúdo
- **RLS**: Row Level Security (Segurança em Nível de Linha)
- **Webhook**: Integração HTTP para comunicação entre sistemas

## 13. Detalhes de Implementação do Banco de Dados

### 13.1 Esquema de Tabelas e Enums

```sql
-- Enum de tipos de plano (mantido para compatibilidade)
CREATE TYPE plan_type AS ENUM ('solo', 'discovery', 'escala');

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de resultados do usuário
CREATE TABLE public.user_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  tipo_recurso TEXT NOT NULL,
  input_original JSONB NOT NULL,
  output_gerado JSONB NOT NULL,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de eventos de segurança
CREATE TABLE public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('usage', 'payment', 'auth', 'system')),
  ip_address TEXT,
  device_info TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'warning', 'blocked', 'error')),
  details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
```

### 13.2 Políticas de Row Level Security (RLS)

```sql
-- Políticas para user_results
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem visualizar seus próprios resultados"
ON public.user_results
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios resultados"
ON public.user_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios resultados"
ON public.user_results
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios resultados"
ON public.user_results
FOR DELETE
USING (auth.uid() = user_id);

-- Políticas para security_events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem inserir seus próprios eventos de segurança"
ON public.security_events
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem visualizar seus próprios eventos de segurança"
ON public.security_events
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Apenas função de serviço pode gerenciar todos os eventos de segurança"
ON public.security_events
USING (auth.role() = 'service_role');
```

## 14. Fluxo de Execução

O fluxo completo de execução para um recurso típico (ex: análise de palavras-chave) é:

1. **Inicialização**
   - Usuário faz login na plataforma
   - Sistema verifica autenticação via `useAuth`
   - Usuário acessa a página de palavras-chave

2. **Formulário**
   - Usuário preenche o formulário com palavra-chave
   - Sistema valida entrada usando schema Zod
   - Formulário é enviado via `useWebhookSubmission`

3. **Processamento**
   - Hook `useWebhookSubmission` envia dados para webhook n8n
   - Sistema registra evento de segurança via `useSecurityCheck`
   - Webhook processa a requisição e retorna resultado

4. **Exibição de Resultado**
   - Sistema exibe resultado formatado via `KeywordResult`
   - Resultado é salvo no banco de dados para histórico
   - Notificação de sucesso é exibida

5. **Histórico**
   - Usuário pode acessar histórico de resultados anteriores
   - Sistema busca dados do histórico do banco de dados
   - Usuário pode visualizar, reutilizar ou excluir resultados anteriores
