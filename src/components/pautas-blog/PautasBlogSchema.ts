
import { z } from "zod";

export const WEBHOOK_URL = "https://mkseo77.app.n8n.cloud/webhook/pautas-blog";

export const PautasBlogFormSchema = z.object({
  palavraChave: z.string().min(1, "Por favor, informe uma palavra-chave"),
});

export type PautasBlogFormData = z.infer<typeof PautasBlogFormSchema>;
