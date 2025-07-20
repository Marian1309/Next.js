import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { $fetch } from './lib/fetch';

export const middleware = async (request: NextRequest) => {
  const session = await $fetch('/api/auth/get-session', {
    headers: request.headers
  });

  // If already authenticated, redirect to home
  if (session?.data) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

// Apply middleware only to selected routes
export const config = {
  matcher: [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/magic-link',
    '/auth/forgot-password',
    '/auth/two-factor',
    '/auth/recover-account',
    '/auth/reset-password',
    '/auth/sign-out',
    '/auth/settings',
    '/auth/callback'
  ]
};
