'use client';

import { SunDimIcon, MoonIcon, MonitorIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === 'light') {
    root.classList.remove('dark');
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    root.classList.toggle('dark', systemDark);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    try {
      const stored =
        (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';
      setTheme(stored);
      applyTheme(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    mql.addEventListener?.('change', onChange);

    return () => mql.removeEventListener?.('change', onChange);
  }, [theme]);

  function update(next: Theme) {
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
  }

  const is = (t: Theme) => theme === t;

  return (
    <div className="inline-flex gap-2">
      <Button
        className={cn(
          is('light') ? 'text-foreground' : 'text-muted-foreground'
        )}
        type="button"
        variant="outline"
        size="icon"
        onClick={() => update('light')}
      >
        <SunDimIcon />
      </Button>
      <Button
        className={cn(is('dark') ? 'text-foreground' : 'text-muted-foreground')}
        type="button"
        variant="outline"
        size="icon"
        onClick={() => update('dark')}
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
        onClick={() => update('system')}
      >
        <MonitorIcon />
      </Button>
    </div>
  );
}
