import { useCallback, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'my-portfolio.theme';

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      if (typeof window === 'undefined') return 'system';
      const raw = localStorage.getItem(STORAGE_KEY);
      return (raw as Theme) ?? 'system';
    } catch {
      return 'system';
    }
  });

  const [systemPref, setSystemPref] = useState<'light' | 'dark'>(() => {
    return getSystemTheme();
  });

  // resolvedTheme se deriva de theme y systemPref; hace rerender cuando cambian.
  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    return theme === 'system' ? systemPref : (theme as 'light' | 'dark');
  }, [theme, systemPref]);

  // Effect: aplica clases/dataset cuando cambia resolvedTheme o theme explícito.
  useEffect(() => {
    const root = typeof document !== 'undefined' ? document.documentElement : null;
    if (!root) return;

    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.dataset.theme = theme === 'system' ? resolvedTheme : theme;
  }, [resolvedTheme, theme]);

  // Effect: registrar listener del media query SOLO cuando la preferencia es 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mq =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    if (!mq) return;

    // handler con firma EventListener que actualiza systemPref (setState OK desde handler)
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

    // Si addEventListener no está disponible, no registramos (evitamos APIs obsoletas).
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

export default useTheme;
