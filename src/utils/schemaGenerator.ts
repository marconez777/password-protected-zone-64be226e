
/**
 * Utility to generate standardized Schema.org JSON-LD data for MKRanker resource pages
 */

/**
 * Generate standardized Schema.org JSON-LD for resource pages
 * @param title Page title
 * @param description Page description
 * @param url Canonical URL of the page
 * @param image OG image URL
 * @param toolName Specific name of the tool
 * @param applicationCategory Type of application (SEOApplication, MarketingApplication, etc.)
 * @param price Price of the tool (as string, will be converted to number)
 * @param toolDescription Optional specific description for the tool itself
 * @returns Formatted JSON-LD string ready for the SEOMetadata component
 */
export const generateResourceSchemaLD = (
  title: string,
  description: string,
  url: string,
  image: string,
  toolName: string,
  applicationCategory: string = "SEOApplication",
  price: string = "0",
  toolDescription?: string
): string => {
  // Sanitize price to ensure it's numeric
  const numericPrice = price.replace(/[^0-9.]/g, "");
  
  return `{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title}",
    "description": "${description}",
    "url": "${url}",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "${toolName}",
      "applicationCategory": "${applicationCategory}",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "${numericPrice}",
        "priceCurrency": "BRL"
      },
      "image": "${image}",
      "description": "${toolDescription || description}"
    }
  }`;
};
