
import { z } from 'zod';

// URL do webhook de teste para Mercado e Público Alvo
export const WEBHOOK_URL = 'https://mkseo77.app.n8n.cloud/webhook/pesquisa-mercado';

// Esquema de validação do formulário com Zod
export const MarketTargetFormSchema = z.object({
  nicho: z.string().min(1, "O nicho é obrigatório"),
  servico: z.string().min(1, "O serviço é obrigatório"),
  segmentos: z.string().min(1, "Os segmentos são obrigatórios"),
  problema: z.string().min(1, "O problema ou necessidade é obrigatório"),
});

// Tipo derivado do esquema Zod
export type MarketTargetFormData = z.infer<typeof MarketTargetFormSchema>;
