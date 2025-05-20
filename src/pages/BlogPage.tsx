
import React, { useState, useEffect } from 'react';
import HomeNavbar from '@/components/home/HomeNavbar';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/home/Footer';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { blogJsonLdData, blogSeoContent } from '@/components/blog/BlogJSONLD';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#121016] w-full">
      <SEOMetadata 
        title="Blog de Marketing Digital e SEO | MKRanker"
        description="Blog especializado em SEO, Marketing Digital e Estratégias para Aumentar o Tráfego Orgânico do seu Site."
        keywords="blog seo, marketing digital, tráfego orgânico, estratégias seo, rankeamento google, conteúdo marketing"
        ogImage="https://mkranker.com.br/assets/img/blog-cover.jpg"
        canonicalUrl="https://mkranker.com.br/blog"
        jsonLd={blogJsonLdData}
        contentHTML={blogSeoContent}
      />

      <HomeNavbar />
      
      <main className="pt-10 pb-4 px-4 md:px-8 lg:px-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog MKRanker</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Artigos, dicas e estratégias para impulsionar seu SEO e marketing digital com inteligência artificial
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <BlogSidebar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4 xl:w-4/5">
            <BlogPostGrid category={activeCategory} />
          </div>
        </div>
      </main>
      
      {/* Pricing Section */}
      <div className="mt-16">
        <PricingSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;
