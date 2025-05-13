
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function MarketTargetFormInputs() {
  return (
    <div className="space-y-6">
      <FormField name="nicho">
        <FormItem>
          <FormLabel className="text-base">
            Qual o seu Nicho: <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input 
              id="nicho" 
              name="nicho" 
              placeholder="Ex: Marketing digital"
              required 
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="servico">
        <FormItem>
          <FormLabel className="text-base">
            Qual o Serviço em Foco: <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input 
              id="servico" 
              name="servico" 
              placeholder="Ex: Tráfego pago"
              required 
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="segmentos">
        <FormItem>
          <FormLabel className="text-base">
            Quais são seus segmentos: <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input 
              id="segmentos" 
              name="segmentos" 
              placeholder="Ex: Agência, Freelancer, Empresa..."
              required 
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="problema">
        <FormItem>
          <FormLabel className="text-base">
            Problema ou Necessidade: <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Textarea 
              id="problema" 
              name="problema" 
              placeholder="Ex: Não está vendendo o quanto gostaria"
              rows={5}
              required 
            />
          </FormControl>
        </FormItem>
      </FormField>
    </div>
  );
}
