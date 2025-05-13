
# MKRanker - Sistema de Otimização SEO

## Visão Geral do Sistema

O MKRanker é uma plataforma completa de otimização SEO que oferece diversas ferramentas para análise de palavras-chave, criação de conteúdo otimizado e pesquisa de mercado. O sistema possui um modelo de assinatura com diferentes planos que limitam o uso dos recursos.

## Arquitetura do Sistema

### Frontend
- **Framework**: React com TypeScript
- **Estilização**: Tailwind CSS e componentes Shadcn UI
- **Roteamento**: React Router
- **Gerenciamento de Formulários**: React Hook Form com validação Zod
- **Estado Global**: Hooks contextuais (como useAuth, useUsageData)

### Backend
- **Infraestrutura**: Supabase
- **Autenticação**: Sistema de autenticação do Supabase
- **Banco de Dados**: PostgreSQL gerenciado pelo Supabase
- **APIs**: Funções do banco de dados PostgreSQL e webhooks externos

## Estrutura de Páginas

1. **Login/Registro**
   - Sistema de autenticação
   - Recuperação de senha
   
2. **Dashboard**
   - Visão geral da assinatura
   - Monitoramento de uso de recursos
   - Acesso rápido às ferramentas

3. **Funil de Busca**
   - Análise de funil de busca para SEO
   - Histórico de análises

4. **Palavras-chave**
   - Pesquisa e análise de palavras-chave
   - Histórico de pesquisas

5. **Mercado e Público-Alvo**
   - Análise de mercado
   - Identificação de público-alvo
   - Histórico de análises

6. **Texto SEO (LP/Produto/Blog)**
   - Geração de conteúdo otimizado para SEO
   - Diferentes formatos para Landing Pages, Produtos e Blog
   - Histórico de textos gerados

7. **Pautas Blog**
   - Geração de ideias de pautas para blog
   - Histórico de pautas geradas

8. **Meta Dados**
   - Geração de meta tags otimizadas para SEO
   - Histórico de meta dados gerados

## Sistema de Assinatura e Limites

O sistema oferece três planos de assinatura:

1. **Solo**
   - Limites restritos de uso para cada recurso
   
2. **Discovery**
   - Limites intermediários de uso
   
3. **Escala**
   - Uso ilimitado de recursos

Cada ação que consome um recurso é monitorada no banco de dados, e os limites são aplicados conforme o plano do usuário.

## Fluxo de Processamento de Recursos

1. O usuário preenche um formulário para usar um recurso (ex: gerar meta dados)
2. O sistema verifica se o usuário já atingiu o limite para aquele recurso
3. Se não atingiu, o sistema incrementa o contador e processa a solicitação
4. A solicitação é enviada para um webhook externo (n8n ou outro serviço)
5. O resultado é exibido na interface e salvo no histórico do usuário
6. O Dashboard é atualizado para refletir o novo uso de recursos

## Componentes Principais

### Componentes Globais
- `ResourceForm`: Componente genérico para formulários com verificação de limite
- `ResourceHistoryDisplay`: Componente genérico para exibição de histórico
- `ResourceResultDisplay`: Componente genérico para exibição de resultados
- `DashboardLayout`: Layout compartilhado para todas as páginas autenticadas

### Hooks Personalizados
- `useAuth`: Gerenciamento de autenticação
- `useUsageData`: Obtenção dos dados de uso e limites do plano
- `useResourceLimits`: Verificação e incremento de limites de recursos
- `useWebhookSubmission`: Envio de dados para webhooks externos

## Banco de Dados

### Tabelas Principais

1. **subscriptions**
   - Armazena informações sobre a assinatura do usuário
   - Campos: id, user_id, is_active, plan_type, current_period_end

2. **user_usage**
   - Armazena contadores de uso para cada tipo de recurso
   - Campos: user_id, keyword_count, market_research_count, etc.

3. **plan_limits**
   - Define os limites para cada tipo de plano
   - Campos: plan_type, keyword_limit, market_research_limit, etc.

4. **user_results**
   - Armazena histórico de todos os resultados gerados pelo usuário
   - Campos: user_id, tipo_recurso, input_original, output_gerado, data_criacao

### Funções do Banco de Dados

1. **user_has_exceeded_limit**
   - Verifica se um usuário excedeu o limite para um tipo de recurso

2. **increment_user_usage**
   - Incrementa o contador de uso para um tipo de recurso

## Integrações Externas

- **Webhooks n8n**: Processamento de solicitações e geração de conteúdo
- **Supabase Auth**: Autenticação e gestão de usuários
- **Mercado Pago**: Processamento de pagamentos para assinaturas

## Desenvolvimento e Manutenção

### Adicionando Novos Recursos

Para adicionar um novo recurso ao sistema:

1. Criar uma nova pasta na estrutura src/components/[nome-recurso]
2. Implementar os componentes básicos:
   - FormInputs (campos específicos)
   - Schema (validação)
   - Result (exibição de resultado)
   - History (histórico)
3. Criar página no diretório src/pages
4. Adicionar verificação de limite no `useResourceLimits`
5. Atualizar a tabela plan_limits com o novo tipo de recurso

### Solução de Problemas Comuns

1. **Contagem de recursos não atualiza**
   - Verificar se a função `increment_user_usage` está sendo chamada
   - Garantir que o tipo de recurso está corretamente configurado
   - Verificar se o Dashboard está recarregando os dados após operações

2. **Erros de autenticação**
   - Verificar se a sessão do Supabase está válida
   - Implementar refresh automático de token quando expirado

3. **Problemas na exibição de resultados**
   - Verificar o formato da resposta do webhook
   - Garantir que o componente de resultado está processando corretamente o formato
