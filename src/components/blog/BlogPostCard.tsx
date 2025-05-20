
import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  excerpt,
  date,
  category,
  image
}) => {
  return (
    <div className="flex flex-col bg-[#1A1A1A] rounded-lg overflow-hidden h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
          <Calendar size={16} />
          <span>{date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mx-2"></span>
          <span className="text-purple-400">{category}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{excerpt}</p>
        
        <Link 
          to={`/blog/${id}`} 
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          Read More <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
