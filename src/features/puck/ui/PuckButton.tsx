import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PuckButtonProps {
  variant: 'default' | 'outline';
  size: 'default' | 'sm' | 'lg';
  fullWidth: boolean;
  buttonType: 'submit' | 'button';
  buttonText: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckButton({
  variant,
  size,
  fullWidth,
  buttonType,
  buttonText,
  puckRef,
}: PuckButtonProps) {
  const { reset } = useFormContext();

  return (
    <div ref={puckRef} className={cn(fullWidth && 'flex-1')}>
      <Button
        className={cn(fullWidth && 'w-full')}
        type={buttonType}
        variant={variant}
        size={size}
        {...(buttonType === 'button' && { onClick: () => reset() })}
      >
        {buttonText}
      </Button>
    </div>
  );
}
