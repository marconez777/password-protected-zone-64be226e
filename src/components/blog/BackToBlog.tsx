
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToBlog: React.FC = () => {
  return (
    <div className="mb-6">
      <Link to="/blog" className="inline-flex items-center text-[#9b87f5] hover:text-[#805af5] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o blog
      </Link>
    </div>
  );
};

export default BackToBlog;
