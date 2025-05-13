
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetaDadosFormSchema, MetaDadosFormData, WEBHOOK_URL } from "./MetaDadosSchema";
import { Loader2 } from "lucide-react";
import { useWebhookSubmission } from "@/hooks/useWebhookSubmission";
import { MetaDadosResult } from "./MetaDadosResult";
import { MetaDadosHistory } from "./MetaDadosHistory";
import { useResourceLimits } from "@/hooks/useResourceLimits";

export const MetaDadosForm = () => {
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const { toast } = useToast();
  const { submitToWebhook, isLoading } = useWebhookSubmission();
  const { checkAndUpdateLimit } = useResourceLimits();

  const form = useForm<MetaDadosFormData>({
    resolver: zodResolver(MetaDadosFormSchema),
    defaultValues: {
      nomeEmpresa: "",
      palavraChave: "",
      palavraRelacionada: "",
      tipoPagina: "",
    },
  });

  const onSubmit = async (data: MetaDadosFormData) => {
    const canProceed = await checkAndUpdateLimit("meta-dados");
    if (!canProceed) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de uso para Meta Dados. Atualize seu plano para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await submitToWebhook<MetaDadosFormData>(WEBHOOK_URL, data);
      setResultData(result);
      setShowResult(true);
      form.reset();
      toast({
        title: "Sucesso!",
        description: "Seus meta dados foram gerados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast({
        title: "Erro",
        description: "Houve um erro ao gerar seus meta dados. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setShowResult(false);
  };

  if (showResult && resultData) {
    return <MetaDadosResult data={resultData} onBack={handleBack} />;
  }

  return (
    <div className="grid gap-6">
      <MetaDadosHistory />
      
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-white">Gerar Meta Dados</CardTitle>
          <CardDescription className="text-gray-400">
            Preencha o formulário abaixo para obter meta tags e descrições otimizadas para SEO.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="nomeEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nome da Empresa/Loja/Blog</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Digite o nome da sua empresa" 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="palavraChave"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Palavra-Chave Principal</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Marketing Digital" 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="palavraRelacionada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Palavras-Chave Relacionadas</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Separe por vírgulas: SEO, Marketing de Conteúdo, etc." 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tipoPagina"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Tipo de Página</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Selecione o tipo de página" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="homepage">Página Inicial</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="product">Página de Produto</SelectItem>
                          <SelectItem value="category">Página de Categoria</SelectItem>
                          <SelectItem value="about">Sobre Nós</SelectItem>
                          <SelectItem value="contact">Contato</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-mkranker-purple hover:bg-mkranker-dark-purple"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando Meta Dados...
                  </>
                ) : (
                  "Gerar Meta Dados"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
