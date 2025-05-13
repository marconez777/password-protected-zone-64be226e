
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MARKET_TARGET_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
