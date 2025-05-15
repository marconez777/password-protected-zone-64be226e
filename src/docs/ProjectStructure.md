
# MKRanker - Estrutura de Projeto e Tecnologias

## Visão Geral da Tecnologia

O MKRanker é desenvolvido utilizando uma stack moderna de tecnologias web, focada em performance e experiência do usuário.

### Tecnologias Principais

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset tipado de JavaScript que compila para JavaScript puro
- **Vite**: Ferramenta de build que proporciona um ambiente de desenvolvimento mais rápido
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **Shadcn UI**: Biblioteca de componentes de interface baseados em Radix UI
- **React Router**: Biblioteca de roteamento para aplicações React
- **Supabase**: Plataforma de backend como serviço (BaaS) que fornece:
  - Autenticação de usuários
  - Banco de dados PostgreSQL
  - Armazenamento de arquivos
  - Funções serverless
  - Edge Functions

## Estrutura de Diretórios

```
src/
├── components/         # Componentes React reutilizáveis
│   ├── dashboard/      # Componentes específicos do dashboard
│   ├── keyword/        # Componentes de análise de palavras-chave
│   ├── market-target/  # Componentes de análise de mercado e público-alvo
│   ├── meta-dados/     # Componentes para gerenciamento de meta dados
│   ├── pautas-blog/    # Componentes para pautas de blog
│   ├── search-funnel/  # Componentes para análise de funil de busca
│   ├── shared/         # Componentes compartilhados entre módulos
│   ├── texto-seo-blog/  # Componentes para textos SEO de blog
│   ├── texto-seo-lp/    # Componentes para textos SEO de landing page
│   ├── texto-seo-produto/ # Componentes para textos SEO de produto
│   └── ui/             # Componentes de interface do usuário (Shadcn)
├── docs/               # Documentação do sistema
├── hooks/              # Hooks personalizados do React
│   ├── useAuth.ts      # Hook para autenticação
│   ├── useSupabaseClient.ts # Hook para cliente Supabase
│   └── ...
├── integrations/       # Integrações com serviços externos
│   └── supabase/       # Integração com Supabase
├── lib/                # Utilitários e funções auxiliares
├── pages/              # Componentes de página principais
│   ├── Dashboard.tsx   # Página do dashboard
│   ├── Index.tsx       # Página inicial
│   ├── Login.tsx       # Página de login
│   └── ...             # Outras páginas da aplicação
└── types/              # Definições de tipos TypeScript
```

## Padrões de Código

### Componentes React

Os componentes seguem uma estrutura consistente:

- **Componentes Funcionais**: Utilizamos componentes funcionais com React Hooks
- **TypeScript**: Tipagem forte para propriedades e estados
- **Separação de Preocupações**: Componentes divididos por responsabilidade

Exemplo:

```tsx
import React from 'react';
import { Button } from '../ui/button';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div className="rounded-lg bg-background p-6 shadow-md">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {onClick && (
        <Button onClick={onClick} className="mt-4">
          Acessar
        </Button>
      )}
    </div>
  );
};
```

### Estilos

- **Tailwind CSS**: Utilizamos classes utilitárias diretamente nos elementos
- **Variáveis CSS**: Através do tema configurado no Tailwind
- **Componentes Shadcn**: Base consistente de UI com personalização via Tailwind

### Estado e Gerenciamento de Dados

- **React Context API**: Para estado global como autenticação
- **React Query**: Para gerenciamento de estado de servidor e cache
- **React Hook Form**: Para gerenciamento de formulários com validação Zod

### Roteamento

Utilizamos React Router para gerenciar as rotas da aplicação:

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/definir-senha" element={<DefinirSenha />} />
  
  {/* Rotas protegidas que exigem autenticação */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/palavras-chave" element={<Keywords />} />
    {/* ... outras rotas protegidas */}
  </Route>
</Routes>
```

## Integração com Supabase

### Autenticação

A autenticação é gerenciada através do Supabase Auth, com fluxos para:

- Login com email/senha
- Recuperação de senha
- Proteção de rotas

Exemplo do hook de autenticação:

```tsx
export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingIndicator />;
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### Banco de Dados

Utilizamos o PostgreSQL do Supabase com as seguintes tabelas principais:

1. **profiles**: Informações de perfil do usuário
2. **user_results**: Histórico de resultados das ferramentas
3. **subscriptions**: Informações de assinatura dos usuários
4. **user_usage**: Contadores de uso dos recursos

### Segurança

- **Row Level Security (RLS)**: Políticas para garantir que usuários só acessem seus próprios dados
- **Funções seguras**: Funções SQL com `SECURITY DEFINER` para operações privilegiadas
- **Variáveis de ambiente**: Chaves de API e tokens armazenados como segredos

## Padrões de Desenvolvimento

### Organização de Código

- **Componentes pequenos e focados**: Componentes com responsabilidade única
- **Reutilização**: Componentes genéricos em pastas compartilhadas
- **Consistência**: Estrutura de arquivos consistente entre módulos

### Tipagem

TypeScript é utilizado em todo o projeto para garantir tipo seguro:

```typescript
// Exemplo de tipos para recursos
export interface Resource {
  id: string;
  name: string;
  description: string;
  type: 'keyword' | 'market_research' | 'seo_text' | 'search_funnel';
  created_at: string;
}

// Exemplo de tipagem para resposta da API
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  status: 'success' | 'error';
}
```

### Documentação

A documentação do projeto é mantida em arquivos Markdown na pasta `src/docs/`:

1. **SystemOverview.md**: Visão geral do sistema
2. **TechnicalArchitecture.md**: Arquitetura técnica detalhada
3. **FrontendStyling.md**: Guia de estilização frontend
4. **ComprehensiveDocumentation.md**: Documentação completa do sistema
5. **ProjectStructure.md**: Este documento (estrutura do projeto)

## Melhorias Contínuas e Próximos Passos

1. **Testes automatizados**: Implementação de testes unitários e de integração
2. **CI/CD**: Configuração de pipeline para integração e entrega contínua
3. **Monitoramento**: Implementação de ferramentas de monitoramento e logging
4. **Acessibilidade**: Melhorias para garantir acessibilidade (WCAG)
5. **Internacionalização**: Suporte para múltiplos idiomas
