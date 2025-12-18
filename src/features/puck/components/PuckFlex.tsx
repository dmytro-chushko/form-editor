import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PuckFlexProps {
  children: ReactNode;
}

export default function PuckFlex({ children }: PuckFlexProps) {
  return <div className={cn('min-h-10 w-full')}>{children}</div>;
}
