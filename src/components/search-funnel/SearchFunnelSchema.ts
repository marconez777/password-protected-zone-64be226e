import { z } from "zod";

// URL do webhook para Funil de Busca
export const WEBHOOK_URL = 'https://mkseo77.app.n8n.cloud/webhook/funildebusca';

export const SearchFunnelFormSchema = z.object({
  microNicho: z.string().min(1, "Por favor, informe o micro nicho"),
  publicoAlvo: z.string().min(1, "Por favor, informe o público alvo"),
  segmento: z.string().min(1, "Por favor, informe o segmento"),
});

export type SearchFunnelFormData = z.infer<typeof SearchFunnelFormSchema>;
