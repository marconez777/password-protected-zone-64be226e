
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CompaniesSection from '@/components/home/CompaniesSection';
import PricingSection from '@/components/home/PricingSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <HomeNavbar />
      <HeroSection />
      <CompaniesSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
};

export default HomePage;
