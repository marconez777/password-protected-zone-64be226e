
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResourceLimits } from '@/hooks/useResourceLimits';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResourceFormProps } from '@/types/resource';

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
        // Run the onSubmit function provided by the parent component
        const success = await onSubmit();
        
        if (success) {
          toast({
            title: "Sucesso!",
            description: "Seu conteúdo foi gerado com sucesso.",
          });
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
        <div className="mt-6 border-t pt-6 px-6 pb-6">
          {resultComponent}
        </div>
      )}
    </Card>
  );
}
