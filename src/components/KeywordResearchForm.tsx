
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResourceForm } from '@/components/ResourceForm';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

/**
 * Example component that uses the ResourceForm to handle keyword research
 */
export function KeywordResearchForm() {
  const [keywordTerm, setKeywordTerm] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  // This function would contain the actual logic for submitting the keyword research
  const handleSubmitKeywordResearch = async () => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would actually submit the keyword research data to your API
    
    // Show success message
    toast({
      title: "Pesquisa enviada",
      description: `A pesquisa para "${keywordTerm}" foi enviada com sucesso.`,
    });
    
    // Reset form
    setKeywordTerm('');
    setNotes('');
  };

  return (
    <ResourceForm
      resourceType="keyword"
      title="Pesquisa de Palavras-chave"
      description="Pesquise palavras-chave relevantes para o seu negócio"
      onSubmit={handleSubmitKeywordResearch}
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
