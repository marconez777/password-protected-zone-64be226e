
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

// Use a consistent color for the check icons
const Feature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Check className="h-4 w-4 text-primary" /> {/* Use primary color consistently */}
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
  buttonText = "Assinar"
}: {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}) => (
  <Card className={`flex flex-col justify-between ${isPopular ? 'border-primary' : ''}`}>
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
      <Button className="w-full" variant={isPopular ? "default" : "outline"}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

export default function Subscribe() {
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Planos de Assinatura</h1>
        <p className="text-muted-foreground mt-2">
          Escolha o plano que melhor se adapta às suas necessidades
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <PlanCard
          name="Solo"
          description="Para profissionais iniciantes e freelancers"
          price="R$197"
          features={[
            "3 pesquisas de palavra-chave",
            "1 análise de mercado",
            "1 funil de busca",
            "5 textos SEO",
            "3 ideias de conteúdo",
            "10 metadados"
          ]}
        />
        
        <PlanCard
          name="Discovery"
          description="Para pequenas empresas e agências"
          price="R$397"
          features={[
            "15 pesquisas de palavra-chave",
            "5 análises de mercado",
            "5 funís de busca",
            "20 textos SEO",
            "10 ideias de conteúdo",
            "50 metadados"
          ]}
          isPopular={true}
        />
        
        <PlanCard
          name="Escala"
          description="Para empresas em crescimento e marcas estabelecidas"
          price="R$997"
          features={[
            "Pesquisas ilimitadas de palavra-chave",
            "Análises ilimitadas de mercado",
            "Funís de busca ilimitados",
            "Textos SEO ilimitados",
            "Ideias de conteúdo ilimitadas",
            "Metadados ilimitados"
          ]}
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
