
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarDropdownItemProps {
  to: string;
  onClick?: () => void;
  isUpcoming?: boolean;
  children: React.ReactNode;
}

const NavbarDropdownItem: React.FC<NavbarDropdownItemProps> = ({
  to,
  children,
  onClick,
  isUpcoming = false
}) => {
  if (isUpcoming) {
    return (
      <li className="flex items-center px-4 py-2 text-white hover:bg-[#cd99ff]/10 group">
        <span>{children}</span>
        <span className="ml-2 bg-[#805af5] text-xs text-white px-2 py-0.5 rounded-full whitespace-nowrap">
          em breve
        </span>
      </li>
    );
  }

  return (
    <li className="group">
      <Link
        to={to}
        className="block px-4 py-2 text-white hover:bg-[#cd99ff]/10 transition-all"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavbarDropdownItem;
