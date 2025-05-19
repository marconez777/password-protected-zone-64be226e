
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ResourcesSection from '@/components/home/ResourcesSection';
import CompaniesSection from '@/components/home/CompaniesSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <HomeNavbar />
      <HeroSection />
      <div className="bg-[#121016]">
        <CompaniesSection />
        <FeaturesSection />
        <ResourcesSection />
        <div id="pricing-section">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
