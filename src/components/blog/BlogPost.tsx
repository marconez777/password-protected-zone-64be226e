
import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Post } from './BlogPostData';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Card className="bg-white border-0 overflow-hidden shadow-md">
      <div className="h-80 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="blog-content"
        />
      </div>
    </Card>
  );
};

export default BlogPost;
