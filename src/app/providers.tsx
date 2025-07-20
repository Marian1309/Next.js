'use client';

import type { ReactNode } from 'react';

import {
  BetterAuthUIProvider,
  NextThemesProvider,
  ReactHotToastProvider
} from '@/components/providers';

interface Properties {
  children: ReactNode;
  className?: string;
}

const Providers = ({ children, className }: Properties) => {
  return (
    <main className={className}>
      {/* <NextTopLoaderProvider /> */}
      <ReactHotToastProvider />

      <BetterAuthUIProvider>
        {/* <FumadocsProvider> */}
        {/* <ConvexClientProvider> */}
        {/* <ReactQueryProvider> */}
        {/* <ReactDndProvider> */}
        <NextThemesProvider>
          {/* <NuqsAdapter> */}
          {children}
          {/* </NuqsAdapter> */}
        </NextThemesProvider>
        {/* </ReactDndProvider> */}
        {/* </ReactQueryProvider> */}
        {/* </ConvexClientProvider> */}
        {/* </FumadocsProvider> */}
      </BetterAuthUIProvider>
    </main>
  );
};

export default Providers;
