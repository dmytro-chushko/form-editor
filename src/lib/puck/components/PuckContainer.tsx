import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PuckContainerProps {
  width: 'w-1/4' | 'w-1/2' | 'w-3/4';
  align: 'mr-auto' | 'mx-auto' | 'ml-auto';
  children: ReactNode;
}

export default function PuckContainer({
  align,
  width,
  children,
}: PuckContainerProps) {
  return <div className={cn('min-h-12', width, align)}>{children}</div>;
}
