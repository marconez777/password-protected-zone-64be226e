
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../integrations/supabase/client";

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Session manager initialized");
    let authListenerUnsubscribe: (() => void) | null = null;
    
    // First set up the auth state listener
    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, currentSession) => {
          console.log("Auth state change event:", _event);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Session state is now managed in this hook, 
          // other hooks will react to these state changes
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };

    // Check for existing session
    const checkExistingSession = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          console.log("Existing session found:", currentSession.user.email);
          setSession(currentSession);
          setUser(currentSession.user);
        } else {
          console.log("No existing session found");
          setSession(null);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking existing session:", err);
        setSession(null);
        setUser(null);
      }
    };
    
    // Execute initialization
    authListenerUnsubscribe = setupAuthListener();
    checkExistingSession();

    return () => {
      console.log("Cleaning up session manager");
      if (authListenerUnsubscribe) {
        authListenerUnsubscribe();
      }
    };
  }, []);

  return {
    user,
    session,
    loading,
    setLoading
  };
};
