import React, { useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import useThemeColor from '../hooks/useThemeColor';

export const ThemeProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { theme, resolvedTheme, setTheme, toggle } = useTheme();

  useThemeColor(resolvedTheme);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggle }),
    [theme, resolvedTheme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
