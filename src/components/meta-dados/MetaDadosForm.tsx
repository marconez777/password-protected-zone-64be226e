
import { useState } from 'react';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaDadosFormInputs } from './MetaDadosFormInputs';
import { MetaDadosResult } from './MetaDadosResult';
import { MetaDadosHistory } from './MetaDadosHistory';
import { WEBHOOK_URL, MetaDadosFormData, MetaDadosFormSchema } from './MetaDadosSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (methods.formState.isValid) {
      const values = methods.getValues();
      console.log("Enviando dados para webhook:", values);
      
      if (!WEBHOOK_URL) {
        console.log("Webhook URL não configurada ainda", values);
        setResult({ message: "Webhook ainda não configurado. Dados capturados com sucesso!" });
        return true;
      }
      
      const response = await submitToWebhook(values);
      console.log("Resposta do webhook:", response);
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
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-6">
                Preencha as informações abaixo para gerar meta dados otimizados
              </p>
              
              <FormProvider {...methods}>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <MetaDadosFormInputs />
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading} className="bg-mkranker-purple hover:bg-mkranker-dark-purple">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isLoading ? 'Processando...' : 'Enviar'}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
          
          {result && (
            <div className="mt-6">
              <MetaDadosResult result={result} />
            </div>
          )}
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
