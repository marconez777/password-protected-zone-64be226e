
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFunnelFormInputs } from './SearchFunnelFormInputs';
import { SearchFunnelResult } from './SearchFunnelResult';
import { SearchFunnelHistory } from './SearchFunnelHistory';
import { WEBHOOK_URL, searchFunnelSchema } from './SearchFunnelSchema';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { SearchFunnelFormValues } from './SearchFunnelSchema';

export function SearchFunnelForm() {
  const [activeTab, setActiveTab] = useState<string>("formulario");
  const { submitToWebhook, isLoading, result, setResult } = useWebhookSubmission('search_funnel', WEBHOOK_URL);
  
  const form = useForm<SearchFunnelFormValues>({
    resolver: zodResolver(searchFunnelSchema),
    defaultValues: {
      microNicho: '',
      publicoAlvo: '',
      segmento: '',
    }
  });

  const onSubmit = async (values: SearchFunnelFormValues) => {
    const payload = {
      microNicho: values.microNicho,
      publicoAlvo: values.publicoAlvo,
      segmento: values.segmento,
    };
    
    const result = await submitToWebhook(payload);
    return !!result;
  };

  return (
    <Card className="shadow-sm">
      <Tabs defaultValue="formulario" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6 flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-2xl font-medium text-gray-800">Funil de Busca</h2>
            <p className="text-gray-500">Gere funis de busca para seu negócio</p>
          </div>
          <TabsList className="grid w-[250px] grid-cols-2">
            <TabsTrigger value="formulario">Formulário</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="formulario" className="space-y-4 px-6 pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <SearchFunnelFormInputs />
              
              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Processando...' : 'Enviar'}
                </Button>
              </div>
            </form>
          </Form>
          
          {result && (
            <div className="mt-6">
              <SearchFunnelResult result={result} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="historico" className="px-6 py-4">
          <SearchFunnelHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
