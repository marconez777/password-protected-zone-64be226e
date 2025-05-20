
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarDropdownItemProps {
  href: string;
  title: string;
  description: string;
  isNew?: boolean;
}

const NavbarDropdownItem: React.FC<NavbarDropdownItemProps> = ({
  href,
  title,
  description,
  isNew = false
}) => {
  return (
    <Link to={href} className="flex items-start gap-2 w-full">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</span>
          {isNew && (
            <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white">
              novo
            </span>
          )}
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{description}</span>
      </div>
    </Link>
  );
};

export default NavbarDropdownItem;
