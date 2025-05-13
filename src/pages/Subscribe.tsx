
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Feature component for plan cards
const Feature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Check className="h-4 w-4 text-primary" />
      <span>{children}</span>
    </div>
  );
};

// Plan card component
const PlanCard = ({
  name,
  description,
  price,
  features,
  isPopular,
  buttonText = "Começar Agora",
  onClick,
  loading,
  selectedPlan
}: {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onClick?: () => void;
  loading?: boolean;
  selectedPlan?: string;
}) => {
  const isSelected = selectedPlan === name.toLowerCase();
  
  return (
    <Card className={`flex flex-col justify-between ${isPopular ? 'border-primary' : ''} ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
          <div className="space-y-2">
            {features.map((feature, i) => (
              <Feature key={i}>{feature}</Feature>
            ))}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isPopular || isSelected ? "default" : "outline"}
          onClick={onClick}
          disabled={loading}
        >
          {loading && isSelected ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelect = async (planType: 'solo' | 'discovery' | 'escala') => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para adquirir um plano.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setSelectedPlan(planType);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('mercado-pago', {
        body: {
          planType,
          userId: user.id,
          successUrl: `${window.location.origin}/dashboard`,
          failureUrl: `${window.location.origin}/subscribe?error=payment_failed`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Não foi possível criar a sessão de pagamento");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast({
        title: "Erro ao processar pagamento",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar seu pagamento.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Escolha o Plano Ideal para Você</h1>
        <p className="text-muted-foreground mt-2">
          Escale seu marketing digital com nossos planos completos. Todos incluem acesso às melhores ferramentas de SEO com IA.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <PlanCard
          name="Solo"
          description="Plano para profissionais individuais"
          price="R$ 97"
          features={[
            "5 Pesquisas de Mercado",
            "3 Funis de Busca",
            "20 Pesquisas de Palavras Chave",
            "15 Textos Otimizados SEO",
            "5 Pesquisas de Pautas",
            "50 Gerações de Meta Dados",
            "Treinamentos Gravados",
            "Aulas Ao Vivo",
            "Mentoria em grupo (1 por mês)"
          ]}
          onClick={() => handlePlanSelect('solo')}
          loading={loading}
          selectedPlan={selectedPlan}
        />
        
        <PlanCard
          name="Discovery"
          description="Plano para pequenas empresas"
          price="R$ 297"
          features={[
            "15 Pesquisas de Mercado",
            "15 Funis de Busca",
            "60 Pesquisas de Palavras Chave",
            "60 Textos Otimizados SEO",
            "15 Pesquisas de Pautas",
            "100 Gerações de Meta Dados",
            "Treinamentos Gravados",
            "Aulas Ao Vivo",
            "Mentoria individual (1 por mês)"
          ]}
          isPopular={true}
          onClick={() => handlePlanSelect('discovery')}
          loading={loading}
          selectedPlan={selectedPlan}
        />
        
        <PlanCard
          name="Escala"
          description="Plano para empresas em crescimento"
          price="R$ 497"
          features={[
            "Todas as ferramentas ilimitadas:",
            "Pesquisas de Mercado ilimitadas",
            "Funis de Busca ilimitados",
            "Palavras Chave ilimitadas",
            "Textos Otimizados SEO ilimitados",
            "Pesquisas de Pautas ilimitadas",
            "Gerações de Meta Dados ilimitadas",
            "Treinamentos Gravados",
            "Aulas Ao Vivo",
            "Mentoria individual (2 por mês)"
          ]}
          onClick={() => handlePlanSelect('escala')}
          loading={loading}
          selectedPlan={selectedPlan}
        />
      </div>

      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-2">Não encontrou o que precisava?</h2>
        <p className="text-muted-foreground">
          Entre em contato conosco para saber mais sobre nossos planos corporativos.
        </p>
        <Button variant="link" className="mt-2">
          Fale com nossa equipe
        </Button>
      </div>
    </div>
  );
}
