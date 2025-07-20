import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';

interface Properties {
  children: ReactNode;
}

const FumadocsProvider = ({ children }: Properties) => {
  return <RootProvider>{children}</RootProvider>;
};

export default FumadocsProvider;
