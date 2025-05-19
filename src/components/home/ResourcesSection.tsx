
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Resource category type
type ResourceCategory = {
  title: string;
  description: string;
  image: string;
};

const ResourcesSection = () => {
  const resources: ResourceCategory[] = [
    {
      title: "Pautas para Blog",
      description: "Gere ideias de conteúdo para seu blog com base em palavras-chave",
      image: "/lovable-uploads/a91df81c-3f1a-48b3-93f7-eb56530c9a4c.png"
    },
    {
      title: "Texto SEO para LP",
      description: "Gere textos otimizados para SEO em landing pages",
      image: "/lovable-uploads/45e56b6d-1253-4620-8b64-4b11957f0278.png"
    },
    {
      title: "Palavras-chave",
      description: "Gere sugestões de palavras-chave relacionadas",
      image: "/lovable-uploads/dd98f331-8ecd-4318-8d6f-993fe86defe7.png"
    },
    {
      title: "Funil de Busca",
      description: "Analise o funil de busca para seu negócio",
      image: "/lovable-uploads/8787267b-5403-45ac-8e1c-4db1a7937559.png"
    },
    {
      title: "Mercado e Público-alvo",
      description: "Análise completa de mercado e público-alvo",
      image: "/lovable-uploads/9be176a4-6743-40de-8c9b-2c76ac3751ca.png"
    }
  ];

  return (
    <section className="py-16 bg-[#121016]" id="resources-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nossos Recursos
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ferramentas poderosas para otimizar sua estratégia de SEO e marketing de conteúdo
          </p>
        </div>

        <div className="mt-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {resources.map((resource, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-0 overflow-hidden bg-[#1a1820] text-white">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                          <p className="text-sm text-gray-300">{resource.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-[#805af5]/20 hover:bg-[#805af5]/40 border-[#805af5]/50" />
              <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-[#805af5]/20 hover:bg-[#805af5]/40 border-[#805af5]/50" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
