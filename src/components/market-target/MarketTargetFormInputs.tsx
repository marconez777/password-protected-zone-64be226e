
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { MarketTargetFormData } from "./MarketTargetSchema";

export function MarketTargetFormInputs() {
  const form = useFormContext<MarketTargetFormData>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="nicho"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Qual o seu Nicho: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                id="nicho"
                placeholder="Ex: Marketing digital"
                required
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="servico"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Qual o Serviço em Foco: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                id="servico"
                placeholder="Ex: Tráfego pago"
                required
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="segmentos"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Quais são seus segmentos: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                id="segmentos"
                placeholder="Ex: Agência, Freelancer, Empresa..."
                required
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="problema"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Problema ou Necessidade: <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                id="problema"
                placeholder="Ex: Não está vendendo o quanto gostaria"
                rows={5}
                required
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
