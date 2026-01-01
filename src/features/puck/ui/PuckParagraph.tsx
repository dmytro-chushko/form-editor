import { cn } from '@/lib/utils';

import {
  BlockPaddings,
  PuckRefType,
  TextAlign,
  TextWeight,
} from '../types/components.type';

interface PuckParagraphProps {
  paragraphText: string;
  align: TextAlign;
  weight: TextWeight;
  padding: BlockPaddings;
  puckRef: PuckRefType;
}

export default function PuckParagraph({
  paragraphText,
  align,
  weight,
  padding,
  puckRef,
}: PuckParagraphProps) {
  return (
    <div
      ref={puckRef}
      className="flex-1"
      onKeyDownCapture={(e) => e.stopPropagation()}
      onKeyUpCapture={(e) => e.stopPropagation()}
    >
      <p className={cn(align, weight, padding)}>{paragraphText}</p>
    </div>
  );
}
