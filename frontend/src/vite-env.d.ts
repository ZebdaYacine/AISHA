/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UPLOAD_ENDPOINT_TEST: string;
  readonly VITE_UPLOAD_ENDPOINT_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
