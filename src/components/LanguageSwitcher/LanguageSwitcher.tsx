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
      className="flex items-center rounded-full bg-surface-container-high p-1 text-[10px] font-bold uppercase tracking-widest font-space-grotesk"
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => changeTo('es')}
        aria-pressed={current === 'es'}
        aria-label="Cambiar a español"
        className={`rounded-full px-3 py-1 transition-colors focus-ring ${current === 'es' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-text/50 hover:text-text'}`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => changeTo('en')}
        aria-pressed={current === 'en'}
        aria-label="Switch to English"
        className={`rounded-full px-3 py-1 transition-colors focus-ring ${current === 'en' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-text/50 hover:text-text'}`}
      >
        EN
      </button>
    </div>
  );
};

