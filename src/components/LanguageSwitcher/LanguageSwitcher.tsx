import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = (): React.JSX.Element => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'es';

  const changeTo = async (lng: 'es' | 'en') => {
    try {
      await i18n.changeLanguage(lng);
      document.documentElement.lang = lng;
    } catch (err) {
      console.error('i18n changeLanguage error:', err);
    }
  };

  return (
    <div
      className="inline-flex items-center gap-2"
      role="navigation"
      aria-label="Language switcher"
    >
      <button
        onClick={() => changeTo('es')}
        aria-pressed={current === 'es'}
        aria-label="Cambiar a español"
        className={`btn btn-sm ${current === 'es' ? 'btn-primary' : 'btn-ghost'}`}
      >
        ES
      </button>

      <button
        onClick={() => changeTo('en')}
        aria-pressed={current === 'en'}
        aria-label="Switch to English"
        className={`btn btn-sm ${current === 'en' ? 'btn-primary' : 'btn-ghost'}`}
      >
        EN
      </button>
    </div>
  );
};

