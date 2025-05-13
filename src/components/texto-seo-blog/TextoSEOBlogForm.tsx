
import { useState } from 'react';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextoSEOBlogFormInputs } from './TextoSEOBlogFormInputs';
import { TextoSEOBlogResult } from './TextoSEOBlogResult';
import { TextoSEOBlogHistory } from './TextoSEOBlogHistory';
import { WEBHOOK_URL, TextoSEOBlogFormSchema, TextoSEOBlogFormData } from './TextoSEOBlogSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourceForm } from '@/components/ResourceForm';

export function TextoSEOBlogForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('texto_seo_blog', WEBHOOK_URL);
  
  const methods = useForm<TextoSEOBlogFormData>({
    resolver: zodResolver(TextoSEOBlogFormSchema),
    defaultValues: {
      tema: '',
      palavraChave: '',
      palavrasRelacionadas: '',
      observacoes: ''
    }
  });
  
  const handleFormSubmit = async () => {
    if (methods.formState.isValid) {
      const values = methods.getValues();
      
      const response = await submitToWebhook(values);
      if (response) {
        // For responses from n8n that contain an "output" field
        if (response && typeof response.output === 'string') {
          console.log("Resposta formatada do webhook recebida:", response);
        }
        
        methods.reset();
        return true;
      }
    } else {
      // Trigger validation
      methods.trigger();
      return false;
    }
  };

  // Make sure the result is passed to TextoSEOBlogResult
  const resultComponent = result ? <TextoSEOBlogResult result={result} /> : null;

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
              resourceType="texto_seo_blog"
              title="Texto SEO para Blog"
              description="Preencha as informações abaixo e clique em gerar seu texto otimizado para blog"
              onSubmit={handleFormSubmit}
              resultComponent={resultComponent}
            >
              <TextoSEOBlogFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <TextoSEOBlogHistory 
            setActiveTab={setActiveTab} 
            setFormResult={setResult} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
