
# Documentação de API do MKRanker

## 1. Visão Geral da API

O MKRanker utiliza o Supabase como backend, que fornece uma API RESTful para interação com o banco de dados. Além disso, a aplicação se integra com webhooks externos para processamento de conteúdo.

## 2. Autenticação

A autenticação é gerenciada pelo Supabase Auth.

### Endpoints de Autenticação

| Endpoint | Descrição | Método |
|----------|-----------|--------|
| `/auth/signin` | Login de usuário | POST |
| `/auth/signup` | Registro de usuário | POST |
| `/auth/signout` | Logout de usuário | POST |
| `/auth/reset` | Solicitação de redefinição de senha | POST |

### Exemplo de Login

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@exemplo.com',
  password: 'senha123',
});
```

### Exemplo de Registro

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'novousuario@exemplo.com',
  password: 'senha123',
  options: {
    data: {
      full_name: 'Nome Completo',
    },
  },
});
```

## 3. API de Resultados

### Endpoints Principais

| Endpoint | Descrição | Método |
|----------|-----------|--------|
| `/rest/v1/user_results` | Gerenciar resultados dos recursos | GET, POST |

### Exemplos de Uso

#### Obter Histórico de Resultados

```typescript
const { data, error } = await supabase
  .from('user_results')
  .select('*')
  .eq('tipo_recurso', 'search_funnel')
  .order('data_criacao', { ascending: false });
```

#### Salvar Novo Resultado

```typescript
const { data, error } = await supabase
  .from('user_results')
  .insert({
    user_id: userId,
    tipo_recurso: 'search_funnel',
    input_original: formData,
    output_gerado: responseData,
  });
```

#### Excluir um Resultado

```typescript
const { error } = await supabase
  .from('user_results')
  .delete()
  .eq('id', resultId);
```

## 4. Webhooks Externos

O MKRanker utiliza webhooks externos para processamento de conteúdo via n8n.

### Endpoints dos Webhooks

| Nome do Recurso | URL do Webhook |
|-----------------|---------------|
| Funil de Busca | `https://mkseo77.app.n8n.cloud/webhook/funildebusca` |
| Mercado e Público-Alvo | `https://mkseo77.app.n8n.cloud/webhook/pesquisa-mercado` |
| Texto SEO LP | `https://mkseo77.app.n8n.cloud/webhook/texto-lp` |
| Texto SEO Blog | `https://mkseo77.app.n8n.cloud/webhook/post` |
| Texto SEO Produto | `https://mkseo77.app.n8n.cloud/webhook/texto-produto` |
| Pautas Blog | `https://mkseo77.app.n8n.cloud/webhook/pautas-blog` |
| Meta Dados | `https://mkseo77.app.n8n.cloud/webhook/metadados` |

### Exemplo de Submissão para Webhook

```typescript
const submitToWebhook = async (webhookUrl, formData) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar para webhook:', error);
    throw error;
  }
};
```

## 5. Integração com Supabase

### Inicialização do Cliente

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://buizhanvxiykyapyndsh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Queries Comuns

#### Verificar Autenticação Atual

```typescript
const { data: { user } } = await supabase.auth.getUser();
```

#### Obter Dados do Perfil

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();
```

## 6. Tratamento de Erros

A API utiliza códigos de status HTTP padrão:

- **200**: Sucesso
- **400**: Erro de requisição
- **401**: Não autenticado
- **403**: Não autorizado
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

Exemplo de tratamento de erro:

```typescript
const { data, error } = await supabase
  .from('user_results')
  .select('*');

if (error) {
  console.error('Erro ao obter resultados:', error.message);
  // Manipular o erro apropriadamente
  return;
}

// Processar os dados recebidos
console.log('Resultados:', data);
```
