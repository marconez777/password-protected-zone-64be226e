
# Estrutura Padrão de Telas

Este documento descreve a estrutura padronizada para todas as telas de recursos do sistema MKRanker.

## Componentes Estruturais

Cada tela de recurso deve seguir esta estrutura hierárquica:

1. **DashboardLayout**: Componente base que fornece a estrutura geral com sidebar
2. **Página Específica do Recurso**: Componente que envolve o formulário específico do recurso
3. **Formulário do Recurso**: Componente principal que gerencia a lógica do recurso

## Estrutura Visual

Cada tela de recurso deve ter a seguinte estrutura visual:

```
┌──────────────────────────────────────────────────┐
│ Título Principal                      [Perfil ▾] │
├──────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌───────────────┐               │
│ │ Formulário  │ │ Histórico     │               │
│ └─────────────┘ └───────────────┘               │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Instruções ou Descrição do Recurso          │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Campos do Formulário                        │ │
│ │ ...                                         │ │
│ │ ...                                         │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ [                 Enviar                  ]  │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Exibição do Resultado (quando houver)       │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

## Elementos Padrão

1. **Título e Subtítulo**
   - Título principal da página (ex: "Mercado e Público Alvo")
   - Subtítulo opcional com descrição breve (ex: "Gere análises de mercado para seu negócio")

2. **Navegação por Abas**
   - Aba "Formulário": Exibe o formulário para criação de novo conteúdo
   - Aba "Histórico": Exibe os itens salvos anteriormente

3. **Formulário**
   - Card com bordas suaves e sombras leves
   - Campos de entrada com labels claros
   - Campos obrigatórios marcados com asterisco vermelho (*)
   - Botão de envio alinhado à direita

4. **Área de Resultado**
   - Exibida após o processamento do formulário
   - Card com título "Resultado da Análise" ou similar
   - Conteúdo estruturado com subtítulos e formatação adequada
   - Área com rolagem para conteúdos extensos

5. **Histórico**
   - Lista de itens gerados anteriormente
   - Cada item com data/hora de criação
   - Opções para visualizar ou excluir cada item

## Componentes Obrigatórios

Cada recurso deve ter os seguintes componentes:

1. **Página Principal do Recurso** (`src/pages/[NomeRecurso].tsx`)
2. **Formulário do Recurso** (`src/components/[nome-recurso]/[NomeRecurso]Form.tsx`)
3. **Campos do Formulário** (`src/components/[nome-recurso]/[NomeRecurso]FormInputs.tsx`)
4. **Exibição de Resultado** (`src/components/[nome-recurso]/[NomeRecurso]Result.tsx`)
5. **Histórico** (`src/components/[nome-recurso]/[NomeRecurso]History.tsx`)
6. **Schema do Formulário** (`src/components/[nome-recurso]/[NomeRecurso]Schema.ts`)

## Padrões de Cor e Estilo

- Cores primárias do MKRanker (roxo: `mkranker-purple`, roxo escuro: `mkranker-dark-purple`)
- Fundo geral: cinza claro (`bg-gray-50`)
- Cards: fundo branco com sombra leve
- Botões de ação primária: roxo MKRanker
- Texto principal: cinza escuro (`text-gray-800`)
- Texto secundário: cinza médio (`text-gray-500`)
