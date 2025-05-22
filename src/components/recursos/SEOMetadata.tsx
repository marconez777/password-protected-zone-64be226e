
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
  pageType?: string; // Identificador do tipo de página
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  jsonLd,
  preload,
  contentHTML,
  pageType
}) => {
  // Injeção direta do conteúdo SEO no container criado no main.tsx
  React.useEffect(() => {
    if (contentHTML) {
      const seoContainer = document.getElementById('seo-content-container');
      if (seoContainer) {
        // Limpa o conteúdo anterior e adiciona o novo
        seoContainer.innerHTML = contentHTML;
      }
    }
    
    return () => {
      // Limpa o conteúdo ao desmontar o componente
      const seoContainer = document.getElementById('seo-content-container');
      if (seoContainer) {
        seoContainer.innerHTML = '';
      }
    };
  }, [contentHTML]);
  
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
      
      {/* Informamos aos motores de busca qual o tipo de página */}
      {pageType && <meta name="page-type" content={pageType} id="pageType" />}
    </Helmet>
  );
};

export default SEOMetadata;
