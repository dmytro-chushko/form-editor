'use client';

import { SunDimIcon, MoonIcon, MonitorIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

function computeIsDark(theme: Theme) {
  if (theme === 'light') {
    return false;
  }

  if (theme === 'dark') {
    return true;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyThemeToPuckIframe(isDark: boolean) {
  const frames = document.querySelectorAll<HTMLIFrameElement>(
    '#preview-frame, iframe[data-rfd-iframe="true"]'
  );

  frames.forEach((frame) => {
    const apply = () => {
      try {
        const doc = frame.contentDocument || frame.contentWindow?.document;

        if (!doc) {
          return;
        }
        doc.documentElement.classList.toggle('dark', isDark);
      } catch {
        // cross-origin, skip
      }
    };

    if (frame.contentDocument?.readyState === 'complete') {
      apply();
    } else {
      frame.addEventListener('load', apply, { once: true });
    }
  });
}

function applyTheme(theme: Theme) {
  const isDark = computeIsDark(theme);
  document.documentElement.classList.toggle('dark', isDark);
  applyThemeToPuckIframe(isDark);
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

  // Re-apply theme when Puck recreates its iframe (e.g., editor state changes)
  useEffect(() => {
    const mo = new MutationObserver(() => applyTheme(theme));
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
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
