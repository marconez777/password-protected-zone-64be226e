
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { searchFunnelSchema, SearchFunnelFormValues } from './SearchFunnelSchema';

interface SearchFunnelFormInputsProps {
  onSubmit: () => Promise<boolean | void>;
}

export function SearchFunnelFormInputs({ onSubmit }: SearchFunnelFormInputsProps) {
  // Form setup with zod validation
  const form = useForm<SearchFunnelFormValues>({
    resolver: zodResolver(searchFunnelSchema),
    defaultValues: {
      microNicho: '',
      publicoAlvo: '',
      segmento: '',
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="microNicho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu Micro Nicho: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Soluções de Automação de Marketing" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="publicoAlvo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o Público Alvo: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: empreendedores" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="segmento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu segmento: <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Agência, Freelancer, Empresa..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
