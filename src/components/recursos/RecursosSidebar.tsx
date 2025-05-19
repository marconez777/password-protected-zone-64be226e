
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItem {
  id: string;
  label: string;
  path: string;
  soon?: boolean;
}

interface RecursosSidebarProps {
  items: SidebarItem[];
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const RecursosSidebar: React.FC<RecursosSidebarProps> = ({ items, activeItem, setActiveItem }) => {
  return (
    <aside className="lg:w-1/4 xl:w-1/5">
      <div className="bg-[#1A1A1A] rounded-lg p-6 sticky top-4">
        <h3 className="text-xl font-bold text-white mb-6">Recursos de I.A</h3>
        <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              aria-current={activeItem === item.id ? 'page' : undefined}
              className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                activeItem === item.id
                  ? 'bg-[#805af5] text-white'
                  : 'text-gray-300 hover:bg-[#805af5]/20'
              }`}
              onClick={(e) => {
                if (item.soon) {
                  e.preventDefault();
                } else {
                  setActiveItem(item.id);
                }
              }}
            >
              {item.label}
              {item.soon && (
                <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white" aria-label="Em breve">
                  em breve
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default RecursosSidebar;
