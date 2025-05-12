
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResourceLimits, ResourceType } from '@/hooks/useResourceLimits';
import { Loader2 } from 'lucide-react';

interface ResourceFormProps {
  resourceType: ResourceType;
  title: string;
  description: string;
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
}

/**
 * A reusable component that wraps forms for resources that have usage limits
 */
export function ResourceForm({
  resourceType,
  title,
  description,
  onSubmit,
  children,
}: ResourceFormProps) {
  const { checkAndIncrementResource, isChecking } = useResourceLimits();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if the user has exceeded their limit
      const canProceed = await checkAndIncrementResource(resourceType);

      if (canProceed) {
        // If within limits, proceed with the actual submission
        await onSubmit();
      }
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
    </Card>
  );
}
