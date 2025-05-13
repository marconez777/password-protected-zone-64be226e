
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaDadosFormInputs } from './MetaDadosFormInputs';
import { MetaDadosResult } from './MetaDadosResult';
import { MetaDadosHistory } from './MetaDadosHistory';
import { WEBHOOK_URL, MetaDadosFormData } from './MetaDadosSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MetaDadosFormSchema } from './MetaDadosSchema';

export function MetaDadosForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('metadata_generation', WEBHOOK_URL);
  
  const methods = useForm<MetaDadosFormData>({
    resolver: zodResolver(MetaDadosFormSchema),
    defaultValues: {
      nomeEmpresa: '',
      palavraChave: '',
      palavraRelacionada: '',
      tipoPagina: ''
    }
  });
  
  const handleFormSubmit = async () => {
    const values = methods.getValues();
    
    if (!WEBHOOK_URL) {
      console.log("Webhook URL não configurada ainda", values);
      setResult({ message: "Webhook ainda não configurado. Dados capturados com sucesso!" });
      return true;
    }
    
    const response = await submitToWebhook(values);
    if (response) {
      methods.reset();
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
          <FormProvider {...methods}>
            <ResourceForm
              resourceType="metadata_generation"
              title="Meta Dados"
              description="Preencha as informações abaixo para gerar meta dados otimizados"
              onSubmit={handleFormSubmit}
              resultComponent={<MetaDadosResult result={result} />}
            >
              <MetaDadosFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <MetaDadosHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
