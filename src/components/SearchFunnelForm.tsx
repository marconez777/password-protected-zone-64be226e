
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFunnelFormInputs } from './search-funnel/SearchFunnelFormInputs';
import { SearchFunnelResult } from './search-funnel/SearchFunnelResult';
import { SearchFunnelHistory } from './search-funnel/SearchFunnelHistory';
import { WEBHOOK_URL } from './search-funnel/SearchFunnelSchema';

export function SearchFunnelForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading: isWebhookLoading } = useWebhookSubmission('search_funnel', WEBHOOK_URL);
  
  const handleFormSubmit = async () => {
    const values = document.querySelector('form')?.elements;
    if (!values) return false;
    
    // Extract form values
    const formData = {
      microNicho: (values.namedItem('microNicho') as HTMLInputElement)?.value || '',
      publicoAlvo: (values.namedItem('publicoAlvo') as HTMLInputElement)?.value || '',
      segmento: (values.namedItem('segmento') as HTMLInputElement)?.value || '',
    };
    
    const response = await submitToWebhook(formData);
    if (response) {
      // Reset the form after successful submission
      (document.querySelector('form') as HTMLFormElement)?.reset();
      return true;
    }
    return false;
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulario">
          <ResourceForm
            resourceType="search_funnel"
            title="Funil de Busca"
            description="Preencha as informações abaixo e clique em gerar"
            webhookUrl={WEBHOOK_URL}
            onSubmit={handleFormSubmit}
            resultComponent={<SearchFunnelResult result={result} />}
          >
            <SearchFunnelFormInputs onSubmit={handleFormSubmit} />
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <SearchFunnelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
