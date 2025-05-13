
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketTargetFormInputs } from './MarketTargetFormInputs';
import { MarketTargetResult } from './MarketTargetResult';
import { MarketTargetHistory } from './MarketTargetHistory';
import { WEBHOOK_URL } from './MarketTargetSchema';

export function MarketTargetForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading: isWebhookLoading } = useWebhookSubmission('market_target', WEBHOOK_URL);
  
  const handleFormSubmit = async () => {
    const values = document.querySelector('form')?.elements;
    if (!values) return false;
    
    // Extract form values
    const formData = {
      nicho: (values.namedItem('nicho') as HTMLInputElement)?.value || '',
      servico: (values.namedItem('servico') as HTMLInputElement)?.value || '',
      segmentos: (values.namedItem('segmentos') as HTMLInputElement)?.value || '',
      problema: (values.namedItem('problema') as HTMLTextAreaElement)?.value || '',
    };
    
    // O webhook será configurado posteriormente
    if (!WEBHOOK_URL) {
      console.log("Webhook URL não configurada ainda", formData);
      // Simular um resultado para testes
      setResult({ message: "Webhook ainda não configurado. Dados capturados com sucesso!" });
      return true;
    }
    
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
            resourceType="market_target"
            title="Mercado e Público Alvo"
            description="Preencha as informações abaixo e clique em gerar"
            webhookUrl={WEBHOOK_URL}
            onSubmit={handleFormSubmit}
            resultComponent={<MarketTargetResult result={result} />}
          >
            <MarketTargetFormInputs />
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <MarketTargetHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
