
import React from 'react';
import SEOMetadata from '@/components/recursos/SEOMetadata';
import { Post } from './BlogPostData';

interface BlogSEOProps {
  post: Post;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post }) => {
  // Generate a specific description based on the first 160 characters of the post content
  // This ensures each post has a unique description that accurately reflects its content
  const generateDescription = () => {
    // Extract text content from HTML, removing all HTML tags
    const textContent = post.content.replace(/<[^>]*>?/gm, '');
    // Limit to 160 characters for optimal SEO description length
    return textContent.substring(0, 157) + '...';
  };
  
  // Generate specific keywords based on post title and category
  const generateKeywords = () => {
    return `${post.title}, ${post.category}, SEO, marketing digital, ${post.tags?.join(', ') || 'estratégias SEO'}`;
  };

  return (
    <SEOMetadata 
      title={`${post.title} | Blog MKRanker`}
      description={generateDescription()}
      keywords={generateKeywords()}
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
        "datePublished": "${post.datePublished || "2025-05-20T08:00:00+00:00"}",
        "dateModified": "${post.dateModified || "2025-05-20T09:00:00+00:00"}",
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
        },
        "description": "${generateDescription().replace(/"/g, '\\"')}"
      }`}
      contentHTML={`
        <div class="seo-content">
          <h1>${post.title}</h1>
          <p>${generateDescription()}</p>
          <p>Categoria: ${post.category}</p>
          ${post.tags ? `<p>Tags: ${post.tags.join(', ')}</p>` : ''}
        </div>
      `}
    />
  );
};

export default BlogSEO;
