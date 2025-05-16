
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
  // Use the new logo for both light and dark variants
  const logoSrc = "/lovable-uploads/04f33483-ea84-483f-8aec-bc56d88e58b7.png";
  
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
