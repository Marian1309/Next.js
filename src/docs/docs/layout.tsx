// @ts-nocheck
import type { ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { source } from '@/lib/source';

import { baseOptions } from '@/config/fumadocs';

interface Properties {
  children: ReactNode;
}

const FumadocsDocsLayout = ({ children }: Properties) => {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
};

export default FumadocsDocsLayout;
