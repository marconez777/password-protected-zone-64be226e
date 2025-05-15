
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Definindo o esquema de validação com Zod
const cadastroSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

const Cadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const form = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: CadastroFormData) => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      // Verificar se o email já está cadastrado antes de tentar criar o usuário
      const { data: existingUsers, error: checkError } = await supabase
        .from('user_status')
        .select('user_id')
        .eq('user_id', (await supabase.auth.admin.listUsers({ email: data.email })).data.users?.[0]?.id || '');

      if (checkError) {
        console.log("Erro ao verificar usuário existente:", checkError);
        // Continuamos com o cadastro mesmo se houver erro na verificação
      }

      if (existingUsers && existingUsers.length > 0) {
        throw new Error("Este email já está cadastrado.");
      }
      
      // Registrar o usuário no Supabase Auth
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            nome: data.nome
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Se o usuário é o admin, definimos como aprovado automaticamente
      if (data.email === 'contato@mkart.com.br') {
        // Para o admin, já aprovamos automaticamente (embora isso também esteja no trigger)
        const { error: updateError } = await supabase
          .from('user_status')
          .update({ approved: true })
          .eq('user_id', authData?.user?.id || '');
          
        if (updateError) {
          console.error("Erro ao aprovar admin:", updateError);
          // Não interrompemos o fluxo por causa deste erro
        }
      }
      
      toast.success("Cadastro realizado com sucesso!");
      navigate("/cadastro-enviado");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      
      if (error.message.includes("already registered") || error.message.includes("já está cadastrado")) {
        setErrorMessage("Este email já está cadastrado.");
        toast.error("Este email já está cadastrado.");
      } else if (error.message.includes("Database error saving new user")) {
        // Se for o erro específico que estamos enfrentando
        setErrorMessage("Erro ao salvar os dados do usuário. Por favor, tente novamente ou contate o suporte.");
        toast.error("Erro ao salvar os dados do usuário.");
      } else {
        setErrorMessage(error.error_description || error.message || "Erro ao realizar cadastro. Tente novamente.");
        toast.error("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
          <CardDescription>
            Preencha seus dados para criar uma nova conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription>
                      Mínimo de 6 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cadastro;
