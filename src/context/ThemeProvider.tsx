import React, { useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { useTheme } from '../hooks/';

export const ThemeProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { theme, resolvedTheme, setTheme, toggle } = useTheme();

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggle }),
    [theme, resolvedTheme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
