
import { z } from "zod";

export const WEBHOOK_URL = "https://mkseo77.app.n8n.cloud/webhook-test/post";

export const TextoSEOBlogFormSchema = z.object({
  tema: z.string().min(1, "Por favor, informe o tema do blog"),
  palavraChave: z.string().min(1, "Por favor, informe a palavra-chave principal"),
  palavrasRelacionadas: z.string().min(1, "Por favor, informe ao menos uma palavra-chave relacionada"),
  observacoes: z.string().optional(),
});

export type TextoSEOBlogFormData = z.infer<typeof TextoSEOBlogFormSchema>;
