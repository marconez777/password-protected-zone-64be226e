
import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordResult } from './KeywordResult';
import { KeywordHistory } from './KeywordHistory';
import { ResourceForm } from '@/components/ResourceForm';

// Define schema for form
const formSchema = z.object({
  palavras_chave: z.string().min(1, "Por favor, informe pelo menos uma palavra-chave"),
});

type FormValues = z.infer<typeof formSchema>;

export const KeywordForm = () => {
  const [activeTab, setActiveTab] = useState("formulario");
  const { submitToWebhook, isLoading, result, setResult } = useWebhookSubmission('keyword', 'https://mkseo77.app.n8n.cloud/webhook/palavra-chave');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      palavras_chave: "",
    }
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      palavras_chave: values.palavras_chave,
    };
    
    const result = await submitToWebhook(payload);
    return !!result;
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
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Digite uma palavra-chave para gerar sugestões relacionadas
              </p>
              
              <FormProvider {...form}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="palavras_chave"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">
                          Palavra-chave em Foco <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <input 
                            placeholder="Digite uma palavra-chave" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      disabled={isLoading} 
                      className="bg-mkranker-purple hover:bg-mkranker-dark-purple"
                      onClick={() => form.handleSubmit(onSubmit)()}
                    >
                      {isLoading ? 'Processando...' : 'Enviar'}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </Card>
          
          {result && (
            <div className="mt-6">
              <KeywordResult result={result} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="historico">
          <KeywordHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
