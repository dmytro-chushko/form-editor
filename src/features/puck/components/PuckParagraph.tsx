import { cn } from '@/lib/utils';

interface PuckParagraphProps {
  paragraphText: string;
  align: 'text-left' | 'text-center' | 'text-right';
  weight: 'font-normal' | 'font-semibold' | 'font-bold';
  padding: 'p-0' | 'p-2' | 'p-4' | 'p-6' | 'p-8';
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckParagraph({
  paragraphText,
  align,
  weight,
  padding,
  puckRef,
}: PuckParagraphProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <p className={cn(align, weight, padding)}>{paragraphText}</p>
    </div>
  );
}
