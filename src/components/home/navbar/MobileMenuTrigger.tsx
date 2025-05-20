
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuTriggerProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuTrigger: React.FC<MobileMenuTriggerProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="flex md:hidden items-center mr-2">
      <button 
        onClick={toggleMenu}
        className="text-white p-2 rounded-full hover:bg-[#805af5]/20"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>
    </div>
  );
};

export default MobileMenuTrigger;
