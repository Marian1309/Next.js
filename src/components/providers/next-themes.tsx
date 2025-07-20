'use client';

import type { ReactNode } from 'react';

import { useIsMounted } from '@pidchashyi/hooks';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Properties {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Properties) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'system']}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
