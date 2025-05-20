
import React from 'react';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { Post } from './BlogPostData';

interface BlogSEOProps {
  post: Post;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post }) => {
  return (
    <SEOMetadata 
      title={`${post.title} | Blog MKRanker`}
      description="Descubra como a IA está transformando estratégias de SEO e como aproveitar essa tecnologia para melhorar seu rankeamento."
      keywords="inteligência artificial, SEO, IA para SEO, marketing digital, rankeamento google"
      ogImage={post.image}
      canonicalUrl={`https://mkranker.com.br/blog/${post.slug}`}
      jsonLd={`{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://mkranker.com.br/blog/${post.slug}"
        },
        "headline": "${post.title}",
        "image": "${post.image}",
        "datePublished": "2025-05-20T08:00:00+00:00",
        "dateModified": "2025-05-20T09:00:00+00:00",
        "author": {
          "@type": "Organization",
          "name": "MKRanker"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MKRanker",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mkranker.com.br/assets/img/logo.png"
          }
        }
      }`}
    />
  );
};

export default BlogSEO;
