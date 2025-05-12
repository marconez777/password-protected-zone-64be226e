
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ResourceType } from '@/hooks/useResourceLimits';

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

  const submitToWebhook = async (formData: any) => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para usar esta funcionalidade.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultData = await response.json();
      setResult(resultData);
      
      // Save to database
      await saveResultToDatabase(resourceType, formData, resultData);
      
      toast({
        title: "Sucesso!",
        description: "Seu conteúdo foi gerado com sucesso.",
      });
      
      return resultData;
    } catch (error) {
      console.error('Error in webhook submission:', error);
      toast({
        title: "Erro na integração",
        description: "Não foi possível conectar ao serviço de IA.",
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
      const { error } = await supabase.from('user_results').insert({
        user_id: user.id,
        tipo_recurso: tipoRecurso,
        input_original: inputOriginal,
        output_gerado: outputGerado
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error saving result to database:', error);
      toast({
        title: "Erro ao salvar resultado",
        description: "O resultado foi gerado mas não pôde ser salvo no banco de dados.",
        variant: "destructive",
      });
    }
  };

  return {
    submitToWebhook,
    isLoading,
    result,
    setResult
  };
}
