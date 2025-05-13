
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Check, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  ArrowLeft,
  ChevronLeft, 
  ChevronDown,
  Globe,
  LayoutDashboard,
  LineChart,
  Link as LinkIcon,
  Eye,
  Zap,
  BarChart3,
  Users,
  Shield,
  MessageCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  return (
    <div className="bg-[#100F13] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#100F13]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/80cddf4b-f898-4979-b680-75558dfdc435.png" 
                  alt="MKRanker Logo" 
                  className="h-8" 
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-primary transition-colors">Home</Link>
              <a href="#features" className="text-white/80 hover:text-primary transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-white/80 hover:text-primary transition-colors">Planos</a>
              <a href="#testimonials" className="text-white/80 hover:text-primary transition-colors">Depoimentos</a>
              <a href="#contact" className="text-white/80 hover:text-primary transition-colors">Contato</a>
            </nav>
            
            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Teste Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0F0E12] border-b border-white/10 animate-fade-in">
            <div className="py-4 px-4 space-y-4">
              <Link to="/" className="block text-white py-2 hover:text-primary transition-colors">Home</Link>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-white/80 py-2 hover:text-primary transition-colors">Funcionalidades</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-white/80 py-2 hover:text-primary transition-colors">Planos</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block text-white/80 py-2 hover:text-primary transition-colors">Depoimentos</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-white/80 py-2 hover:text-primary transition-colors">Contato</a>
              <Link to="/register" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Teste Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6b46c1,#805ad5)] opacity-10 blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-fade-in">
                Domine os Rankings do Google com IA
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 animate-fade-in animation-delay-100">
                A plataforma de SEO que combina inteligência artificial com estratégias validadas para aumentar sua visibilidade.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-200">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                    Comece Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              {/* URL Analysis Input */}
              <div className="mt-10 max-w-md mx-auto animate-fade-in animation-delay-300">
                <div className="relative">
                  <Input
                    className="bg-white/5 border-white/20 text-white pl-4 pr-12 py-6 rounded-lg w-full focus:border-primary"
                    placeholder="Analise seu site: www.seusite.com.br"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 rounded-md p-2">
                    <Search className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Proof Section */}
        <section className="py-12 bg-[#0D0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-white/60 text-sm mb-6 animate-fade-in">
              Confiado por mais de 5.000 empresas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {/* Fake company logos - these would be actual client logos */}
              {['Empresa A', 'Empresa B', 'Empresa C', 'Empresa D', 'Empresa E'].map((company, index) => (
                <div 
                  key={index}
                  className="h-8 flex items-center justify-center text-white/40 text-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section with Tabs */}
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Funcionalidades Poderosas
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Ferramentas avançadas para otimizar seu SEO
              </p>
            </div>
            
            <Tabs defaultValue="analysis" className="animate-fade-in">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-[#1A1922]">
                <TabsTrigger value="analysis" className="data-[state=active]:text-primary">
                  <Search className="mr-2 h-4 w-4" />
                  Análise de SEO
                </TabsTrigger>
                <TabsTrigger value="onpage" className="data-[state=active]:text-primary">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Otimização On-Page
                </TabsTrigger>
                <TabsTrigger value="linkbuilding" className="data-[state=active]:text-primary">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Link Building
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="data-[state=active]:text-primary">
                  <LineChart className="mr-2 h-4 w-4" />
                  Monitoramento
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis" className="mt-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Análise completa de SEO
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Nosso sistema avançado de análise detecta problemas e oportunidades em seu site para melhorar seu posicionamento no Google.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Análise técnica de mais de 200 fatores', 
                        'Sugestões de palavras-chave prioritárias',
                        'Relatórios detalhados e acionáveis'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#1A1922] rounded-xl overflow-hidden shadow-xl animate-fade-in">
                    <AspectRatio ratio={16/9} className="bg-[#15141B]">
                      <div className="h-full w-full flex items-center justify-center text-white/30">
                        <Search className="h-12 w-12" />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="onpage" className="mt-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Otimização On-Page
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Ferramentas intuitivas para otimizar todos os elementos de suas páginas e melhorar seu ranking.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Editor de meta tags com preview em tempo real', 
                        'Otimizador de conteúdo com IA',
                        'Análise de densidade de palavras-chave'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#1A1922] rounded-xl overflow-hidden shadow-xl animate-fade-in">
                    <AspectRatio ratio={16/9} className="bg-[#15141B]">
                      <div className="h-full w-full flex items-center justify-center text-white/30">
                        <LayoutDashboard className="h-12 w-12" />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="linkbuilding" className="mt-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Link Building Estratégico
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Ferramentas para identificar e adquirir backlinks de qualidade que impulsionam sua autoridade.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Descoberta de oportunidades de backlinks', 
                        'Análise de perfil de links dos concorrentes',
                        'Monitoramento de links quebrados'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#1A1922] rounded-xl overflow-hidden shadow-xl animate-fade-in">
                    <AspectRatio ratio={16/9} className="bg-[#15141B]">
                      <div className="h-full w-full flex items-center justify-center text-white/30">
                        <LinkIcon className="h-12 w-12" />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monitoring" className="mt-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Monitoramento de Rankings
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Acompanhe o desempenho de suas palavras-chave no Google com atualizações diárias.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Tracking de posições por palavra-chave', 
                        'Relatórios de progresso com gráficos',
                        'Alertas de mudanças significativas'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#1A1922] rounded-xl overflow-hidden shadow-xl animate-fade-in">
                    <AspectRatio ratio={16/9} className="bg-[#15141B]">
                      <div className="h-full w-full flex items-center justify-center text-white/30">
                        <LineChart className="h-12 w-12" />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Benefits Section with Carousel */}
        <section className="py-24 bg-[#0D0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Benefícios Exclusivos
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Por que escolher o MKRanker para sua estratégia de SEO
              </p>
            </div>
            
            <Carousel
              className="w-full max-w-4xl mx-auto"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {[
                  {
                    icon: <Zap className="h-12 w-12 text-primary" />,
                    title: "Resultados Rápidos",
                    description: "Veja melhorias nos rankings do seu site em semanas, não meses, com nossas estratégias otimizadas."
                  },
                  {
                    icon: <BarChart3 className="h-12 w-12 text-primary" />,
                    title: "Análises Detalhadas",
                    description: "Relatórios completos e insights acionáveis para tomar decisões baseadas em dados concretos."
                  },
                  {
                    icon: <Users className="h-12 w-12 text-primary" />,
                    title: "Suporte Especializado",
                    description: "Nossa equipe de especialistas em SEO está disponível para ajudar você em cada etapa do processo."
                  },
                  {
                    icon: <Shield className="h-12 w-12 text-primary" />,
                    title: "Estratégias White Hat",
                    description: "Apenas técnicas aprovadas pelos motores de busca, garantindo resultados sustentáveis a longo prazo."
                  }
                ].map((benefit, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-[#1A1922] border-[#332F45] h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      <CardHeader className="flex flex-col items-center">
                        {benefit.icon}
                        <CardTitle className="mt-4 text-xl text-white">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-gray-400">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative mr-2 inset-auto bg-[#1A1922] border-none hover:bg-primary/20 text-white" />
                <CarouselNext className="relative ml-2 inset-auto bg-[#1A1922] border-none hover:bg-primary/20 text-white" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Como Funciona
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Um processo simples para impulsionar seu SEO
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "1",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  title: "Conecte seu site",
                  description: "Integre facilmente seu site para começar a análise completa."
                },
                {
                  number: "2",
                  icon: <Search className="h-10 w-10 text-primary" />,
                  title: "Receba análises",
                  description: "Nosso sistema examina seu site e identifica oportunidades de melhoria."
                },
                {
                  number: "3",
                  icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
                  title: "Implemente melhorias",
                  description: "Siga nossas recomendações personalizadas passo a passo."
                },
                {
                  number: "4",
                  icon: <LineChart className="h-10 w-10 text-primary" />,
                  title: "Acompanhe resultados",
                  description: "Veja seu site subir nos rankings e o tráfego aumentar."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  
                  {/* Connector line between steps (only visible on desktop) */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/4 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent -translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-[#0D0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Planos e Preços
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Escolha o plano ideal para suas necessidades
              </p>
              
              {/* Billing Toggle */}
              <div className="flex justify-center items-center mt-8">
                <span 
                  className={`mr-3 text-sm ${isAnnualBilling ? 'text-gray-400' : 'text-white font-medium'}`}
                >
                  Mensal
                </span>
                <button 
                  onClick={() => setIsAnnualBilling(!isAnnualBilling)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${isAnnualBilling ? 'bg-primary' : 'bg-gray-600'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnualBilling ? 'translate-x-7' : 'translate-x-1'}`}
                  />
                </button>
                <span 
                  className={`ml-3 text-sm ${isAnnualBilling ? 'text-white font-medium' : 'text-gray-400'}`}
                >
                  Anual <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs ml-1">-20%</span>
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Solo",
                  price: isAnnualBilling ? 79 : 97,
                  description: "Para freelancers e pequenos sites",
                  features: [
                    "Análise de até 100 páginas",
                    "Monitoramento de 50 palavras-chave",
                    "Análise técnica básica",
                    "Suporte por e-mail"
                  ],
                  cta: "Começar Agora",
                  highlight: false
                },
                {
                  name: "Discovery",
                  price: isAnnualBilling ? 159 : 197,
                  description: "Para pequenas e médias empresas",
                  features: [
                    "Análise de até 500 páginas",
                    "Monitoramento de 200 palavras-chave",
                    "Análise de concorrentes",
                    "Suporte prioritário",
                    "Integração com Google Analytics",
                    "Relatórios semanais"
                  ],
                  cta: "Escolher Discovery",
                  highlight: true
                },
                {
                  name: "Escala",
                  price: isAnnualBilling ? 319 : 397,
                  description: "Para médias e grandes empresas",
                  features: [
                    "Análise de sites ilimitados",
                    "Monitoramento de 1000 palavras-chave",
                    "Análise avançada de concorrentes",
                    "API completa",
                    "Suporte 24/7",
                    "Consultor dedicado",
                    "Integrações avançadas"
                  ],
                  cta: "Falar com Consultor",
                  highlight: false
                }
              ].map((plan, index) => (
                <Card 
                  key={index}
                  className={`animate-fade-in relative ${
                    plan.highlight 
                      ? "bg-primary/10 border-primary shadow-lg shadow-primary/20" 
                      : "bg-[#1A1922] border-[#332F45] hover:border-primary/50"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        Mais Popular
                      </div>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-white">R${plan.price}</span>
                      <span className="text-gray-400 ml-2">/mês</span>
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        plan.highlight 
                          ? "bg-primary hover:bg-primary/90" 
                          : "bg-[#2A2734] hover:bg-[#2A2734]/90"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Guarantees Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Nossa Garantia
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Compromisso com sua satisfação e sucesso
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-12 w-12 text-primary" />,
                  title: "Garantia de Satisfação",
                  description: "Garantia de 14 dias. Se não estiver satisfeito com os resultados, reembolsamos 100% do valor."
                },
                {
                  icon: <MessageCircle className="h-12 w-12 text-primary" />,
                  title: "Suporte Prioritário",
                  description: "Equipe especializada disponível para resolver suas dúvidas e oferecer o melhor suporte."
                },
                {
                  icon: <Clock className="h-12 w-12 text-primary" />,
                  title: "Resultados Comprovados",
                  description: "Metodologia testada e comprovada por centenas de clientes com resultados reais."
                }
              ].map((guarantee, index) => (
                <Card 
                  key={index}
                  className="bg-[#1A1922] border-[#332F45] hover:border-primary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-center">
                      {guarantee.icon}
                    </div>
                    <CardTitle className="text-center text-white mt-4">
                      {guarantee.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-400">
                      {guarantee.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-[#0D0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Baseado em mais de 300 avaliações positivas
              </p>
            </div>
            
            <Carousel
              className="w-full max-w-4xl mx-auto"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {[
                  {
                    quote: "MKRanker transformou completamente nossa estratégia de SEO. Em apenas 3 meses, aumentamos nosso tráfego orgânico em 87%.",
                    author: "Mariana Silva",
                    position: "CEO",
                    company: "TechSolutions",
                    rating: 5
                  },
                  {
                    quote: "A ferramenta mais completa e intuitiva que já usei para SEO. Os relatórios detalhados me ajudaram a identificar problemas que não sabia que existiam.",
                    author: "Ricardo Oliveira",
                    position: "Diretor de Marketing",
                    company: "E-commerce Express",
                    rating: 5
                  },
                  {
                    quote: "O suporte do MKRanker é excepcional. Sempre respondem rapidamente e oferecem soluções personalizadas para nosso negócio.",
                    author: "Ana Paula Mendes",
                    position: "Consultora de SEO",
                    company: "Agência Digital",
                    rating: 4
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/1">
                    <Card className="bg-[#1A1922] border-[#332F45]">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {/* Star rating */}
                          <div className="flex">
                            {Array(testimonial.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-primary" fill="#8260d0" />
                            ))}
                            {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-gray-600" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-lg mb-6 italic">"{testimonial.quote}"</p>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {testimonial.author.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-white">{testimonial.author}</p>
                            <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative mr-2 inset-auto bg-[#1A1922] border-none hover:bg-primary/20 text-white" />
                <CarouselNext className="relative ml-2 inset-auto bg-[#1A1922] border-none hover:bg-primary/20 text-white" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary/30 to-purple-800/30 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Receba dicas exclusivas de SEO
                </h2>
                <p className="text-gray-300 mb-8">
                  Inscreva-se em nossa newsletter para receber as últimas tendências, dicas e estratégias de SEO diretamente em seu e-mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <Input 
                    className="bg-white/5 border-white/20 text-white" 
                    placeholder="Seu melhor e-mail"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer id="contact" className="bg-[#0D0C10] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/80cddf4b-f898-4979-b680-75558dfdc435.png" 
                  alt="MKRanker Logo" 
                  className="h-8" 
                />
              </Link>
              <p className="text-gray-400 mb-4">
                Plataforma completa de SEO com inteligência artificial para otimizar seu posicionamento nos motores de busca.
              </p>
              <div className="flex space-x-4">
                {/* Social links */}
                {["facebook", "twitter", "instagram", "linkedin"].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-8 h-8 rounded-full bg-[#1A1922] flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 text-gray-400 hover:text-primary"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Navegação</h3>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Funcionalidades", href: "#features" },
                  { label: "Planos", href: "#pricing" },
                  { label: "Depoimentos", href: "#testimonials" }
                ].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Recursos</h3>
              <ul className="space-y-3">
                {[
                  { label: "Blog", href: "#" },
                  { label: "Tutoriais", href: "#" },
                  { label: "Webinars", href: "#" },
                  { label: "FAQ", href: "#" }
                ].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-5 h-5 text-primary mr-3"></div>
                  <span className="text-gray-400">contato@mkranker.com</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 text-primary mr-3"></div>
                  <span className="text-gray-400">(11) 95555-5555</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 text-primary mr-3"></div>
                  <span className="text-gray-400">São Paulo, SP</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#332F45] pt-8">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()} MKRanker. Todos os direitos reservados.
              </p>
              <div className="flex mt-4 md:mt-0 space-x-6">
                <a href="#" className="text-gray-500 hover:text-primary">Privacidade</a>
                <a href="#" className="text-gray-500 hover:text-primary">Termos de Uso</a>
                <a href="#" className="text-gray-500 hover:text-primary">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
