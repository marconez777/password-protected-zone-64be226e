
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { PautasBlogFormData } from "./PautasBlogSchema";

export function PautasBlogFormInputs() {
  const { control } = useFormContext<PautasBlogFormData>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="palavraChave"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Palavra-chave <span className="text-red-500">*</span>
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
    </div>
  );
}
