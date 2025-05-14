
import { Usage, PlanLimit } from "@/types/usage";
import { ResourceType } from "@/hooks/useResourceLimits";

export type ResourceKey =
  | 'market_research'
  | 'search_funnel'
  | 'keyword'
  | 'seo_text'
  | 'topic_research'
  | 'metadata_generation';

export interface ResourceMeta {
  key: ResourceKey;
  label: string;
  usageField: keyof Usage;
  limitField: keyof PlanLimit;
}

export const resources: ResourceMeta[] = [
  {
    key: 'market_research',
    label: 'Pesquisas de Mercado',
    usageField: 'market_research_count',
    limitField: 'market_research_limit'
  },
  {
    key: 'search_funnel',
    label: 'Funis de Busca',
    usageField: 'search_funnel_count',
    limitField: 'search_funnel_limit'
  },
  {
    key: 'keyword',
    label: 'Palavras-chave',
    usageField: 'keyword_count',
    limitField: 'keyword_limit'
  },
  {
    key: 'seo_text',
    label: 'Textos SEO',
    usageField: 'seo_text_count',
    limitField: 'seo_text_limit'
  },
  {
    key: 'topic_research',
    label: 'Pautas para Blog',
    usageField: 'topic_research_count',
    limitField: 'topic_research_limit'
  },
  {
    key: 'metadata_generation',
    label: 'Meta Dados',
    usageField: 'metadata_generation_count',
    limitField: 'metadata_generation_limit'
  }
];

export function getResourceMetaByKey(key: ResourceKey): ResourceMeta | undefined {
  return resources.find((r) => r.key === key);
}

/**
 * Helper function to get a resource config by its key
 */
export function getResourceByKey(key: ResourceType): ResourceMeta | undefined {
  return resources.find(resource => resource.key === key as ResourceKey);
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
