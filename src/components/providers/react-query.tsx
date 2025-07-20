'use client';

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { reactQueryClient } from '@/config/react-query';

interface Properties {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: Properties) => {
  return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
