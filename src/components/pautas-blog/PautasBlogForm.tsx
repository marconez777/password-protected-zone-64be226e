
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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function PautasBlogForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading } = useWebhookSubmission('pautas_blog', WEBHOOK_URL);
  
  const methods = useForm<PautasBlogFormData>({
    resolver: zodResolver(PautasBlogFormSchema),
    defaultValues: {
      palavraChave: '',
    }
  });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (methods.formState.isValid) {
      const values = methods.getValues();
      
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
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-6">
                Digite uma palavra-chave para gerar ideias de pautas
              </p>
              
              <FormProvider {...methods}>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <PautasBlogFormInputs />
                  
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
              <PautasBlogResult result={result} />
            </div>
          )}
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
