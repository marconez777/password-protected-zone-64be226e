import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarDropdownItemProps {
  href?: string;
  to?: string;
  title?: string;
  description?: string;
  isNew?: boolean;
  isUpcoming?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const NavbarDropdownItem: React.FC<NavbarDropdownItemProps> = ({
  href,
  to,
  title,
  description,
  isNew = false,
  isUpcoming = false,
  children,
  onClick
}) => {
  // Handle both href (for direct links) and to (for React Router links)
  const linkPath = to || href || "#";
  
  // Determine if we should use children or title/description
  const hasChildren = !!children;
  
  // If we have children, render them directly
  if (hasChildren) {
    return (
      <Link to={linkPath} className="flex items-start gap-2 w-full" onClick={onClick}>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{children}</span>
            {isNew && (
              <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white">
                novo
              </span>
            )}
            {isUpcoming && (
              <span className="ml-2 bg-gray-600 text-xs px-2 py-0.5 rounded-full text-white">
                em breve
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }
  
  // Otherwise use the title/description pattern
  return (
    <Link to={linkPath} className="flex items-start gap-2 w-full" onClick={onClick}>
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</span>
          {isNew && (
            <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white">
              novo
            </span>
          )}
          {isUpcoming && (
            <span className="ml-2 bg-gray-600 text-xs px-2 py-0.5 rounded-full text-white">
              em breve
            </span>
          )}
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{description}</span>
      </div>
    </Link>
  );
};

export default NavbarDropdownItem;
