
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Placeholder for the N8N webhook URL - should be configured properly
const KEYWORD_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/keyword"; 

/**
 * Form component for keyword research with N8N integration
 */
export function KeywordResearchForm() {
  const [keywordTerm, setKeywordTerm] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  
  const {
    submitToWebhook,
    isLoading,
    result,
    setResult
  } = useWebhookSubmission('keyword', KEYWORD_WEBHOOK_URL);

  // This function prepares the data and submits to the webhook
  const handleSubmitKeywordResearch = async () => {
    // Basic validation
    if (!keywordTerm.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe uma palavra-chave para pesquisa.",
        variant: "destructive"
      });
      return;
    }

    // Prepare data for webhook
    const formData = {
      keyword: keywordTerm,
      notes: notes,
      timestamp: new Date().toISOString()
    };

    // Submit to webhook and get result
    await submitToWebhook(formData);
    
    // Reset form after successful submission
    if (!isLoading && result) {
      setKeywordTerm('');
      setNotes('');
    }
  };

  // Component to display the result
  const KeywordResultComponent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Gerando resultados...</p>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Resultados da pesquisa</h3>
          
          {/* This is a placeholder for displaying the actual result structure */}
          {/* The actual rendering will depend on the N8N response format */}
          <div className="space-y-4">
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ResourceForm
      resourceType="keyword"
      title="Pesquisa de Palavras-chave"
      description="Pesquise palavras-chave relevantes para o seu negócio"
      onSubmit={handleSubmitKeywordResearch}
      resultComponent={<KeywordResultComponent />}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="keyword">Palavra-chave</Label>
          <Input
            id="keyword"
            placeholder="Ex: marketing digital"
            value={keywordTerm}
            onChange={(e) => setKeywordTerm(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes">Anotações</Label>
          <Textarea
            id="notes"
            placeholder="Adicione anotações sobre esta palavra-chave"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </ResourceForm>
  );
}
