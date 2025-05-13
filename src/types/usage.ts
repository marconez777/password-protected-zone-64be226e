
// Types for subscription and usage data
export interface Usage {
  id: string;
  user_id: string;
  keyword_count: number;
  market_research_count: number;
  search_funnel_count: number;
  seo_text_count: number;
  topic_research_count: number;
  metadata_generation_count: number;
  created_at: string;
  updated_at: string;
}

export interface PlanLimit {
  id: string;
  plan_type: 'solo' | 'discovery' | 'escala';
  keyword_limit: number | null;
  market_research_limit: number | null;
  search_funnel_limit: number | null;
  seo_text_limit: number | null;
  topic_research_limit: number | null;
  metadata_generation_limit: number | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  is_active: boolean;
  plan_type: 'solo' | 'discovery' | 'escala';
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}
