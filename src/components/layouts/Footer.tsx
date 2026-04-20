import { useTranslation } from 'react-i18next';

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('footer');

  return (
    <footer role="contentinfo" className="border-t border-base-200/70 bg-base-100/90 py-8 backdrop-blur-md md:py-10">
      <div className="site-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {t('copy', { year: currentYear })}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="btn btn-ghost btn-minimal text-[11px] font-semibold uppercase tracking-[0.16em]"
            aria-label={t('privacyAria')}
          >
            <span>{t('privacy')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
