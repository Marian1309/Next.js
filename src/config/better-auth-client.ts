import {
  adminClient,
  emailOTPClient,
  jwtClient,
  magicLinkClient,
  oneTapClient,
  twoFactorClient,
  usernameClient
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { env } from '@/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    twoFactorClient(),
    usernameClient(),
    magicLinkClient(),
    emailOTPClient(),
    adminClient(),
    jwtClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      context: 'signin',
      cancelOnTapOutside: false
    })
  ]
});

export const { signIn, signUp, useSession } = createAuthClient();
