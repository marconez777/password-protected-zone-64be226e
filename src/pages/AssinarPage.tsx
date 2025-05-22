
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import Footer from '@/components/home/Footer';
import AssinarHero from '@/components/assinar/AssinarHero';
import AssinarPainPoints from '@/components/assinar/AssinarPainPoints';
import AssinarSolution from '@/components/assinar/AssinarSolution';
import AssinarBenefits from '@/components/assinar/AssinarBenefits';
import AssinarTestimonials from '@/components/assinar/AssinarTestimonials';
import AssinarPricing from '@/components/assinar/AssinarPricing';
import AssinarGuarantee from '@/components/assinar/AssinarGuarantee';
import AssinarFAQ from '@/components/assinar/AssinarFAQ';
import AssinarCTA from '@/components/assinar/AssinarCTA';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const AssinarPage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="MK Ranker - Assine Agora e Transforme seu SEO com IA | IA para SEO"
        description="Assine a MK Ranker e transforme seu site em uma máquina de vendas orgânicas. Ferramenta de IA para SEO que realmente funciona e converte visitantes em clientes."
        keywords="SEO com IA, rankeamento Google, marketing digital, otimização de sites, tráfego orgânico, inteligência artificial, ChatGPT para SEO, Gemini para SEO"
        ogImage="https://mkranker.com.br/assets/img/assinar-cover.jpg"
        canonicalUrl="https://mkranker.com.br/assinar"
        pageType="landing"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "MK Ranker - Plataforma de SEO com IA",
          "description": "Ferramenta de IA para SEO que transforma seu site em uma máquina de vendas orgânicas.",
          "offers": {
            "@type": "Offer",
            "price": "97.00",
            "priceCurrency": "BRL"
          }
        }`}
      />
      <HomeNavbar />
      <AssinarHero />
      <div className="bg-[#121016]">
        <AssinarPainPoints />
        <AssinarSolution />
        <AssinarBenefits />
        <AssinarTestimonials />
        <AssinarPricing />
        <AssinarGuarantee />
        <AssinarFAQ />
        <AssinarCTA />
      </div>
      <Footer />
    </div>
  );
};

export default AssinarPage;
