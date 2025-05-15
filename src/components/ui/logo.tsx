
import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean;
}

export function Logo({ className, showText = true, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <img 
        src="/lovable-uploads/f9dd956a-b8fd-41f7-9443-284daab02a2e.png" 
        alt="MK Ranker Logo"
        className="h-8 w-8" 
      />
      {showText && (
        <span className="font-bold text-xl ml-2 text-mkranker-purple">MK RANKER</span>
      )}
    </div>
  );
}
