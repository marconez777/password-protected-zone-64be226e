
import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomeSEO: React.FC = () => {
  // Conteúdo SEO específico para a página inicial
  const homeJsonLd = `{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://mkranker.com.br/",
    "name": "MKRanker - Automatize seu SEO com IA",
    "description": "Potencialize suas estratégias de SEO com inteligência artificial. Aumente seu tráfego orgânico com nossas ferramentas de IA para geração de conteúdo, palavras-chave e análise de mercado.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mkranker.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }`;

  return (
    <Helmet>
      {/* Metadados essenciais */}
      <title>MKRanker - Automatize o SEO e Marketing Digital com IA</title>
      <meta name="description" content="Potencialize suas estratégias de SEO e marketing digital com inteligência artificial. Aumente seu tráfego orgânico com nossas ferramentas avançadas." />
      <meta name="keywords" content="SEO, marketing digital, geração de conteúdo, palavras-chave, inteligência artificial, rankeamento Google, otimização de sites, ChatGPT para SEO, Gemini para conteúdo" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="MKRanker - Automatize o SEO com IA" />
      <meta property="og:description" content="Potencialize suas estratégias de SEO com inteligência artificial e aumente seu tráfego orgânico." />
      <meta property="og:url" content="https://mkranker.com.br/" />
      <meta property="og:image" content="https://mkranker.com.br/assets/img/home-cover.jpg" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MKRanker - Automatize o SEO com IA" />
      <meta name="twitter:description" content="Potencialize suas estratégias de SEO com inteligência artificial e aumente seu tráfego orgânico." />
      <meta name="twitter:image" content="https://mkranker.com.br/assets/img/home-cover.jpg" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://mkranker.com.br/" />

      {/* Dados Estruturados (JSON-LD) */}
      <script type="application/ld+json">{homeJsonLd}</script>
    </Helmet>
  );
};

export default HomeSEO;
