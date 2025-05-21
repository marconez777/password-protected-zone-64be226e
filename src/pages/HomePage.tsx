import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CardsSection from '@/components/home/CardsSection';
import CompaniesSection from '@/components/home/CompaniesSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import SEOMetadata from '@/components/recursos/SEOMetadata';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="MKRanker - Automatize o SEO com IA | Melhore o Rankeamento no Google"
        description="Automatize o SEO de seu site com nossa plataforma de inteligência artificial. Melhore o rankeamento no Google, aumente o tráfego orgânico e impulsione as conversões."
        keywords="SEO com IA, rankeamento Google, marketing digital, otimização de sites, tráfego orgânico, inteligência artificial"
        ogImage="https://mkranker.com.br/assets/img/home-cover.jpg"
        canonicalUrl="https://mkranker.com.br/"
        pageType="home"
        jsonLd={`{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://mkranker.com.br/",
          "name": "MKRanker - Automatize o SEO com IA",
          "description": "Automatize o SEO de seu site com nossa plataforma de inteligência artificial. Melhore o rankeamento no Google, aumente o tráfego orgânico e impulsione as conversões.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mkranker.com.br/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`}
        contentHTML={`
          <div class="seo-content">
            <h1>MKRanker - Automatize o SEO com IA</h1>
            <p>Automatize o SEO de seu site com nossa plataforma de inteligência artificial. Melhore o rankeamento no Google, aumente o tráfego orgânico e impulsione as conversões.</p>
            <p>Impulsione seu negócio com estratégias de SEO orientadas por IA.</p>
          </div>
        `}
      />
      <HomeNavbar />
      <HeroSection />
      <div className="bg-[#121016]">
        <CompaniesSection />
        <FeaturesSection />
        <CardsSection />
        <div id="pricing-section">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
