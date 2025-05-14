import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResourceLimits } from '@/hooks/useResourceLimits';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResourceFormProps } from '@/types/resource';
import { useUsageData } from '@/hooks/useUsageData';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * A reusable component that wraps forms for resources that have usage limits
 */
export function ResourceForm({
  resourceType,
  title,
  description,
  onSubmit,
  children,
  resultComponent,
}: ResourceFormProps) {
  const { checkResourceLimit, isChecking } = useResourceLimits();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { reload: reloadUsageData } = useUsageData();
  
  // Removed redundant plan check - useResourceLimits already does this
  const { planLimits } = useUsageData();
  
  const loading = isChecking || isSubmitting;

  // Determine if the resource is blocked by checking plan and limit
  const resourceLimit = planLimits ? planLimits[`${resourceType}_limit`] : null;
  const isResourceBlocked = resourceLimit === 0 || resourceLimit === null;

  if (isResourceBlocked) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-yellow-50 border border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {resourceLimit === 0 || resourceLimit === null
                ? 'Seu plano atual não permite mais uso deste recurso.'
                : 'Este recurso está temporariamente indisponível.'}
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 text-center">
            <Link to="/subscribe">
              <Button className="bg-mkranker-purple hover:bg-mkranker-dark-purple">
                Ver Planos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if the user has exceeded their limit, but don't increment yet
      // The actual increment will happen in useWebhookSubmission after success
      const canProceed = await checkResourceLimit(resourceType);

      if (canProceed) {
        // Run the onSubmit function provided by the parent component
        const success = await onSubmit();
        
        if (success) {
          toast({
            title: "Sucesso!",
            description: "Seu conteúdo foi gerado com sucesso.",
          });
          
          // Reload usage data to update the dashboard counts
          // This will be redundant since useWebhookSubmission also reloads,
          // but keeping it as a fallback
          reloadUsageData();
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast({
        title: "Erro na submissão",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="mt-6 border-t pt-6 px-6 pb-6">
          {resultComponent}
        </div>
      )}
    </Card>
  );
}
