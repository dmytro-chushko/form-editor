import { cn } from '@/lib/utils';

interface PuckHeadingProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  headingText: string;
  align: 'text-left' | 'text-center' | 'text-right';
  weight: 'font-normal' | 'font-semibold' | 'font-bold';
  puckRef: ((element: Element | null) => void) | null;
}

const variants = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
};

export default function PuckHeading({
  tag,
  headingText,
  align,
  weight,
  puckRef,
}: PuckHeadingProps) {
  const Comp = tag || 'h1';

  return (
    <div ref={puckRef} className="flex-1">
      <Comp className={cn(align, variants[tag], weight)}>{headingText}</Comp>
    </div>
  );
}
