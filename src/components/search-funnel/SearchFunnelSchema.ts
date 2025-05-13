
import { z } from 'zod';

export const searchFunnelSchema = z.object({
  microNicho: z.string().min(1, { message: 'O micro nicho é obrigatório' }),
  publicoAlvo: z.string().min(1, { message: 'O público alvo é obrigatório' }),
  segmento: z.string().min(1, { message: 'O segmento é obrigatório' }),
});

export type SearchFunnelFormValues = z.infer<typeof searchFunnelSchema>;

export const WEBHOOK_URL = 'https://mkseo77.app.n8n.cloud/webhook-test/funil';
