import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
};

export { Skeleton };
