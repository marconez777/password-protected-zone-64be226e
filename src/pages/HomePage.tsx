
import React from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import HeroSection from '@/components/home/HeroSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121016]">
      <HomeNavbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
