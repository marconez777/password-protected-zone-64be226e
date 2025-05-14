
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent 
} from './sidebar-components';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from './sidebar-menu';

// This is a temporary compatibility layer to support the old sidebar navigation component structure
// Long term, we should refactor all usages to the new sidebar component structure

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarNav = React.forwardRef<
  HTMLDivElement,
  SidebarNavProps
>(({ className, children, ...props }, ref) => {
  return (
    <Sidebar className={className} ref={ref} {...props}>
      {children}
    </Sidebar>
  );
});
SidebarNav.displayName = "SidebarNav";

export const SidebarNavHeader = SidebarHeader;
export const SidebarNavHeaderTitle = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-lg font-semibold" {...props}>{children}</h2>
);
export const SidebarNavMain = SidebarContent;
export const SidebarNavSection = SidebarGroup;
export const SidebarNavSectionHeader = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>
    {children}
  </div>
);
export const SidebarNavSectionTitle = SidebarGroupLabel;
export const SidebarNavSectionContent = SidebarGroupContent;

interface SidebarNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  onClick?: () => void;
}

export const SidebarNavLink = React.forwardRef<
  HTMLLIElement,
  SidebarNavLinkProps
>(({ children, to, onClick, ...props }, ref) => (
  <SidebarMenuItem ref={ref}>
    <SidebarMenuButton asChild onClick={onClick}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
));
SidebarNavLink.displayName = "SidebarNavLink";

export const SidebarNavLinkIcon = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mr-2 flex items-center" {...props}>{children}</div>
);

export const SidebarNavLinkText = ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props}>{children}</span>
);

export const SidebarCloseButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    className={`absolute top-3 right-2 h-8 w-8 rounded-md p-0 hover:bg-accent ${className}`} 
    aria-label="Close sidebar"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </button>
);
