
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { TextoSEOBlogFormData } from "./TextoSEOBlogSchema";

export function TextoSEOBlogFormInputs() {
  const { control } = useFormContext<TextoSEOBlogFormData>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="tema"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Tema <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite o tema do texto" 
                className="h-10" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="palavraChave"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Palavra-chave em Foco <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite a palavra-chave principal" 
                className="h-10" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="palavrasRelacionadas"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Palavras-chave Relacionadas <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Digite uma palavra-chave por linha"
                className="min-h-[100px] resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="observacoes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Observações Relevantes (Opcional)
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Adicione informações adicionais ou contexto específico"
                className="min-h-[100px] resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
