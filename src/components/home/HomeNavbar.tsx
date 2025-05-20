
import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenuTrigger from './navbar/MobileMenuTrigger';
import MobileMenu from './navbar/MobileMenu';
import CTAButton from './navbar/CTAButton';

const HomeNavbar = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Function to start the auto-close timer
  const startAutoCloseTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer to close the dropdown after 1 second (changed from 4 seconds)
    timerRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 1000); // 1 second (changed from 4000)
  };
  
  // Reset timer when dropdown state changes
  useEffect(() => {
    if (isResourcesOpen) {
      startAutoCloseTimer();
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    return () => {
      // Clean up timer on component unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isResourcesOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-transparent px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center ml-[10%] md:ml-[10%]">
        <Logo variant="dark" showText={true} className="h-8" />
      </div>
      
      <DesktopMenu 
        isResourcesOpen={isResourcesOpen} 
        setIsResourcesOpen={setIsResourcesOpen}
        startAutoCloseTimer={startAutoCloseTimer}
      />
      
      <MobileMenuTrigger 
        isOpen={isMobileMenuOpen} 
        toggleMenu={toggleMobileMenu}
      />
      
      <CTAButton />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        closeMenu={closeMobileMenu}
        isResourcesOpen={isResourcesOpen}
        setIsResourcesOpen={setIsResourcesOpen}
      />
    </nav>
  );
};

export default HomeNavbar;
