import { useTranslation } from 'react-i18next';

interface FooterProps {}

export const Footer = (_props: FooterProps): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('footer');

  return (
    <footer role="contentinfo" className="footer bg-base-100 border-t border-base-200 py-6">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-base text-muted leading-6">{t('copy', { year: currentYear })}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="inline-flex items-center p-2 rounded-md hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('privacyAria')}
          >
            <span className="text-base">{t('privacy')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
