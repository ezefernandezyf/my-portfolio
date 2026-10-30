import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../context/ThemeContext';

export const ThemeToggle = (): React.JSX.Element => {
  const { theme, resolvedTheme, toggle } = useThemeContext();
  const { t } = useTranslation('common');

  const themeKey = theme === 'system' ? 'system' : theme;
  const nextKey = resolvedTheme === 'dark' ? 'light' : 'dark';
  const title = t('themeToggle.title', {
    current: t(`themeToggle.themes.${themeKey}`),
    next: t(`themeToggle.themes.${nextKey}`),
  });

  return (
    <button
      onClick={toggle}
      aria-label={t('themeToggle.aria')}
      title={title}
      className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent focus-ring"
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
