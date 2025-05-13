
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
    // Get the form element
    const form = document.querySelector('form');
    if (!form) {
      console.error("Form element not found");
      return false;
    }
    
    // Extract form values manually
    const microNichoInput = form.querySelector('#microNicho') as HTMLInputElement;
    const publicoAlvoInput = form.querySelector('#publicoAlvo') as HTMLInputElement;
    const segmentoInput = form.querySelector('#segmento') as HTMLInputElement;
    
    if (!microNichoInput || !publicoAlvoInput || !segmentoInput) {
      console.error("Required form fields not found", { 
        microNicho: !!microNichoInput, 
        publicoAlvo: !!publicoAlvoInput, 
        segmento: !!segmentoInput 
      });
      return false;
    }
    
    // Build the form data
    const formData = {
      microNicho: microNichoInput.value,
      publicoAlvo: publicoAlvoInput.value,
      segmento: segmentoInput.value,
    };
    
    console.log("Sending data to webhook:", WEBHOOK_URL);
    console.log("Form data:", formData);
    
    // Submit data to webhook
    const response = await submitToWebhook(formData);
    if (response) {
      console.log("Response received from webhook:", response);
      // Reset the form after successful submission
      form.reset();
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
            <SearchFunnelFormInputs />
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <SearchFunnelHistory 
            setActiveTab={setActiveTab}
            setFormResult={setResult}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
