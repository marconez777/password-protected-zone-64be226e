
import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export function Logo({ 
  className, 
  showText = true, 
  variant = 'light', 
  ...props 
}: LogoProps) {
  // Update to use the new logo image
  const logoSrc = "/lovable-uploads/e1fd70b0-cdbd-43ec-8132-e04d441a83c5.png";
  
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
