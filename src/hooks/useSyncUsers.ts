
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Function to generate a random password
const generateRandomPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Type for pending profile
interface PendingProfile {
  id: string;
  email: string;
  nome: string;
  created_at?: string;
}

// Type for sync results
interface SyncResult {
  email: string;
  success: boolean;
  message?: string;
}

export const useSyncUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SyncResult[]>([]);

  const syncUsers = useCallback(async () => {
    setIsLoading(true);
    setResults([]);

    try {
      // Get the service role key from environment variable
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const supabaseUrl = process.env.SUPABASE_URL || 'https://buizhanvxiykyapyndsh.supabase.co';

      if (!serviceRoleKey) {
        console.error("SUPABASE_SERVICE_ROLE_KEY environment variable is not defined");
        setResults([{ email: "CONFIGURATION_ERROR", success: false, message: "SUPABASE_SERVICE_ROLE_KEY not defined" }]);
        setIsLoading(false);
        return;
      }

      // 1. Fetch all pending profiles
      const { data: pendingProfiles, error } = await supabase
        .from('profiles_pendentes')
        .select('*');

      if (error) {
        throw new Error(`Failed to fetch pending profiles: ${error.message}`);
      }

      if (!pendingProfiles || pendingProfiles.length === 0) {
        setResults([{ email: "INFO", success: true, message: "No pending profiles found" }]);
        setIsLoading(false);
        return;
      }

      console.log(`Found ${pendingProfiles.length} pending profiles to process`);
      const syncResults: SyncResult[] = [];

      // 2. Process each pending profile
      for (const profile of pendingProfiles as PendingProfile[]) {
        try {
          // Generate random password for the new user
          const password = generateRandomPassword();

          // Create the user using Supabase Admin API
          const createResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceRoleKey}`,
              'apikey': serviceRoleKey
            },
            body: JSON.stringify({
              email: profile.email,
              password: password,
              email_confirm: true,
              user_metadata: {
                full_name: profile.nome
              }
            })
          });

          // Check if user was created successfully
          if (!createResponse.ok) {
            const errorData = await createResponse.json();
            throw new Error(`Failed to create user: ${JSON.stringify(errorData)}`);
          }

          const newUser = await createResponse.json();
          console.log(`✓ Created user for ${profile.email} with ID: ${newUser.id}`);

          // Delete the pending profile from the database
          const { error: deleteError } = await supabase
            .from('profiles_pendentes')
            .delete()
            .eq('email', profile.email);

          if (deleteError) {
            console.warn(`Failed to delete pending profile for ${profile.email}: ${deleteError.message}`);
          }

          syncResults.push({
            email: profile.email,
            success: true,
            message: `User created with ID: ${newUser.id}`
          });

        } catch (err) {
          console.error(`Error processing ${profile.email}:`, err);
          syncResults.push({
            email: profile.email,
            success: false,
            message: err instanceof Error ? err.message : 'Unknown error'
          });
        }

        // Wait to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setResults(syncResults);
      console.log('User synchronization complete:', syncResults);

    } catch (error) {
      console.error('Error in syncUsers:', error);
      setResults([{
        email: "ERROR",
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { syncUsers, isLoading, results };
};
