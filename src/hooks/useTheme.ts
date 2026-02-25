import { useCallback, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'my-portfolio.theme';

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function isValidTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      if (typeof window === 'undefined') return 'system';
      const raw = localStorage.getItem(STORAGE_KEY);
      if (isValidTheme(raw)) return raw;
      return 'system';
    } catch {
      return 'system';
    }
  });

  const [systemPref, setSystemPref] = useState<'light' | 'dark'>(() => {
    return getSystemTheme();
  });

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    return theme === 'system' ? systemPref : (theme as 'light' | 'dark');
  }, [theme, systemPref]);

  useEffect(() => {
    const root = typeof document !== 'undefined' ? document.documentElement : null;
    if (!root) return;

    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.dataset.theme = theme === 'system' ? resolvedTheme : theme;
  }, [resolvedTheme, theme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mq =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    if (!mq) return;

    const handler: EventListener = (e) => {
      const ev = e as MediaQueryListEvent;
      const newResolved: 'dark' | 'light' = ev.matches ? 'dark' : 'light';
      setSystemPref(newResolved);
    };

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => {
        mq.removeEventListener('change', handler);
      };
    }

    return;
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    try {
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
    setThemeState(t);
  }, []);

  const toggle = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next as Theme);
  }, [resolvedTheme, setTheme]);

  return { theme, resolvedTheme, setTheme, toggle } as const;
};
