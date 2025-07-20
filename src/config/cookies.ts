import { createCookieClient } from '@pidchashyi/next-cookies';

export const cookieManager = createCookieClient({
  userRole: ['user', 'admin', 'superadmin'] as const,
  theme: ['light', 'dark'] as const,
  sessionId: undefined // no restrictions on this cookie value
});
