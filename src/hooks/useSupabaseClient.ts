
import { createClient } from '@supabase/supabase-js';

// Estas variáveis serão substituídas automaticamente pelo Lovable quando conectado ao Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabaseClient = () => {
  return supabase;
};
