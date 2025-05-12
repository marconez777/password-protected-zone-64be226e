
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResourceLimits, ResourceType } from '@/hooks/useResourceLimits';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResourceFormProps } from '@/types/resource';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';

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

// Re-export the webhook hook for convenience
export { useWebhookSubmission };
