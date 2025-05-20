
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPost: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-white mb-4">Artigo não encontrado</h1>
      <p className="text-gray-400 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
      <Link to="/blog" className="inline-flex items-center text-[#9b87f5] hover:text-[#805af5] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o blog
      </Link>
    </div>
  );
};

export default NotFoundPost;
