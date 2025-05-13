
# MKRanker - Documentação do Projeto

## Visão Geral

MKRanker é um sistema de análise e otimização de palavras-chave com verificação de assinatura ativa. A aplicação oferece ferramentas para análise SEO, criação de conteúdo otimizado e gestão de palavras-chave.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
src/
├── components/         # Componentes reutilizáveis
│   ├── dashboard/      # Componentes específicos do dashboard
│   ├── keyword/        # Componentes de análise de palavras-chave
│   ├── meta-dados/     # Componentes para gerenciamento de meta dados
│   ├── ui/             # Componentes de interface do usuário (Shadcn)
│   └── ...
├── hooks/              # Hooks personalizados
├── integrations/       # Integrações com serviços externos
├── lib/               # Utilitários e funções auxiliares
├── pages/              # Componentes de página principais
└── types/              # Definições de tipos TypeScript
```

## Páginas Principais

1. **Página Inicial (Index)**: Ponto de entrada da aplicação, oferece opções de autenticação
2. **Dashboard**: Painel principal após autenticação com visão geral das ferramentas
3. **Funil de Busca (SearchFunnel)**: Análise de funil de busca para SEO
4. **Palavras-chave (Keywords)**: Análise e gestão de palavras-chave
5. **Mercado e Público-Alvo (MarketAndTarget)**: Análise de mercado e público-alvo
6. **Texto SEO LP/Produto/Blog**: Ferramentas para criação de conteúdo otimizado
7. **Pautas Blog**: Geração e gestão de pautas para blog
8. **Meta Dados**: Ferramentas para criação e otimização de meta dados

## Fluxo de Autenticação

A aplicação implementa um fluxo de autenticação completo:
- Login com email/senha
- Registro de novos usuários
- Recuperação de senha
- Rotas protegidas que exigem autenticação

## Sistema de Assinatura

MKRanker utiliza um sistema de verificação de assinatura ativa para garantir que apenas usuários com assinaturas válidas possam acessar determinadas funcionalidades.

## Design e Experiência do Usuário

- Interface limpa e moderna com tema roxo como cor principal
- Design responsivo para funcionar em diversos tamanhos de tela
- Foco em usabilidade e facilidade de navegação
- Feedback visual para ações do usuário

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Roteamento**: React Router
- **Gerenciamento de Estado**: React Context API, TanStack Query
- **Backend**: Supabase (Autenticação, Banco de Dados, Armazenamento)
- **Estilização**: Tailwind CSS com componentes shadcn/ui personalizáveis

## Inicializando o Projeto

Para iniciar o projeto localmente:

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Acesse `http://localhost:5173` no navegador

## Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Faça suas alterações
3. Execute os testes
4. Envie um pull request
