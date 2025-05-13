
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResourceLimits } from '@/hooks/useResourceLimits';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { ResourceForm } from '@/components/ResourceForm';
import { KeywordResult } from './KeywordResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordHistory } from './KeywordHistory';

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
    <Card className="shadow-sm">
      <Tabs defaultValue="formulario" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6 flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-2xl font-medium text-gray-800">Palavras-chave Relacionadas</h2>
            <p className="text-gray-500">Digite uma palavra-chave para gerar sugestões relacionadas</p>
          </div>
          <TabsList className="grid w-[250px] grid-cols-2">
            <TabsTrigger value="formulario">Formulário</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="formulario" className="space-y-4 px-0 pt-4">
          <ResourceForm
            resourceType="keyword"
            title="Palavras-chave Relacionadas"
            description="Digite uma palavra-chave para gerar sugestões relacionadas"
            onSubmit={() => form.handleSubmit(onSubmit)()}
            resultComponent={result && <KeywordResult result={result} />}
          >
            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormField
                  control={form.control}
                  name="palavras_chave"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Palavra-chave em Foco <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Digite uma palavra-chave" 
                          className="h-10" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </ResourceForm>
        </TabsContent>
        
        <TabsContent value="historico">
          <KeywordHistory setActiveTab={setActiveTab} setFormResult={setResult} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
