import { useTranslation } from 'react-i18next';
import { GithubIcon, LinkedInIcon } from '../../components';

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('footer');

  return (
    <footer role="contentinfo" className="w-full border-t border-neutral-200 bg-neutral-100 py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="site-container flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="font-body text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {t('copy', { year: currentYear })}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ezefernandezyf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500 transition-all hover:text-primary dark:text-neutral-400"
            aria-label={t('githubAria')}
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500 transition-all hover:text-primary dark:text-neutral-400"
            aria-label={t('linkedinAria')}
          >
            <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="/privacy"
            className="text-[11px] uppercase tracking-widest text-neutral-500 opacity-80 underline transition-all hover:opacity-100 hover:text-primary dark:text-neutral-400"
            aria-label={t('privacyAria')}
          >
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
};
