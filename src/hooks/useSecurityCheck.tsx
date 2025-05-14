
import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Security constants
export const USAGE_LIMIT_CONFIG = {
  GLOBAL_USAGE_LIMIT: 80,
  WARNING_THRESHOLD_PERCENT: 75,
  CRITICAL_THRESHOLD_PERCENT: 90
};

export const useSecurityCheck = () => {
  const { user } = useAuth();
  const { active, remainingUses, isLoading } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [checkingAccess, setCheckingAccess] = useState(false);

  // Log security events for audit purposes
  const logSecurityEvent = async (
    action: 'usage' | 'payment' | 'auth' | 'system',
    status: 'success' | 'warning' | 'blocked' | 'error',
    details: string
  ) => {
    if (!user) return;
    
    try {
      // Get IP information - this is just for logging
      const ipResponse = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .catch(() => ({ ip: 'unknown' }));
      
      // Log to security_events table directly instead of using an RPC
      await supabase
        .from('security_events')
        .insert({
          user_id: user.id,
          action_type: action,
          ip_address: ipResponse.ip || 'unknown',
          device_info: navigator.userAgent,
          status: status,
          details: details
        });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  // Comprehensive access check with protection against bypass attempts
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

      if (!active) {
        toast({
          title: "Assinatura requerida",
          description: "Você precisa ter uma assinatura ativa para acessar este recurso.",
          variant: "destructive"
        });
        navigate('/subscribe');
        return false;
      }

      if (remainingUses <= 0) {
        // Double-check with direct database query to prevent tampering
        const { data, error } = await supabase
          .from("user_usage")
          .select("total_usage")
          .eq("user_id", user.id)
          .single();
        
        const hasAccess = data && data.total_usage < USAGE_LIMIT_CONFIG.GLOBAL_USAGE_LIMIT;
        
        if (error || !hasAccess) {
          toast({
            title: "Limite atingido",
            description: "Você atingiu o limite de requisições do seu plano.",
            variant: "destructive"
          });
          
          // Log blocked access attempt
          await logSecurityEvent(
            'usage',
            'blocked',
            `Tentativa de acesso quando limite atingido: ${resourceType}`
          );
          
          navigate('/usage-limit');
          return false;
        }
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

  // Detect suspicious activity
  const detectSuspiciousActivity = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Instead of using an RPC, implement the logic directly
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
      
      // Count recent access events
      const { data, error } = await supabase
        .from("security_events")
        .select("id")
        .eq("user_id", user.id)
        .eq("action_type", "usage")
        .gte("created_at", twoHoursAgo.toISOString())
        .count();
      
      if (error) {
        console.error('Error checking for suspicious activity:', error);
        return false;
      }
      
      const isSuspicious = data && data.count > 30; // Many accesses in 2 hours is suspicious
      const reason = isSuspicious ? 'Múltiplos acessos em curto período' : null;
      
      if (isSuspicious) {
        // Log suspicious activity
        await logSecurityEvent(
          'system',
          'warning',
          `Atividade suspeita detectada: ${reason || 'Múltiplos acessos'}`
        );
        
        toast({
          title: "Alerta de segurança",
          description: "Detectamos um padrão incomum de uso. Por favor, contate o suporte se você está tendo problemas.",
          variant: "destructive"
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in suspicious activity detection:', error);
      return false;
    }
  };

  return {
    verifyResourceAccess,
    logSecurityEvent,
    detectSuspiciousActivity,
    checkingAccess
  };
};
