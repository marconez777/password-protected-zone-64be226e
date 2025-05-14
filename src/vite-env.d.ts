
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MARKET_TARGET_WEBHOOK_URL?: string;
  readonly VITE_SEARCH_FUNNEL_WEBHOOK_URL?: string;
  readonly VITE_WEBHOOK_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
