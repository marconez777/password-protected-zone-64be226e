
# MKRanker - Documentação Completa do Sistema

## 1. Visão Geral do Sistema

O MKRanker é uma plataforma de análise e otimização SEO que oferece diversas ferramentas para profissionais de marketing digital. A aplicação permite realizar análises de palavras-chave, funil de busca, pesquisa de mercado, e geração de conteúdo otimizado para SEO.

## 2. Arquitetura do Sistema

### Frontend
- **Framework**: React com TypeScript
- **Interface do Usuário**: Tailwind CSS e Shadcn UI para componentes estilizados
- **Roteamento**: React Router para navegação entre páginas
- **Gerenciamento de Formulários**: React Hook Form com validação Zod
- **Gerenciamento de Estado**: React Context API e hooks personalizados
- **Requisições HTTP**: TanStack Query para gerenciamento de dados e cache

### Backend
- **Infraestrutura**: Supabase
- **Autenticação**: Sistema de autenticação do Supabase
- **Banco de Dados**: PostgreSQL gerenciado pelo Supabase
- **Integrações**: APIs externas para processamento de conteúdo via webhooks n8n

## 3. Fluxo de Autenticação

O sistema implementa um fluxo de autenticação completo:
- Login com email/senha
- Registro de novos usuários
- Recuperação de senha
- Proteção de rotas que exigem autenticação

## 4. Módulos e Funcionalidades

### Dashboard
- Central de acesso a todas as ferramentas da plataforma
- Navegação intuitiva para todas as funcionalidades

### Funil de Busca
- Análise de funil de busca para SEO
- Visualização e histórico de análises

### Palavras-chave
- Pesquisa e análise de palavras-chave
- Histórico de pesquisas realizadas

### Mercado e Público-Alvo
- Análise de mercado e identificação de público-alvo
- Armazenamento de histórico de análises

### Textos SEO
- Geração de conteúdo otimizado para:
  - Landing Pages (LP)
  - Descrições de Produtos
  - Artigos de Blog
- Histórico de textos gerados

### Pautas para Blog
- Geração de ideias de pautas para blog
- Histórico de pautas geradas

### Meta Dados
- Geração de meta tags otimizadas para SEO
- Histórico de meta dados gerados

## 5. Componentes principais

### Componentes de Interface
- **ResourceForm**: Componente genérico para formulários
- **ResourceHistoryDisplay**: Componente para exibição de histórico
- **ResourceResultDisplay**: Componente para exibição de resultados
- **DashboardLayout**: Layout compartilhado para páginas autenticadas

### Hooks Personalizados
- **useAuth**: Gerenciamento do estado de autenticação
- **useWebhookSubmission**: Envio de dados para webhooks externos
- **useSupabaseClient**: Acesso facilitado ao cliente Supabase

## 6. Fluxo de Processamento de Recursos

1. O usuário preenche um formulário para usar um recurso (ex: gerar meta dados)
2. O formulário é validado usando Zod
3. Os dados são enviados para um webhook externo (n8n)
4. O resultado é processado e exibido na interface
5. Os dados originais e o resultado são salvos no banco de dados para histórico
