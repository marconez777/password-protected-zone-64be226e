
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const useSupabaseClient = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Log authentication state for debugging
    if (user) {
      console.log('User authenticated:', user.id);
    } else {
      console.log('No authenticated user');
    }
  }, [user]);
  
  return supabase;
};

// Export the client directly for use in the auth context
export { supabase };
