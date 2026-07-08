import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../context/ThemeContext';

export const ThemeToggle = (): React.JSX.Element => {
  const { theme, resolvedTheme, toggle } = useThemeContext();
  const { t } = useTranslation('common');

  const target = resolvedTheme === 'dark' ? t('theme.light') : t('theme.dark');

  const title =
    theme === 'system'
      ? t('theme.toggleTitleSystem', { resolved: resolvedTheme, target })
      : t('theme.toggleTitle', { theme, target });

  return (
    <button
      onClick={toggle}
      aria-label={t('theme.toggleAria', { current: resolvedTheme })}
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
