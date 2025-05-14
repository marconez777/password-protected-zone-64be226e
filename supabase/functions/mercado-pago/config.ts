// Configuration for the Mercado Pago integration
export const PLAN_CONFIG = {
  solo: {
    name: 'Plano Solo',
    description: 'Plano para profissionais individuais',
    unit_price: 97.0,
    duration: '1 month',
  },
  discovery: {
    name: 'Plano Discovery',
    description: 'Plano para pequenas empresas',
    unit_price: 297.0,
    duration: '1 month',
  },
  escala: {
    name: 'Plano Escala',
    description: 'Plano para empresas em crescimento',
    unit_price: 497.0,
    duration: '1 month',
  }
};

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, origin',
  'Access-Control-Max-Age': '86400',
};

// Duration mappings from string to days
export const durationMap: Record<string, number> = {
  "1 month": 30,
  "1 year": 365,
};
