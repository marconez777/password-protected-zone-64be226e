
import React from 'react';
import { Card } from '@/components/ui/card';

interface BlogSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const categories: Category[] = [
    { id: 'all', label: 'Todos os Artigos', count: 2 },
    { id: 'on-page', label: 'On Page', count: 1 },
    { id: 'estrategia', label: 'Estratégia', count: 1 },
    { id: 'seo-tecnico', label: 'SEO Técnico', count: 0 },
    { id: 'redacao', label: 'Redação', count: 0 },
    { id: 'backlinks', label: 'Backlinks', count: 0 },
    { id: 'performance', label: 'Performance', count: 0 },
    { id: 'marketing-conteudo', label: 'Marketing de Conteúdo', count: 0 },
    { id: 'noticias', label: 'Notícias', count: 0 },
  ];

  return (
    <aside className="lg:w-1/4 xl:w-1/5">
      <Card className="bg-[#1A1A1A] border-0 rounded-lg p-6 sticky top-4">
        <h3 className="text-xl font-bold text-white mb-6">Categorias</h3>
        <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex justify-between w-full text-left py-2 px-3 rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-[#805af5] text-white'
                  : 'text-gray-300 hover:bg-[#805af5]/20'
              }`}
            >
              <span>{category.label}</span>
              <span className="text-sm bg-[#222222] px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </nav>
      </Card>
    </aside>
  );
};

export default BlogSidebar;
