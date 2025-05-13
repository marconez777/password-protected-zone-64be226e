
import { useState } from 'react';
import { ResourceForm } from '@/components/ResourceForm';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketTargetFormInputs } from './MarketTargetFormInputs';
import { MarketTargetResult } from './MarketTargetResult';
import { MarketTargetHistory } from './MarketTargetHistory';
import { WEBHOOK_URL, MarketTargetFormData, MarketTargetFormSchema } from './MarketTargetSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function MarketTargetForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('market_target', WEBHOOK_URL);
  
  const methods = useForm<MarketTargetFormData>({
    resolver: zodResolver(MarketTargetFormSchema),
    defaultValues: {
      nicho: '',
      servico: '',
      segmentos: '',
      problema: ''
    }
  });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (methods.formState.isValid) {
      const values = methods.getValues();
      
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
                Preencha as informações abaixo e clique em gerar
              </p>
              
              <FormProvider {...methods}>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <MarketTargetFormInputs />
                  
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
              <MarketTargetResult result={result} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="historico">
          <MarketTargetHistory 
            setActiveTab={setActiveTab} 
            setFormResult={setResult} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
