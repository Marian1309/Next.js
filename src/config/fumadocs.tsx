import Image from 'next/image';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/favicon.ico" alt="Next.js" width={40} height={40} />
        <span className="font-roboto text-2xl font-bold">Next.js</span>
      </>
    )
  },
  links: []
};
