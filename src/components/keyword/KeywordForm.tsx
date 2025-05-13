
import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordResult } from './KeywordResult';
import { KeywordHistory } from './KeywordHistory';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// Define schema for form
const formSchema = z.object({
  palavras_chave: z.string().min(1, "Por favor, informe pelo menos uma palavra-chave"),
});

type FormValues = z.infer<typeof formSchema>;

// URL do webhook específico para Palavras-chave
const WEBHOOK_URL = 'https://mkseo77.app.n8n.cloud/webhook/palavra-chave';

export const KeywordForm = () => {
  const [activeTab, setActiveTab] = useState("formulario");
  const { submitToWebhook, isLoading, result, setResult } = useWebhookSubmission('keyword', WEBHOOK_URL);
  
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
    if (result) {
      form.reset();
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
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-6">
                Preencha as informações abaixo e clique em gerar
              </p>
              
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="palavras_chave"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Palavra-chave em Foco <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite uma palavra-chave" 
                            className="mt-1"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
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
              </FormProvider>
            </CardContent>
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
