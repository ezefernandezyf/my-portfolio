import { useTranslation } from 'react-i18next';

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('footer');

  return (
    <footer role="contentinfo" className="footer border-t border-base-200/70 bg-base-100/90 backdrop-blur py-6">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted leading-6">{t('copy', { year: currentYear })}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="btn btn-ghost btn-minimal text-sm"
            aria-label={t('privacyAria')}
          >
            <span className="text-base">{t('privacy')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
