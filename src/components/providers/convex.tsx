'use client';

import type { ReactNode } from 'react';

import { ConvexProvider } from 'convex/react';

import { convexClient } from '@/config/convex';

interface Properties {
  children: ReactNode;
}

const ConvexClientProvider = ({ children }: Properties) => {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
