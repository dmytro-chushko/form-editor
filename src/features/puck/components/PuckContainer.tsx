import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { ContainerAlign, ContainerWidth } from '../types/components.type';

interface PuckContainerProps {
  width: ContainerWidth;
  align: ContainerAlign;
  children: ReactNode;
}

export default function PuckContainer({
  align,
  width,
  children,
}: PuckContainerProps) {
  return <div className={cn('min-h-12', width, align)}>{children}</div>;
}
