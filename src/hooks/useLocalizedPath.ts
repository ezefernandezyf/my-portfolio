import { useTranslation } from 'react-i18next';

export function useLocalizedPath(): (path: string) => string {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith('en');

  return (path: string): string => {
    if (!isEnglish) return path;
    // Root path redirects to /en/home
    if (path === '/') return '/en/home';
    return `/en${path}`;
  };
}
