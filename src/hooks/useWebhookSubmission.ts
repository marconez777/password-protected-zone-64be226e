
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ResourceType, useResourceLimits } from '@/hooks/useResourceLimits';
import { useUsageData } from '@/hooks/useUsageData';

/**
 * Hook for handling webhook submissions with integrated database saving
 */
export function useWebhookSubmission(
  resourceType: ResourceType, 
  webhookUrl: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { reload: reloadUsageData } = useUsageData();
  const { checkAndIncrementResource } = useResourceLimits();

  const submitToWebhook = async (formData: any): Promise<any> => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para usar esta funcionalidade.",
        variant: "destructive",
      });
      return null;
    }

    if (!webhookUrl) {
      toast({
        title: "Erro de configuração",
        description: "URL do webhook não está configurada.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    
    // 1. Primeiro verificar/incrementar limite (ANTES de enviar o webhook)
    try {
      const canProceed = await checkAndIncrementResource(resourceType);
      if (!canProceed) {
        setIsLoading(false);
        return null;
      }
      
      // 2. Agora, enviar a requisição para o webhook
      console.log(`Enviando dados para o webhook: ${webhookUrl}`);
      console.log("Dados:", JSON.stringify(formData));
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Se falhou, aqui poderíamos adicionar código para decrementar o contador
        // Isso exigiria uma nova função no banco de dados
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultData = await response.json();
      console.log("Resposta do webhook:", resultData);
      
      // Set the result immediately after receiving it
      setResult(resultData);
      
      // 3. Se tudo deu certo, salvar no banco
      try {
        await saveResultToDatabase(resourceType, formData, resultData);
        
        // Reload usage data to update the dashboard counts
        reloadUsageData();
      } catch (error) {
        console.error('Error saving result to database:', error);
        // Even if saving fails, we still have the result displayed
        toast({
          title: "Aviso",
          description: "O resultado foi gerado mas não pôde ser salvo no histórico. Você pode tentar fazer login novamente.",
          variant: "default",
        });
        // Continue with the result even if saving fails
      }
      
      // Show success toast
      toast({
        title: "Sucesso",
        description: "Conteúdo gerado com sucesso!",
      });
      
      return resultData;
    } catch (error) {
      console.error('Error in webhook submission:', error);
      toast({
        title: "Erro na integração",
        description: "Não foi possível conectar ao serviço. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveResultToDatabase = async (tipoRecurso: string, inputOriginal: any, outputGerado: any) => {
    if (!user) return;
    
    try {
      // Check if session is valid before attempting to save
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('Session invalid or expired');
      }
      
      const { error } = await supabase.from('user_results').insert({
        user_id: user.id,
        tipo_recurso: tipoRecurso,
        input_original: inputOriginal,
        output_gerado: outputGerado,
        data_criacao: new Date().toISOString()
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error saving result to database:', error);
      throw error; // Let the calling function handle this error
    }
  };

  return {
    submitToWebhook,
    isLoading,
    result,
    setResult
  };
}
