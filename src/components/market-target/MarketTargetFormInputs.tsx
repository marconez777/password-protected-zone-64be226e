
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function MarketTargetFormInputs() {
  return (
    <div className="space-y-6">
      <FormField
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
