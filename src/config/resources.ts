
import { Usage, PlanLimit } from "@/types/usage";
import { ResourceType } from "@/hooks/useResourceLimits";

export interface ResourceConfig {
  key: ResourceType;
  label: string;
  usageField: keyof Usage;
  limitField: keyof PlanLimit;
}

export const resources: ResourceConfig[] = [
  {
    key: "market_research",
    label: "Pesquisas de Mercado",
    usageField: "market_research_count",
    limitField: "market_research_limit"
  },
  {
    key: "search_funnel",
    label: "Funis de Busca",
    usageField: "search_funnel_count",
    limitField: "search_funnel_limit"
  },
  {
    key: "keyword",
    label: "Palavras-chave",
    usageField: "keyword_count",
    limitField: "keyword_limit"
  },
  {
    key: "seo_text",
    label: "Textos SEO",
    usageField: "seo_text_count",
    limitField: "seo_text_limit"
  },
  {
    key: "topic_research",
    label: "Pautas para Blog",
    usageField: "topic_research_count",
    limitField: "topic_research_limit"
  },
  {
    key: "metadata_generation",
    label: "Meta Dados",
    usageField: "metadata_generation_count",
    limitField: "metadata_generation_limit"
  }
];

/**
 * Helper function to get a resource config by its key
 */
export function getResourceByKey(key: ResourceType): ResourceConfig | undefined {
  return resources.find(resource => resource.key === key);
}

/**
 * Helper function to get the usage field name for a resource
 */
export function getUsageFieldByKey(key: ResourceType): keyof Usage | undefined {
  return getResourceByKey(key)?.usageField;
}

/**
 * Helper function to get the limit field name for a resource
 */
export function getLimitFieldByKey(key: ResourceType): keyof PlanLimit | undefined {
  return getResourceByKey(key)?.limitField;
}
