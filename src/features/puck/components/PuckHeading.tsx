import { cn } from '@/lib/utils';

import {
  HeadingTags,
  TextWeight,
  PuckRefType,
  TextAlign,
} from '../types/components.type';

interface PuckHeadingProps {
  tag: HeadingTags;
  headingText: string;
  align: TextAlign;
  weight: TextWeight;
  puckRef: PuckRefType;
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
