
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketTargetFormInputs } from './MarketTargetFormInputs';
import { MarketTargetResult } from './MarketTargetResult';
import { MarketTargetHistory } from './MarketTargetHistory';
import { WEBHOOK_URL, MarketTargetFormData } from './MarketTargetSchema';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

export function MarketTargetForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading: isWebhookLoading } = useWebhookSubmission('market_target', WEBHOOK_URL);
  const form = useForm<MarketTargetFormData>();
  
  const handleFormSubmit = async () => {
    const values = form.getValues();
    
    // O webhook será configurado posteriormente
    if (!WEBHOOK_URL) {
      console.log("Webhook URL não configurada ainda", values);
      // Simular um resultado para testes
      setResult({ message: "Webhook ainda não configurado. Dados capturados com sucesso!" });
      return true;
    }
    
    const response = await submitToWebhook(values);
    if (response) {
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
            resourceType="market_target"
            title="Mercado e Público Alvo"
            description="Preencha as informações abaixo e clique em gerar"
            onSubmit={handleFormSubmit}
            resultComponent={<MarketTargetResult result={result} />}
          >
            <Form {...form}>
              <MarketTargetFormInputs />
            </Form>
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <MarketTargetHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
