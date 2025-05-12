
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourceForm } from '@/components/ResourceForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const WEBHOOK_URL = 'https://mkseo77.app.n8n.cloud/webhook/f403ed72-e710-4b5d-a2bb-5c57679857d3';

// Schema for form validation
const searchFunnelSchema = z.object({
  microNicho: z.string().min(1, { message: 'O micro nicho é obrigatório' }),
  publicoAlvo: z.string().min(1, { message: 'O público alvo é obrigatório' }),
  segmento: z.string().min(1, { message: 'O segmento é obrigatório' }),
});

type SearchFunnelFormValues = z.infer<typeof searchFunnelSchema>;

export function SearchFunnelForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const { submitToWebhook, result, setResult, isLoading: isWebhookLoading } = useWebhookSubmission('search_funnel', WEBHOOK_URL);
  const { user } = useAuth();
  
  // Form setup with zod validation
  const form = useForm<SearchFunnelFormValues>({
    resolver: zodResolver(searchFunnelSchema),
    defaultValues: {
      microNicho: '',
      publicoAlvo: '',
      segmento: '',
    },
  });

  // Fetch previous results for history tab
  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['search-funnel-history'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('tipo_recurso', 'search_funnel')
        .order('data_criacao', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: activeTab === 'historico' && !!user,
  });

  const handleFormSubmit = async () => {
    const values = form.getValues();
    const response = await submitToWebhook(values);
    if (response) {
      // Reset the form after successful submission
      form.reset();
      return true;
    }
    return false;
  };

  const renderSearchFunnelResult = () => {
    if (!result) return null;
    
    try {
      return (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-bold">Resultado do Funil de Busca</h3>
          <div className="whitespace-pre-wrap bg-muted p-4 rounded-md overflow-auto max-h-[500px]">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      );
    } catch (error) {
      return <div className="text-destructive">Erro ao exibir resultado.</div>;
    }
  };

  const renderHistoryItem = (item: any) => {
    return (
      <Card key={item.id} className="p-4 mb-4">
        <h3 className="font-medium mb-2">Criado em: {new Date(item.data_criacao).toLocaleString('pt-BR')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Envio:</h4>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-[200px]">
              {JSON.stringify(item.input_original, null, 2)}
            </pre>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Resposta:</h4>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-[200px]">
              {JSON.stringify(item.output_gerado, null, 2)}
            </pre>
          </div>
        </div>
      </Card>
    );
  };

  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="microNicho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu Micro Nicho: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Soluções de Automação de Marketing" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="publicoAlvo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o Público Alvo: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: empreendedores" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="segmento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu segmento: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Agência, Freelancer, Empresa..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulario">
          <ResourceForm
            resourceType="search_funnel"
            title="Funil de Busca"
            description="Preencha as informações abaixo e clique em gerar"
            webhookUrl={WEBHOOK_URL}
            onSubmit={handleFormSubmit}
            resultComponent={renderSearchFunnelResult()}
          >
            {renderForm()}
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <div className="mt-4">
            {isHistoryLoading ? (
              <p>Carregando histórico...</p>
            ) : historyData && historyData.length > 0 ? (
              <div className="space-y-4">
                {historyData.map(renderHistoryItem)}
              </div>
            ) : (
              <p>Nenhum resultado encontrado no histórico.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
