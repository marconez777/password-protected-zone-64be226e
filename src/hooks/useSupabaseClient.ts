
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseClient = () => {
  return supabase;
};

// Export the client directly for use in the auth context
export { supabase };
