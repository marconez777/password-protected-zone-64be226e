
import { useState } from 'react';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFunnelFormInputs } from './SearchFunnelFormInputs';
import { SearchFunnelResult } from './SearchFunnelResult';
import { SearchFunnelHistory } from './SearchFunnelHistory';
import { WEBHOOK_URL, searchFunnelSchema } from './SearchFunnelSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { SearchFunnelFormValues } from './SearchFunnelSchema';
import { useToast } from '@/hooks/use-toast';

export function SearchFunnelForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('search_funnel', WEBHOOK_URL);
  const { toast } = useToast();
  
  const methods = useForm<SearchFunnelFormValues>({
    resolver: zodResolver(searchFunnelSchema),
    defaultValues: {
      microNicho: '',
      publicoAlvo: '',
      segmento: '',
    }
  });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (methods.formState.isValid) {
      const values = methods.getValues();
      
      try {
        const response = await submitToWebhook(values);
        if (response) {
          // Show success notification
          toast({
            title: "Sucesso",
            description: "Funil de busca gerado com sucesso!",
          });
          
          // Display the result
          console.log('Resposta do webhook:', response);
          
          // Garantir que o resultado seja exibido
          setResult(response);
          
          // Reset the form after successful submission
          methods.reset();
          return true;
        }
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        toast({
          title: "Erro",
          description: "Houve um erro ao gerar o funil de busca.",
          variant: "destructive",
        });
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
                  <SearchFunnelFormInputs />
                  
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
              <SearchFunnelResult result={result} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="historico">
          <SearchFunnelHistory 
            setActiveTab={setActiveTab} 
            setFormResult={setResult} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
