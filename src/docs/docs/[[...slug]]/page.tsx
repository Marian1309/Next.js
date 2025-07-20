// @ts-nocheck
import { notFound } from 'next/navigation';

import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';

import { source } from '@/lib/source';

import { getMDXComponents } from './mdx-components';

interface Properties {
  params: Promise<{ slug?: string[] }>;
}

const FumadocsDocsPage = async ({ params }: Properties) => {
  const { slug } = await params;

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default FumadocsDocsPage;

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async ({ params }: Properties) => {
  const { slug } = await params;

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description
  };
};
