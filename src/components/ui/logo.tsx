
import React from 'react';
import { cn } from '../../lib/utils';
import { useLocation } from 'react-router-dom';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export function Logo({ 
  className, 
  showText = true, 
  variant: forcedVariant, 
  ...props 
}: LogoProps) {
  // Get the current route to determine which logo to show
  const location = useLocation();
  const path = location.pathname;
  
  // Determine if the current route is a platform page (login, dashboard, keywords, etc.)
  // or a public page (home, about, etc.)
  const isPlatformPage = path.includes('/login') || 
                        path.includes('/cadastro') || 
                        path.includes('/dashboard') || 
                        path.includes('/keywords') ||
                        path.includes('/search-funnel') ||
                        path.includes('/market-and-target') ||
                        path.includes('/texto-seo') ||
                        path.includes('/pautas-blog') ||
                        path.includes('/meta-dados');
  
  // Use the forced variant if provided, otherwise determine based on the current route
  const variant = forcedVariant || (isPlatformPage ? 'light' : 'dark');
  
  // Set the logo source based on the variant
  const logoSrc = variant === 'light' 
    ? "/lovable-uploads/efed974e-ff04-4bd2-b261-0874bdf92308.png" // Light version for platform pages
    : "/lovable-uploads/e1fd70b0-cdbd-43ec-8132-e04d441a83c5.png"; // Dark version for public pages
  
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <img 
        src={logoSrc} 
        alt="MK Ranker Logo"
        className="h-10 w-auto" 
      />
      {/* Text display has been removed */}
    </div>
  );
}
