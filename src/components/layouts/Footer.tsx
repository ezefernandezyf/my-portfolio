import { useTranslation } from 'react-i18next';

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('footer');

  return (
    <footer role="contentinfo" className="w-full border-t border-neutral-200 bg-neutral-100 py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="site-container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-body text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {t('copy', { year: currentYear })}
        </p>

        <div className="flex items-center gap-8">
          <a
            href="/privacy"
            className="font-body text-[11px] uppercase tracking-widest text-neutral-500 opacity-80 underline transition-all hover:opacity-100 hover:text-primary dark:text-neutral-400"
            aria-label={t('privacyAria')}
          >
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
};
