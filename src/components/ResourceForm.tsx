
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResourceLimits, ResourceType } from '@/hooks/useResourceLimits';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ResourceFormProps {
  resourceType: ResourceType;
  title: string;
  description: string;
  webhookUrl?: string;
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
  resultComponent?: React.ReactNode;
}

/**
 * A reusable component that wraps forms for resources that have usage limits
 */
export function ResourceForm({
  resourceType,
  title,
  description,
  webhookUrl,
  onSubmit,
  children,
  resultComponent,
}: ResourceFormProps) {
  const { checkAndIncrementResource, isChecking } = useResourceLimits();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookResult, setWebhookResult] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if the user has exceeded their limit
      const canProceed = await checkAndIncrementResource(resourceType);

      if (canProceed) {
        if (webhookUrl) {
          // Process webhook directly in the ResourceForm if URL is provided
          // The actual form data will be collected and passed by the parent component
          // via the onSubmit function
          await processWebhookAndSaveResult();
        } else {
          // If no webhook URL is provided, just run the regular onSubmit
          await onSubmit();
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast({
        title: "Erro na submissão",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const processWebhookAndSaveResult = async () => {
    // This is a placeholder for the actual webhook processing logic
    // The parent component will provide the webhook URL and form data
    try {
      // Execute the onSubmit function, which should return the data to send to the webhook
      await onSubmit();
      
      // The actual webhook implementation will be in the specific form components
      // that will pass the webhookUrl and handle the form data
    } catch (error) {
      console.error('Error processing webhook:', error);
      toast({
        title: "Erro na integração",
        description: "Não foi possível conectar ao serviço de IA.",
        variant: "destructive",
      });
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
        variant: "destructive", // Changed from "warning" to "destructive"
      });
    }
  };

  const loading = isChecking || isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Processando...' : 'Enviar'}
          </Button>
        </CardFooter>
      </form>
      
      {/* Show the result component if provided */}
      {resultComponent && (
        <div className="mt-6 border-t pt-6">
          {resultComponent}
        </div>
      )}
    </Card>
  );
}

// Export the hook for webhooks to be used in individual form components
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
        variant: "destructive", // Changed from "warning" to "destructive"
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
