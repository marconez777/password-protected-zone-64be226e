
import React from 'react';

export const textoSEOLPJsonLdData = `
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Gerador de Texto SEO para Landing Pages com IA",
  "description": "Aprenda como um gerador de texto SEO IA pode transformar suas landing pages e aumentar suas conversões com conteúdo otimizado para buscadores.",
  "author": {
    "@type": "Organization",
    "name": "MKRanker"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MKRanker",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.mkranker.com/logo.png"
    }
  },
  "datePublished": "2023-05-20",
  "dateModified": "2025-05-20"
}
`;

const TextoSEOLPJSONLD = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: textoSEOLPJsonLdData }}
    />
  );
};

export default TextoSEOLPJSONLD;
