
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextoSEOLPFormInputs } from './TextoSEOLPFormInputs';
import { TextoSEOLPResult } from './TextoSEOLPResult';
import { TextoSEOLPHistory } from './TextoSEOLPHistory';
import { WEBHOOK_URL, TextoSEOLPFormData } from './TextoSEOLPSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextoSEOLPFormSchema } from './TextoSEOLPSchema';

export function TextoSEOLPForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('texto_seo_lp', WEBHOOK_URL);
  
  const methods = useForm<TextoSEOLPFormData>({
    resolver: zodResolver(TextoSEOLPFormSchema),
    defaultValues: {
      tema: '',
      palavraChave: '',
      palavrasRelacionadas: '',
      observacoes: ''
    }
  });
  
  const handleFormSubmit = async () => {
    const values = methods.getValues();
    
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
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulario">
          <FormProvider {...methods}>
            <ResourceForm
              title=""
              description="Preencha as informações abaixo e clique em gerar seu texto otimizado"
              onSubmit={handleFormSubmit}
              resultComponent={<TextoSEOLPResult result={result} />}
            >
              <TextoSEOLPFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <TextoSEOLPHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
