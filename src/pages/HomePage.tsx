
import React, { useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CardsSection from '@/components/home/CardsSection';
import CompaniesSection from '@/components/home/CompaniesSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import { useAuth } from "@/providers/auth";
import HomeSEO from '@/components/home/HomeSEO';

const HomePage = () => {
  // Usamos useEffect para código que deve rodar apenas no navegador
  useEffect(() => {
    // Qualquer código que precisa do navegador deve ir aqui
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#121016]">
      {/* SEO Optimizations */}
      <HomeSEO />

      {/* Navbar */}
      <HomeNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Cards Grid Section */}
      <CardsSection />

      {/* Pricing Section */}
      <div id="pricing-section">
        <PricingSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
