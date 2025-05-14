
import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Security constants - these can be kept but aren't enforced anymore
export const USAGE_LIMIT_CONFIG = {
  GLOBAL_USAGE_LIMIT: 1000, // Increased since we removed limits
  WARNING_THRESHOLD_PERCENT: 75,
  CRITICAL_THRESHOLD_PERCENT: 90
};

// Define the security event structure to help TypeScript
interface SecurityEvent {
  user_id: string;
  action_type: 'usage' | 'auth' | 'system';
  ip_address: string;
  device_info: string;
  status: 'success' | 'warning' | 'blocked' | 'error';
  details: string;
}

export const useSecurityCheck = () => {
  const { user } = useAuth();
  const { active, remainingUses, isLoading } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [checkingAccess, setCheckingAccess] = useState(false);

  // Log security events for audit purposes
  const logSecurityEvent = async (
    action: 'usage' | 'auth' | 'system',
    status: 'success' | 'warning' | 'blocked' | 'error',
    details: string
  ) => {
    if (!user) return;
    
    try {
      // Get IP information - this is just for logging
      const ipResponse = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .catch(() => ({ ip: 'unknown' }));
      
      // Insert security event directly
      const eventData: SecurityEvent = {
        user_id: user.id,
        action_type: action,
        ip_address: ipResponse.ip || 'unknown',
        device_info: navigator.userAgent,
        status: status,
        details: details
      };

      // Using the "as any" type assertion to bypass TypeScript's table checking
      // This is necessary since security_events isn't in the generated types
      await supabase
        .from('security_events' as any)
        .insert(eventData);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  // Simplified access check that always returns true
  const verifyResourceAccess = async (resourceType: string): Promise<boolean> => {
    if (checkingAccess || isLoading) return false;
    setCheckingAccess(true);
    
    try {
      if (!user) {
        toast({
          title: "Acesso negado",
          description: "Você precisa estar autenticado para acessar este recurso.",
          variant: "destructive"
        });
        navigate('/login');
        return false;
      }

      // Log successful access
      await logSecurityEvent(
        'usage',
        'success',
        `Acesso verificado para: ${resourceType}`
      );
      
      return true;
    } catch (error) {
      console.error('Error verifying resource access:', error);
      toast({
        title: "Erro de verificação",
        description: "Não foi possível verificar seu acesso a este recurso.",
        variant: "destructive"
      });
      return false;
    } finally {
      setCheckingAccess(false);
    }
  };

  // Simplified suspicious activity check that always returns false
  const detectSuspiciousActivity = async (): Promise<boolean> => {
    return false;
  };

  return {
    verifyResourceAccess,
    logSecurityEvent,
    detectSuspiciousActivity,
    checkingAccess
  };
};
