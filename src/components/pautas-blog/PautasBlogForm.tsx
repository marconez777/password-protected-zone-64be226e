
import { useState } from 'react';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PautasBlogFormInputs } from './PautasBlogFormInputs';
import { PautasBlogResult } from './PautasBlogResult';
import { PautasBlogHistory } from './PautasBlogHistory';
import { WEBHOOK_URL, PautasBlogFormData } from './PautasBlogSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PautasBlogFormSchema } from './PautasBlogSchema';
import { ResourceForm } from '@/components/ResourceForm';

export function PautasBlogForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('pautas_blog', WEBHOOK_URL);
  
  const methods = useForm<PautasBlogFormData>({
    resolver: zodResolver(PautasBlogFormSchema),
    defaultValues: {
      palavraChave: '',
    }
  });
  
  const handleFormSubmit = async () => {
    if (methods.formState.isValid) {
      const values = methods.getValues();
      
      const response = await submitToWebhook(values);
      if (response) {
        // Make sure we set the result correctly
        console.log("Response received from webhook:", response);
        methods.reset();
        return true;
      }
    } else {
      // Trigger validation
      methods.trigger();
      return false;
    }
  };

  // Debug log to see the result structure
  console.log("Current result state:", result);

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
              resourceType="pautas_blog"
              title="Ideias de Pautas para Blog"
              description="Digite uma palavra-chave para gerar ideias de pautas para seu blog"
              onSubmit={handleFormSubmit}
              resultComponent={<PautasBlogResult result={result} />}
            >
              <PautasBlogFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <PautasBlogHistory 
            setActiveTab={setActiveTab} 
            setFormResult={setResult} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
