
import { supabase } from "@/integrations/supabase/client";

export const useAuthActions = () => {
  // Sign out function
  const signOut = async () => {
    console.log("Iniciando logout");
    try {
      await supabase.auth.signOut();
      console.log("Logout concluído");
      return { success: true };
    } catch (error) {
      console.error("Erro no logout:", error);
      return { success: false, error };
    }
  };

  return {
    signOut
  };
};
