
import { createClient } from '@supabase/supabase-js';

// Check for actual environment variables and provide fallbacks that won't cause runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if we have valid URL and key
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const useSupabaseClient = () => {
  // If Supabase client couldn't be created, return a dummy client to prevent errors
  if (!supabase) {
    console.error('Supabase client could not be initialized. Missing URL or API key.');
    
    // Return a mock client that won't throw errors but won't work either
    return {
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        updateUser: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          }),
          insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        }),
      }),
    };
  }
  
  return supabase;
};

// Export the client directly for use in the auth context
export { supabase };
