
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
  // Use the variant to determine which logo to display
  const logoSrc = variant === 'light' 
    ? "/lovable-uploads/66079de7-3561-4f58-be8d-a718cbbe92de.png" 
    : "/lovable-uploads/f9dd956a-b8fd-41f7-9443-284daab02a2e.png";
  
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <img 
        src={logoSrc} 
        alt="MK Ranker Logo"
        className="h-10 w-auto" 
      />
    </div>
  );
}
