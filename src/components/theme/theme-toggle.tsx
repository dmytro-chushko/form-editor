'use client';

import { SunDimIcon, MoonIcon, MonitorIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const is = (t: string) => theme === t;

  return (
    <div className="inline-flex gap-2">
      <Button
        className={cn(
          is('light') ? 'text-foreground' : 'text-muted-foreground'
        )}
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setTheme('light')}
      >
        <SunDimIcon />
      </Button>
      <Button
        className={cn(is('dark') ? 'text-foreground' : 'text-muted-foreground')}
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setTheme('dark')}
      >
        <MoonIcon />
      </Button>

      <Button
        className={cn(
          is('system') ? 'text-foreground' : 'text-muted-foreground'
        )}
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setTheme('system')}
      >
        <MonitorIcon />
      </Button>
    </div>
  );
}
