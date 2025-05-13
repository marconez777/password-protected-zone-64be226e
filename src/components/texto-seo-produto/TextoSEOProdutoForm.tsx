
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextoSEOProdutoFormInputs } from './TextoSEOProdutoFormInputs';
import { TextoSEOProdutoResult } from './TextoSEOProdutoResult';
import { TextoSEOProdutoHistory } from './TextoSEOProdutoHistory';
import { WEBHOOK_URL, TextoSEOProdutoFormData } from './TextoSEOProdutoSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextoSEOProdutoFormSchema } from './TextoSEOProdutoSchema';

export function TextoSEOProdutoForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('texto_seo_produto', WEBHOOK_URL);
  
  const methods = useForm<TextoSEOProdutoFormData>({
    resolver: zodResolver(TextoSEOProdutoFormSchema),
    defaultValues: {
      nomeProduto: '',
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
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulario">
          <FormProvider {...methods}>
            <ResourceForm
              resourceType="texto_seo_produto"
              title=""
              description="Preencha as informações abaixo e clique em gerar seu texto otimizado para produto"
              onSubmit={handleFormSubmit}
              resultComponent={<TextoSEOProdutoResult result={result} />}
            >
              <TextoSEOProdutoFormInputs />
            </ResourceForm>
          </FormProvider>
        </TabsContent>
        
        <TabsContent value="historico">
          <TextoSEOProdutoHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
