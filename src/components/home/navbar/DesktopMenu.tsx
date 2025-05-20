
import React from 'react';
import { Link } from 'react-router-dom';
import ResourcesDropdown from './ResourcesDropdown';

interface DesktopMenuProps {
  isResourcesOpen: boolean;
  setIsResourcesOpen: (isOpen: boolean) => void;
  startAutoCloseTimer: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ 
  isResourcesOpen, 
  setIsResourcesOpen,
  startAutoCloseTimer 
}) => {
  return (
    <div className="hidden md:flex items-center justify-center flex-1">
      <div className="bg-[#222222] rounded-full px-4 py-2">
        <ul className="flex items-center space-x-8">
          <li className="relative group">
            <Link 
              to="/" 
              className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
            >
              Home
            </Link>
          </li>
          
          <ResourcesDropdown 
            isOpen={isResourcesOpen}
            setIsOpen={setIsResourcesOpen}
            startAutoCloseTimer={startAutoCloseTimer}
            onItemClick={() => setIsResourcesOpen(false)}
          />
          
          <li className="relative group">
            <Link 
              to="/cadastro" 
              className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
            >
              Blog
            </Link>
          </li>
          
          <li className="relative group">
            <Link 
              to="/cadastro" 
              className="text-white hover:opacity-90 hover:bg-[#cd99ff]/10 px-2 py-1 rounded-md transition-all"
            >
              Treinamentos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopMenu;
