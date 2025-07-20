'use client';

import NextTopLoader from 'nextjs-toploader';

const NextTopLoaderProvider = () => {
  return <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />;
};

export default NextTopLoaderProvider;
