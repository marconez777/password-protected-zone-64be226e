
import { z } from "zod";

export const WEBHOOK_URL = "https://mkseo77.app.n8n.cloud/webhook/metadados";

export const MetaDadosFormSchema = z.object({
  nomeEmpresa: z.string().min(1, "Por favor, informe o nome da empresa/loja/blog"),
  palavraChave: z.string().min(1, "Por favor, informe a palavra-chave principal"),
  palavraRelacionada: z.string().min(1, "Por favor, informe ao menos uma palavra-chave relacionada"),
  tipoPagina: z.string().min(1, "Por favor, informe o tipo de página"),
});

export type MetaDadosFormData = z.infer<typeof MetaDadosFormSchema>;
