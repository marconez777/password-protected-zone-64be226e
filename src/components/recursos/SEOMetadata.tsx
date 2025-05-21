
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  jsonLd: string;
  preload?: {href: string, as: string}[];
  contentHTML?: string; // Propriedade para conteúdo SEO
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  jsonLd,
  preload,
  contentHTML
}) => {
  return (
    <Helmet>
      {/* Metadados essenciais */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="MKRanker" />
      <meta name="theme-color" content="#6B46C1" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />

      {/* SEO: Título e descrição */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="MKRanker" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mkranker" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preload critical resources */}
      {preload && preload.map((item, index) => (
        <link key={index} rel="preload" href={item.href} as={item.as} />
      ))}

      {/* Dados Estruturados (JSON-LD) */}
      <script type="application/ld+json">{jsonLd}</script>
      
      {/* Conteúdo SEO para pré-renderização - visível para mecanismos de busca */}
      {contentHTML && (
        <>
          <meta name="seo-content" content={contentHTML} />
          
          {/* Este conteúdo é injetado diretamente no HTML - FIXED: wrapping children in braces */}
          <noscript>{contentHTML}</noscript>
        </>
      )}
    </Helmet>
  );
};

export default SEOMetadata;
