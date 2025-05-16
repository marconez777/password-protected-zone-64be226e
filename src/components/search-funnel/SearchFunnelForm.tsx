
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchFunnelFormData, SearchFunnelFormSchema, WEBHOOK_URL } from './SearchFunnelSchema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFunnelFormInputs } from './SearchFunnelFormInputs';
import { SearchFunnelResult } from './SearchFunnelResult';
import { SearchFunnelHistory } from './SearchFunnelHistory';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function SearchFunnelForm() {
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const methods = useForm<SearchFunnelFormData>({
    resolver: zodResolver(SearchFunnelFormSchema),
    defaultValues: {
      microNicho: '',
      publicoAlvo: '',
      segmento: '',
    }
  });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!methods.formState.isValid) {
      methods.trigger();
      return;
    }
    
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para usar esta funcionalidade.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const values = methods.getValues();
      
      console.log("Enviando dados para o webhook:", WEBHOOK_URL, values);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultData = await response.json();
      console.log("Resposta do webhook:", resultData);
      
      // Set the result immediately for display
      setResult(resultData);
      
      // Save to database
      await saveResultToDatabase(values, resultData);
      
      // Show success notification
      toast({
        title: "Sucesso",
        description: "Funil de busca gerado com sucesso!",
      });
      
      // Reset the form
      methods.reset();
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro",
        description: "Houve um erro ao gerar o funil de busca.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveResultToDatabase = async (inputOriginal: any, outputGerado: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase.from('user_results').insert({
        user_id: user.id,
        tipo_recurso: 'search_funnel',
        input_original: inputOriginal,
        output_gerado: outputGerado,
        data_criacao: new Date().toISOString()
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Erro ao salvar resultado no banco de dados:', error);
      toast({
        title: "Erro ao salvar resultado",
        description: "O resultado foi gerado mas não pôde ser salvo no banco de dados.",
        variant: "destructive",
      });
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
          
          {/* Display result */}
          <div className="mt-6">
            <SearchFunnelResult result={result} />
          </div>
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
