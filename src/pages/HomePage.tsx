
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
