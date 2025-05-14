
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle } from 'lucide-react';
import { usePlanContext } from '@/contexts/PlanContext';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Use a consistent color for the check icons
const Feature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Check className="h-4 w-4 text-primary" />
      <span>{children}</span>
    </div>
  );
};

const PlanCard = ({
  name,
  description,
  price,
  features,
  isPopular,
  buttonText = "Começar Agora",
  isActive = false,
  onClick
}: {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Card className={`flex flex-col justify-between ${isPopular ? 'border-primary' : ''} ${isActive ? 'border-green-500 shadow-lg' : ''}`}>
    <div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          {isActive && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Ativo
            </span>
          )}
        </div>
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
        variant={isPopular ? "default" : "outline"}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

export default function Subscribe() {
  const { user } = useAuth();
  const { subscription, loading, reload } = usePlanContext();
  const [debugMode, setDebugMode] = useState(false);

  // Recarregar dados quando a página for montada
  useEffect(() => {
    if (user) {
      reload();
    }
  }, [user, reload]);

  const handleSelectPlan = (planType: string) => {
    console.log(`Plano selecionado: ${planType}`);
    // Implementar seleção do plano - para desenvolvimento ainda sem integração de pagamento
    alert(`Plano ${planType} selecionado! (Implementar integração de pagamento)`);
  };

  // Determine o plano ativo
  const activePlan = subscription?.is_active ? subscription.plan_type : null;

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <div className="container py-10">
        <div className="text-center mb-10">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-2/4 mx-auto mt-2" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col justify-between">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Escolha o Plano Ideal para Você</h1>
        <p className="text-muted-foreground mt-2">
          Escale seu marketing digital com nossos planos completos. Todos incluem acesso às melhores ferramentas de SEO com IA.
        </p>
        
        {subscription && (
          <div className="mt-4">
            <Alert className="bg-blue-50 border-blue-200 max-w-lg mx-auto">
              <AlertTriangle className="h-4 w-4 text-blue-500" />
              <AlertTitle>Status da sua conta</AlertTitle>
              <AlertDescription>
                {subscription.is_active ? (
                  <span className="text-green-600">Sua assinatura está ativa! Plano: {subscription.plan_type}</span>
                ) : (
                  <span className="text-amber-600">Sua assinatura está inativa. Selecione um plano abaixo.</span>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        <button 
          onClick={() => setDebugMode(!debugMode)}
          className="text-xs text-gray-400 underline mt-2"
        >
          {debugMode ? "Ocultar informações de debug" : "Mostrar informações de debug"}
        </button>
        
        {debugMode && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md max-w-xl mx-auto text-left text-xs overflow-auto">
            <h3 className="font-bold mb-1">Informações de Debug:</h3>
            <pre>{JSON.stringify({ subscription, user: user?.id }, null, 2)}</pre>
          </div>
        )}
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
          isActive={activePlan === 'solo'}
          buttonText={activePlan === 'solo' ? "Plano Atual" : "Começar Agora"}
          onClick={() => handleSelectPlan('solo')}
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
          isActive={activePlan === 'discovery'}
          buttonText={activePlan === 'discovery' ? "Plano Atual" : "Começar Agora"}
          onClick={() => handleSelectPlan('discovery')}
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
          isActive={activePlan === 'escala'}
          buttonText={activePlan === 'escala' ? "Plano Atual" : "Começar Agora"}
          onClick={() => handleSelectPlan('escala')}
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

      {/* Botão para recarregar os dados (ajuda no desenvolvimento) */}
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            reload();
            alert('Dados recarregados!');
          }}
        >
          Recarregar dados da assinatura
        </Button>
      </div>
    </div>
  );
}
