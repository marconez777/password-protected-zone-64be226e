
# Arquitetura Técnica do MKRanker

## 1. Diagrama de Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Interface de   │     │    Supabase     │     │   Webhooks n8n  │
│  Usuário React  │◄───►│ (Auth + DB + API)│◄───►│ (Processamento) │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 2. Camadas da Aplicação

### 2.1 Frontend (React + TypeScript)

#### Estrutura de Diretórios
```
src/
├── components/       # Componentes React reutilizáveis
│   ├── ui/           # Componentes de interface (Shadcn)
│   ├── dashboard/    # Componentes do dashboard
│   └── [recurso]/    # Componentes específicos para cada recurso
├── pages/            # Componentes de página
├── hooks/            # Hooks personalizados
├── lib/              # Utilitários e funções
├── integrations/     # Integrações com serviços externos
└── types/            # Definições de tipos TypeScript
```

#### Principais Tecnologias
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática
- **React Router**: Navegação entre páginas
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas
- **TanStack Query**: Gerenciamento de estado e cache
- **Tailwind CSS**: Estilização
- **Shadcn/UI**: Biblioteca de componentes

### 2.2 Backend (Supabase)

#### Componentes
- **Autenticação**: Gerenciamento de usuários, login/logout, recuperação de senha
- **Banco de Dados**: PostgreSQL para armazenamento de dados
- **API**: Interface RESTful para interação com o banco de dados
- **Row Level Security (RLS)**: Políticas de segurança em nível de linha

#### Tabelas Principais
- `auth.users`: Gerenciado pelo Supabase, armazena usuários
- `public.profiles`: Informações adicionais de usuário
- `public.user_results`: Resultados de todas as ferramentas

### 2.3 Integração Externa (n8n)

- **Webhooks**: Endpoints para processamento de conteúdo
- **Fluxos de trabalho**: Processamento e enriquecimento de dados

## 3. Fluxo de Dados

### 3.1 Fluxo de Autenticação
1. Usuário submete credenciais via React Hook Form
2. Frontend envia requisição para Supabase Auth
3. Supabase valida e retorna token JWT
4. Token é armazenado e utilizado para requisições subsequentes
5. Rotas protegidas verificam a autenticação via useAuth hook

### 3.2 Fluxo de Uso de Recursos
1. Usuário preenche formulário para um recurso (ex: análise de palavras-chave)
2. Frontend valida entrada com Zod
3. Dados são enviados para webhook n8n
4. n8n processa os dados e retorna resultado
5. Frontend exibe resultado e salva no banco de dados via Supabase
6. Dados são armazenados na tabela `user_results` para histórico

## 4. Padrões Arquiteturais

### 4.1 Componentes Reutilizáveis
- **ResourceForm**: Componente genérico para todos os formulários
- **ResourceHistoryDisplay**: Exibição padronizada de histórico
- **ResourceResultDisplay**: Apresentação de resultados

### 4.2 Hooks Personalizados
- **useAuth**: Gerenciamento do estado de autenticação
- **useWebhookSubmission**: Lógica compartilhada para envio a webhooks
- **useSupabaseClient**: Acesso padronizado ao cliente Supabase

### 4.3 Context API
- **AuthContext**: Compartilhamento do estado de autenticação

## 5. Segurança

### 5.1 Autenticação
- Baseada em JWT via Supabase Auth
- Senhas armazenadas com hash seguro
- Verificação de email opcional

### 5.2 Autorização
- Row Level Security (RLS) no PostgreSQL
- Políticas que garantem que usuários só acessam seus próprios dados

### 5.3 Segurança de API
- Chaves de API gerenciadas pelo Supabase
- CORS configurado para domínios permitidos

## 6. Escalabilidade

### 6.1 Frontend
- Code splitting para carregamento sob demanda
- Componentes otimizados para re-renderização mínima
- Memoização para operações intensivas

### 6.2 Backend
- PostgreSQL gerenciado pelo Supabase com capacidade de escala
- Índices em colunas frequentemente consultadas
- Queries otimizadas

## 7. Monitoramento e Logs
- Console logs para debug durante desenvolvimento
- Tratamento de erros centralizado
- Feedback visual para usuários em caso de falhas

## 8. Desafios Técnicos e Soluções

### 8.1 Processamento Assíncrono
**Desafio**: Processamento de conteúdo pode ser lento
**Solução**: Webhooks assíncronos e feedback visual de carregamento

### 8.2 Consistência de Interface
**Desafio**: Manter experiência de usuário consistente entre diferentes ferramentas
**Solução**: Componentes reutilizáveis e padrões de design unificados

### 8.3 Gestão de Estado
**Desafio**: Compartilhamento eficiente de estado entre componentes
**Solução**: Combinação de React Context e hooks personalizados
