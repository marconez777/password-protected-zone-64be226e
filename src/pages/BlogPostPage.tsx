
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeNavbar from '@/components/home/HomeNavbar';
import Footer from '@/components/home/Footer';
import BlogPost from '@/components/blog/BlogPost';
import NotFoundPost from '@/components/blog/NotFoundPost';
import BlogSEO from '@/components/blog/BlogSEO';
import BackToBlog from '@/components/blog/BackToBlog';
import { posts } from '@/components/blog/BlogPostData';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#121016] w-full">
        <HomeNavbar />
        <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
          <NotFoundPost />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <BlogSEO post={post} />
      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        <BackToBlog />
        
        <div className="max-w-4xl mx-auto">
          <BlogPost post={post} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
