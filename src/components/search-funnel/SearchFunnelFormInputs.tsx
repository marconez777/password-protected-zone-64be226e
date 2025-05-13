
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
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
                id="microNicho"
                placeholder="Ex: Soluções de Automação de Marketing" 
                required
                {...field} 
                className="mt-1"
              />
            </FormControl>
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
                id="publicoAlvo"
                placeholder="Ex: empreendedores" 
                required
                {...field} 
                className="mt-1"
              />
            </FormControl>
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
                id="segmento"
                placeholder="Ex: Agência, Freelancer, Empresa..." 
                required
                {...field} 
                className="mt-1"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
