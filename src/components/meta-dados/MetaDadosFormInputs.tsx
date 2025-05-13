
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { MetaDadosFormData } from "./MetaDadosSchema";

export function MetaDadosFormInputs() {
  const { control } = useFormContext<MetaDadosFormData>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="nomeEmpresa"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Nome da Empresa / Loja / Blog <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite o nome do seu site" 
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
              Palavra Chave em Foco <span className="text-red-500">*</span>
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
        name="palavraRelacionada"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Palavra Relacionada <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite uma palavra-chave relacionada" 
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
        name="tipoPagina"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Tipo de Página <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Homepage, Blog, Produto..." 
                className="h-10" 
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
