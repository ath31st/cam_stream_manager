/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_HEALTH_CHECK_INTERVAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
