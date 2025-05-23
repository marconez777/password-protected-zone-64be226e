
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { posts } from './BlogPostData';

interface BlogPostProps {
  category: string;
}

const BlogPostGrid: React.FC<BlogPostProps> = ({ category }) => {
  // Filter posts based on selected category
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <Card key={post.id} className="bg-[#1A1A1A] border-0 overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300">
            <div className="h-52 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                <Link to={`/blog/${post.slug}`} className="hover:text-[#9b87f5] transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <Link 
                to={`/blog/${post.slug}`} 
                className="inline-flex items-center text-[#9b87f5] hover:text-[#805af5] font-medium transition-colors"
              >
                Ler mais <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 text-center py-12">
          <h3 className="text-xl text-white mb-2">Nenhum artigo encontrado</h3>
          <p className="text-gray-400">Não encontramos artigos nesta categoria no momento.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostGrid;
