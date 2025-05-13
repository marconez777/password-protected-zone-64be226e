
import { useState } from 'react';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaDadosFormInputs } from './MetaDadosFormInputs';
import { MetaDadosResult } from './MetaDadosResult';
import { MetaDadosHistory } from './MetaDadosHistory';
import { WEBHOOK_URL, MetaDadosFormData, MetaDadosFormSchema } from './MetaDadosSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourceForm } from '@/components/ResourceForm';

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
    if (methods.formState.isValid) {
      const values = methods.getValues();
      console.log("Enviando dados para webhook:", values);
      
      const response = await submitToWebhook(values);
      if (response) {
        methods.reset();
        return true;
      }
    } else {
      // Trigger validation
      methods.trigger();
      return false;
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulario">
          <FormProvider {...methods}>
            <ResourceForm
              resourceType="metadata_generation"
              title="Geração de Meta Dados"
              description="Preencha as informações abaixo para gerar meta dados otimizados"
              onSubmit={handleFormSubmit}
              resultComponent={<MetaDadosResult result={result} />}
            >
              <MetaDadosFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <MetaDadosHistory 
            setActiveTab={setActiveTab} 
            setFormResult={setResult} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
