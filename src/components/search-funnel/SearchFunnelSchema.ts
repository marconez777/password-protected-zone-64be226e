
import { z } from 'zod';

// URL do webhook de produção
export const WEBHOOK_URL = import.meta.env.VITE_SEARCH_FUNNEL_WEBHOOK_URL || 'https://mkseo77.app.n8n.cloud/webhook/funildebusca';

// Esquema de validação do formulário com Zod
export const SearchFunnelFormSchema = z.object({
  microNicho: z.string().min(1, { message: 'O micro nicho é obrigatório' }),
  publicoAlvo: z.string().min(1, { message: 'O público alvo é obrigatório' }),
  segmento: z.string().min(1, { message: 'O segmento é obrigatório' }),
});

// Tipo derivado do esquema Zod
export type SearchFunnelFormData = z.infer<typeof SearchFunnelFormSchema>;
