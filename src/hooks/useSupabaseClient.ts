
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export const useSupabaseClient = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      console.log('User authenticated:', user.id);
    } else {
      console.log('No authenticated user');
    }
  }, [user]);
  
  return supabase;
};

export { supabase };
