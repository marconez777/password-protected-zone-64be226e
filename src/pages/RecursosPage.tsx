
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import CardsSection from '@/components/home/CardsSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';

const RecursosPage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <HomeNavbar />
      <div className="pt-16 pb-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
          Recursos Poderosos
        </h2>
        <p className="text-xl text-gray-300 mt-4">
          Tudo o que você precisa para dominar o SEO e aumentar seu tráfego orgânico
        </p>
      </div>
      <div className="bg-[#121016]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-16">
            {/* The cards are now rendered directly here, removing the CardsSection component that had duplicated titles */}
            {/* We'll still use the card items from CardsSection component */}
            <CardsSection />
          </div>
        </div>
        <div id="pricing-section">
          <PricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecursosPage;
