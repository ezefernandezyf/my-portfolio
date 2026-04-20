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
      className="control-cluster inline-flex items-center gap-1"
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => changeTo('es')}
        aria-pressed={current === 'es'}
        aria-label="Cambiar a español"
        className={`control-button rounded-full px-3 py-1 transition-colors ${current === 'es' ? 'bg-base-100 text-primary shadow-sm' : 'text-base-content/55 hover:text-base-content'}`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => changeTo('en')}
        aria-pressed={current === 'en'}
        aria-label="Switch to English"
        className={`control-button rounded-full px-3 py-1 transition-colors ${current === 'en' ? 'bg-base-100 text-primary shadow-sm' : 'text-base-content/55 hover:text-base-content'}`}
      >
        EN
      </button>
    </div>
  );
};

