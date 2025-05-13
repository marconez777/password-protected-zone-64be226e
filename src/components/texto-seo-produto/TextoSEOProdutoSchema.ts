
import { z } from "zod";

export const WEBHOOK_URL = "https://mkseo77.app.n8n.cloud/webhook/texto-produto";

export const TextoSEOProdutoFormSchema = z.object({
  nomeProduto: z.string().min(1, "Por favor, informe o nome do produto"),
  palavraChave: z.string().min(1, "Por favor, informe a palavra-chave principal"),
  palavrasRelacionadas: z.string().min(1, "Por favor, informe ao menos uma palavra-chave relacionada"),
  observacoes: z.string().optional(),
});

export type TextoSEOProdutoFormData = z.infer<typeof TextoSEOProdutoFormSchema>;
