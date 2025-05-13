
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { SearchFunnelFormValues } from './SearchFunnelSchema';

export function SearchFunnelFormInputs() {
  const { control } = useFormContext<SearchFunnelFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="microNicho"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Qual o seu Micro Nicho: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Soluções de Automação de Marketing" 
                className="mt-1"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="publicoAlvo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Qual o Público Alvo: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: empreendedores" 
                className="mt-1"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="segmento"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Qual o seu segmento: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Agência, Freelancer, Empresa..." 
                className="mt-1"
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
