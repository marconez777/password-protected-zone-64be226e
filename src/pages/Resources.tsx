
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import CardsSection from '@/components/home/CardsSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';

const Resources = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <HomeNavbar />
      <div className="bg-[#121016]">
        <CardsSection />
        <div id="pricing-section">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
