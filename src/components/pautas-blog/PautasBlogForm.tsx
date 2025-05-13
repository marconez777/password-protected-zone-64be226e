
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PautasBlogFormInputs } from './PautasBlogFormInputs';
import { PautasBlogResult } from './PautasBlogResult';
import { PautasBlogHistory } from './PautasBlogHistory';
import { WEBHOOK_URL, PautasBlogFormData } from './PautasBlogSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PautasBlogFormSchema } from './PautasBlogSchema';

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
              resourceType="pautas_blog"
              title="Pautas para Blog"
              description="Digite uma palavra-chave para gerar ideias de pautas"
              onSubmit={handleFormSubmit}
              resultComponent={<PautasBlogResult result={result} />}
            >
              <PautasBlogFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <PautasBlogHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
