import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PuckFlexProps {
  direction: 'row' | 'column';
  gap: number;
  justify:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  wrap: boolean;
  children: ReactNode;
}

export default function PuckFlex({
  direction,
  gap,
  justify,
  align,
  wrap,
  children,
}: PuckFlexProps) {
  return (
    <div
      className={cn('min-h-10 p-4')}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
}
