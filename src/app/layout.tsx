import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { setGlobalTryCatchConfig } from '@pidchashyi/try-catch';

import { env } from '@/env';

import { SimpleGridPattern } from '@/components/cuicui';
import { Footer, Header } from '@/components/layout';
import { ThemeToggleButton } from '@/components/skiper-ui';

import Providers from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js 15',
  description: 'Next.js 15 Starter KIT',
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto'
});

setGlobalTryCatchConfig({
  logError: true
});

interface Properties {
  children: ReactNode;
}

const RootLayout = ({ children }: Properties) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://lh3.googleusercontent.com" rel="preconnect" />
      </head>

      <body className={roboto.variable}>
        <SimpleGridPattern>
          <Providers className="font-roboto selection:bg-primary selection:text-primary-foreground mx-0 flex min-h-dvh items-center justify-center px-0">
            <div className="absolute top-4 z-10 flex w-full justify-center">
              <ThemeToggleButton />
            </div>

            <Header />
            <main className="flex-1 px-4 sm:px-0">{children}</main>
            <Footer />
          </Providers>
        </SimpleGridPattern>
      </body>
    </html>
  );
};

export default RootLayout;
