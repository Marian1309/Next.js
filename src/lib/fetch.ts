import { createFetch } from '@better-fetch/fetch';
import { logger } from '@better-fetch/logger';

import { env } from '@/env';

export const $fetch = createFetch({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    logger({
      enabled:
        env.NEXT_PUBLIC_NODE_ENV === 'development' &&
        env.NEXT_PUBLIC_BASE_URL === 'http://localhost:3000',
      verbose: true
    })
  ]
});

export const $fetchN8N = createFetch({
  baseURL: 'https://n8n-self.up.railway.app',
  plugins: [
    logger({
      enabled:
        env.NEXT_PUBLIC_NODE_ENV === 'development' &&
        env.NEXT_PUBLIC_BASE_URL === 'http://localhost:3000',
      verbose: true
    })
  ]
});
