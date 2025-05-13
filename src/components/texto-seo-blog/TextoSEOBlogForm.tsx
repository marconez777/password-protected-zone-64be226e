
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextoSEOBlogFormInputs } from './TextoSEOBlogFormInputs';
import { TextoSEOBlogResult } from './TextoSEOBlogResult';
import { TextoSEOBlogHistory } from './TextoSEOBlogHistory';
import { WEBHOOK_URL, TextoSEOBlogFormData } from './TextoSEOBlogSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextoSEOBlogFormSchema } from './TextoSEOBlogSchema';

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
              resourceType="texto_seo_blog"
              title="Texto SEO para Blog"
              description="Preencha as informações abaixo e clique em gerar seu texto otimizado para blog"
              onSubmit={handleFormSubmit}
              resultComponent={<TextoSEOBlogResult result={result} />}
            >
              <TextoSEOBlogFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <TextoSEOBlogHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
