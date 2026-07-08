import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

export const LanguageSwitcher = (): React.JSX.Element => {
  const { i18n, t } = useTranslation('header');
  const navigate = useNavigate();
  const location = useLocation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'es';

  const changeTo = async (lng: 'es' | 'en') => {
    if (lng === current) return;
    try {
      await i18n.changeLanguage(lng);
      document.documentElement.lang = lng;
      // Redirect to locale-specific URL
      const path = location.pathname;
      if (lng === 'en') {
        navigate(`/en${path}`);
      } else {
        navigate(path.replace(/^\/en/, '') || '/');
      }
    } catch (err) {
      console.error('i18n changeLanguage error:', err);
    }
  };

  return (
    <div className="control-cluster font-body" role="group" aria-label={t('language.label')}>
      <button
        type="button"
        onClick={() => changeTo('es')}
        aria-pressed={current === 'es'}
        aria-label={t('language.switchToEs')}
        className={`rounded-full px-2 py-1 text-xs font-body font-semibold uppercase tracking-wider transition-colors duration-200 focus-ring ${current === 'es' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => changeTo('en')}
        aria-pressed={current === 'en'}
        aria-label={t('language.switchToEn')}
        className={`rounded-full px-2 py-1 text-xs font-body font-semibold uppercase tracking-wider transition-colors duration-200 focus-ring ${current === 'en' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
      >
        EN
      </button>
    </div>
  );
};
