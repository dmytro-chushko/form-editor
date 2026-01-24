'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = 'theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  const computeIsDark = (t: Theme): boolean => {
    if (t === 'light') return false;

    if (t === 'dark') return true;

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  };

  const applyThemeToPuckIframe = (dark: boolean) => {
    const frames = document.querySelectorAll<HTMLIFrameElement>(
      '#preview-frame, iframe[data-rfd-iframe="true"]'
    );
    frames.forEach((frame) => {
      try {
        const doc = frame.contentDocument || frame.contentWindow?.document;

        if (doc) doc.documentElement.classList.toggle('dark', dark);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'SecurityError') {
          return;
        }

        console.error('Unexpected error during iframe theme sync:', error);
      }
    });
  };

  const applyTheme = useCallback((t: Theme) => {
    const dark = computeIsDark(t);
    document.documentElement.classList.toggle('dark', dark);
    setIsDark(dark);
    applyThemeToPuckIframe(dark);
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
    setThemeState(stored);
    applyTheme(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const hasNewIframe = mutations.some((m) =>
        Array.from(m.addedNodes).some(
          (n) =>
            n instanceof HTMLIFrameElement ||
            (n instanceof HTMLElement && n.querySelector('iframe'))
        )
      );

      if (hasNewIframe) applyThemeToPuckIframe(computeIsDark(theme));
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [theme]);

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      localStorage.setItem(STORAGE_KEY, t);
      applyTheme(t);
    },
    [applyTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme, isDark }),
    [theme, setTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
};
