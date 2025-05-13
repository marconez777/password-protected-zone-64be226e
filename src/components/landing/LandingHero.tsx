
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <section className="relative bg-[#100F13] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-[120px] h-[120px] rounded-full bg-[#805AD5]/30 blur-3xl" />
      <div className="absolute bottom-16 right-24 w-[180px] h-[180px] rounded-full bg-[#805AD5]/20 blur-3xl" />
      <div className="absolute -top-10 -right-10 w-[250px] h-[250px] rounded-full bg-[#805AD5]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-[#805AD5]/15 blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), 
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center px-6 py-32 relative z-10 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
          <span className="block">Automarize seu SEO com</span>
          <span className="block">Inteligência Artificial</span>
        </h1>
        
        <p className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
          MKRanker conecta seu negócio com as mais avançadas tecnologias de IA
          (Gemini e Chat GPT) para gerar análises de mercado, conteúdo otimizado e
          estratégias de SEO que realmente funcionam.
        </p>
        
        <Button 
          className="bg-[#805AD5] hover:bg-[#6B46C1] text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg mt-10 h-auto"
          asChild
        >
          <Link to="/register">
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LandingHero;
