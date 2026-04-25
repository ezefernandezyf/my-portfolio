import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useThemeContext } from '../../context/ThemeContext';

export const ThemeToggle = (): React.JSX.Element => {
  const { theme, resolvedTheme, toggle } = useThemeContext();

  const title =
    theme === 'system'
      ? `Tema: system (${resolvedTheme}). Click para cambiar a ${resolvedTheme === 'dark' ? 'light' : 'dark'}`
      : `Tema: ${theme}. Click para cambiar a ${theme === 'dark' ? 'light' : 'dark'}`;

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      title={title}
      className="inline-flex h-10 w-10 items-center justify-center text-text/70 transition-colors hover:text-primary focus-ring"
      type="button"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5" aria-hidden />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
};
