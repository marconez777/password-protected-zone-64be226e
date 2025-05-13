import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, UserPlus, ArrowRight, CheckCircle, ChevronRight, Star, ChevronLeft, Users, FileText, Database, Code, Search, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-mkranker-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const featuresData = [
    {
      id: "mercado-publico",
      title: "Mercado e Público Alvo",
      description: "Entenda seu mercado e público-alvo com análises detalhadas geradas por IA. Receba insights valiosos sobre tendências, comportamento do consumidor e oportunidades.",
      icon: <Users className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "funil-busca",
      title: "Mapeamento do Funil",
      description: "Analise e otimize cada etapa do funil de busca dos usuários. Identifique oportunidades de melhoria e crie estratégias eficientes para aumentar conversões.",
      icon: <Search className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "palavras-chave", 
      title: "Palavras Chaves",
      description: "Descubra as melhores palavras-chave para seu negócio com nossa análise avançada de IA. Identifique termos de alto potencial e baixa competição.",
      icon: <Database className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "texto-seo-lp",
      title: "Texto SEO para LP", 
      description: "Gere textos otimizados para SEO específicos para Landing Pages que convertem e ranqueiam nos buscadores.",
      icon: <FileText className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "texto-seo-ecommerce",
      title: "Texto SEO para E-commerce",
      description: "Crie descrições de produtos otimizadas para SEO que aumentam as vendas e a visibilidade nos mecanismos de busca.",
      icon: <FileText className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "texto-seo-blog",
      title: "Texto SEO para Blog",
      description: "Produza artigos otimizados para SEO que engajam leitores e melhoram o posicionamento do seu site nos resultados de pesquisa.",
      icon: <FileText className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "meta-dados",
      title: "Meta Dados",
      description: "Otimize title tags, meta descriptions e outros elementos técnicos de SEO para melhorar o CTR nos resultados de pesquisa.",
      icon: <Code className="h-12 w-12 text-mkranker-purple" />
    },
    {
      id: "pautas-blog",
      title: "Pautas para Blog",
      description: "Descubra temas relevantes para seu blog que atendem às necessidades do seu público-alvo e têm potencial de ranqueamento.",
      icon: <FileText className="h-12 w-12 text-mkranker-purple" />
    }
  ];

  const benefitsData = [
    {
      title: "IA Avançada para Resultados Superiores",
      description: "Nossas ferramentas utilizam Gemini e ChatGPT para análises profundas e criação de estratégias de SEO de alta performance.",
      icon: <Zap className="h-12 w-12 text-mkranker-purple" />
    },
    {
      title: "Automação Inteligente de Conteúdo",
      description: "Gere textos otimizados para blogs, LPs e e-commerce, economizando tempo e garantindo qualidade.",
      icon: <Database className="h-12 w-12 text-mkranker-purple" />
    },
    {
      title: "Estratégias de SEO Comprovadas",
      description: "Acesse pautas, palavras-chave e meta dados validados para impulsionar seu ranking.",
      icon: <Shield className="h-12 w-12 text-mkranker-purple" />
    }
  ];

  const testimonialData = [
    {
      name: "Dr. Gabriel Psiquiatra",
      rating: 5,
      title: "100k de Tráfego em 6 Meses",
      description: "Estratégias de SEO personalizadas para o setor da saúde que geraram crescimento expressivo."
    },
    {
      name: "Diego Castro",
      rating: 5,
      title: "110k de Tráfego em 3 Meses",
      description: "Otimização de conteúdo e SEO técnico que triplicaram o tráfego orgânico rapidamente."
    }
  ];

  const pricingData = [
    {
      name: "Solo",
      description: "Plano para profissionais individuais",
      price: "R$ 47",
      period: "/mês",
      features: [
        "5 Pesquisas de Mercado",
        "5 Funis de Busca",
        "20 Pesquisas de Palavras Chave",
        "5 Textos para Blog",
        "5 Meta Dados",
        "5 Pautas para Blog"
      ],
      cta: "Começar Agora",
      popular: false
    },
    {
      name: "Discovery",
      description: "Plano para pequenas empresas",
      price: "R$ 97",
      period: "/mês",
      features: [
        "15 Pesquisas de Mercado",
        "15 Funis de Busca", 
        "60 Pesquisas de Palavras Chave",
        "15 Textos para Blog",
        "15 Meta Dados",
        "15 Pautas para Blog"
      ],
      cta: "Começar Agora",
      popular: true
    },
    {
      name: "Escala",
      description: "Plano para empresas em crescimento",
      price: "R$ 197",
      period: "/mês",
      features: [
        "Todas as ferramentas ilimitadas",
        "Pesquisas de Mercado ilimitadas",
        "Funis de Busca ilimitados",
        "Pesquisas de Palavras Chave ilimitadas",
        "Textos SEO ilimitados",
        "Meta Dados ilimitados",
        "Pautas de Blog ilimitadas"
      ],
      cta: "Começar Agora",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f13]/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center">
            <div className="mr-8">
              <div className="rounded-md bg-mkranker-purple w-12 h-12 flex items-center justify-center text-white font-bold text-2xl">
                M
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition">
                  <span>Recursos</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:rotate-90 transition-transform" />
                </button>
                <div className="absolute left-0 mt-2 w-72 bg-[#1a1a2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[#2a2a3e] z-50">
                  <div className="p-4 grid gap-2">
                    {featuresData.slice(0, 6).map((feature) => (
                      <Link 
                        key={feature.id}
                        to={`/${feature.id}`} 
                        className="flex items-start p-3 rounded-md hover:bg-[#2a2a3e] transition"
                      >
                        <div className="shrink-0 text-mkranker-purple mr-3">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{feature.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition">Preços</Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
              <Link to="/trainings" className="text-gray-300 hover:text-white transition">Treinamentos</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild className="bg-mkranker-purple hover:bg-mkranker-dark-purple text-white">
                <Link to="/dashboard">
                  Acessar Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hidden md:flex">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-mkranker-purple hover:bg-mkranker-dark-purple text-white">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrar
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden animated-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] opacity-80"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-mkranker-purple/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-mkranker-light-purple/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Potencialize seu SEO com <span className="text-mkranker-purple">Inteligência Artificial</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              MKRanker conecta seu negócio com as mais avançadas tecnologias de IA (Gemini e Chat GPT) para gerar análises de mercado, conteúdo otimizado e estratégias de SEO que realmente funcionam.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild size="lg" className="bg-mkranker-purple hover:bg-mkranker-dark-purple text-white px-8 py-6 text-lg hover-lift">
                <Link to="/register">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg hover-lift">
                <Link to="/demo">
                  Ver Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-[#1a1a2e]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-lg text-gray-400 mb-8">Empresas que Confiam no MKRanker</h2>
          <div className="flex justify-center items-center flex-wrap gap-12 opacity-70">
            {/* Client logos would go here */}
            <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center glass-panel">Logo Cliente</div>
            <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center glass-panel">Logo Cliente</div>
            <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center glass-panel">Logo Cliente</div>
            <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center glass-panel">Logo Cliente</div>
            <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center glass-panel">Logo Cliente</div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-24 bg-[#0f0f13]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo que você precisa para automatizar o seu SEO</h2>
            <p className="text-gray-400 text-lg">Nossa plataforma oferece ferramentas completas para todas as etapas da sua estratégia SEO.</p>
          </div>
          
          <Tabs defaultValue="mercado-publico" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12 bg-transparent border border-gray-800 rounded-lg overflow-hidden">
              {featuresData.slice(0, 4).map((feature) => (
                <TabsTrigger 
                  key={feature.id}
                  value={feature.id}
                  className="py-3 data-[state=active]:text-mkranker-purple data-[state=active]:bg-gray-800"
                >
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12 bg-transparent border border-gray-800 rounded-lg overflow-hidden">
              {featuresData.slice(4).map((feature) => (
                <TabsTrigger 
                  key={feature.id}
                  value={feature.id}
                  className="py-3 data-[state=active]:text-mkranker-purple data-[state=active]:bg-gray-800"
                >
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {featuresData.map((feature) => (
              <TabsContent 
                key={feature.id} 
                value={feature.id}
                className="focus:outline-none focus:ring-0"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block p-3 bg-mkranker-purple/10 rounded-lg mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 mb-6">{feature.description}</p>
                    <Button asChild className="bg-mkranker-purple hover:bg-mkranker-dark-purple">
                      <Link to={`/${feature.id}`}>
                        Explorar Recurso
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-mkranker-purple mb-2">
                          {feature.icon}
                        </div>
                        <p className="text-sm text-gray-400">Preview da ferramenta {feature.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o MKRanker?</h2>
            <p className="text-gray-400 text-lg">Conheça os diferenciais que fazem do MKRanker a escolha perfeita para o seu negócio.</p>
          </div>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {benefitsData.map((benefit, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="p-3 bg-mkranker-purple/10 rounded-lg inline-block mb-2">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static translate-y-0 left-auto mr-2" />
              <CarouselNext className="relative static translate-y-0 right-auto" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-[#0f0f13]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comece a Ranquear em Poucos Passos</h2>
            <p className="text-gray-400 text-lg">Otimize seu SEO rapidamente seguindo estas etapas simples.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-mkranker-purple rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mt-6 mb-4">Conecte seu Projeto</h3>
                <p className="text-gray-400">Informe os dados do seu site e seus objetivos. Configure suas preferências para resultados personalizados.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="text-mkranker-purple h-8 w-8" />
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-mkranker-purple rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mt-6 mb-4">Receba Análises e Conteúdo</h3>
                <p className="text-gray-400">Nossa IA gera insights, palavras-chave e textos otimizados para você, prontos para implementação.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="text-mkranker-purple h-8 w-8" />
              </div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-mkranker-purple rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mt-6 mb-4">Implemente e Monitore</h3>
                <p className="text-gray-400">Aplique as otimizações e acompanhe a evolução do seu ranking. Ajuste sua estratégia conforme necessário.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resultados Incríveis que Inspiram</h2>
            <p className="text-gray-400 text-lg">Conheça histórias reais de sucesso de clientes que transformaram seu SEO com o MKRanker.</p>
          </div>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonialData.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="h-full bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-mkranker-purple text-mkranker-purple" />
                        ))}
                      </div>
                      <CardTitle>{testimonial.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {testimonial.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-700 mb-4 rounded flex items-center justify-center">
                        <p className="text-center text-sm text-gray-300">Gráfico de crescimento</p>
                      </div>
                      <p className="text-gray-300">{testimonial.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static translate-y-0 left-auto mr-2" />
              <CarouselNext className="relative static translate-y-0 right-auto" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-24 bg-[#0f0f13]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integração com IA Avançada</h2>
            <p className="text-gray-400 text-lg">MKRanker utiliza o poder do GPT e Gemini para fornecer análises e conteúdos de altíssima qualidade.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <p className="font-bold text-sm">ChatGPT</p>
                </div>
                <CardTitle>ChatGPT</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Geração de conteúdo natural e humano para suas necessidades.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <p className="font-bold text-sm">Gemini</p>
                </div>
                <CardTitle>Gemini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Análises avançadas multimodais para insights mais profundos.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha o Plano Ideal para Você</h2>
            <p className="text-gray-400 text-lg">Escale seu marketing digital com nossos planos completos. Todos incluem acesso às melhores ferramentas de SEO com IA.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingData.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-gray-800/50 border ${plan.popular ? 'border-mkranker-purple' : 'border-gray-700'} relative h-full flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-mkranker-purple text-white text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg">
                    MAIS POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-mkranker-purple mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button asChild className={`w-full ${plan.popular ? 'bg-mkranker-purple hover:bg-mkranker-dark-purple' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <Link to="/register">
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-24 bg-[#0f0f13]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sua Tranquilidade é Nossa Prioridade</h2>
            <p className="text-gray-400 text-lg">Oferecemos garantias que demonstram nosso compromisso com sua satisfação.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="p-3 bg-mkranker-purple/10 rounded-lg inline-block mb-2">
                  <Shield className="h-8 w-8 text-mkranker-purple" />
                </div>
                <CardTitle>Teste Grátis ou Garantia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Experimente nossas ferramentas básicas gratuitamente ou conte com nossa garantia de satisfação nos planos pagos.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="p-3 bg-mkranker-purple/10 rounded-lg inline-block mb-2">
                  <Users className="h-8 w-8 text-mkranker-purple" />
                </div>
                <CardTitle>Suporte Especializado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Nossa equipe está pronta para te ajudar a extrair o máximo da plataforma e alcançar seus objetivos de SEO.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="p-3 bg-mkranker-purple/10 rounded-lg inline-block mb-2">
                  <Zap className="h-8 w-8 text-mkranker-purple" />
                </div>
                <CardTitle>Flexibilidade Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Cancele ou altere seu plano a qualquer momento, sem burocracia.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-purple">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para transformar seu marketing?</h2>
            <p className="text-xl mb-8">Junte-se a milhares de empresas que já estão usando MKRanker para otimizar suas estratégias de marketing.</p>
            <Button asChild size="lg" className="bg-white text-mkranker-purple hover:bg-gray-200 px-8 py-6 text-lg hover-lift">
              <Link to="/register">
                Fazer SEO com I.A.
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f13] pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="rounded-md bg-mkranker-purple w-10 h-10 flex items-center justify-center text-white font-bold text-xl mr-2">
                  M
                </div>
                <span className="text-xl font-bold">MKRanker</span>
              </div>
              <p className="text-gray-400 text-sm">
                MKRanker - Uma empresa Mk Art.<br />
                Mk Art Trafego Organico Ltda.<br />
                CNPJ: 26.248.684/0001-39.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li><Link to="/recursos" className="text-gray-400 hover:text-white transition">Recursos</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition">Preços</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link to="/treinamentos" className="text-gray-400 hover:text-white transition">Treinamentos</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
                <li><Link to="/contato" className="text-gray-400 hover:text-white transition">Contato</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Principais Ferramentas</h3>
              <ul className="space-y-2">
                <li><Link to="/mercado-publico-alvo" className="text-gray-400 hover:text-white transition">Análise de Mercado</Link></li>
                <li><Link to="/texto-seo-blog" className="text-gray-400 hover:text-white transition">Gerador de Conteúdo SEO</Link></li>
                <li><Link to="/meta-dados" className="text-gray-400 hover:text-white transition">Otimizador de Meta Dados</Link></li>
                <li><Link to="/palavras-chave" className="text-gray-400 hover:text-white transition">Pesquisa de Palavras-chave</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: contato@mkranker.com.br</li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-gray-800" />
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MKRanker. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/termos" className="text-gray-500 text-sm hover:text-white transition">Termos de Uso</Link>
              <Link to="/privacidade" className="text-gray-500 text-sm hover:text-white transition">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
