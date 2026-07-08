import { Link } from 'react-router-dom';
import { MetaTags } from '../shared/seo';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('notfoundpage');

  return (
    <>
      <MetaTags
        title={t('meta.title')}
        description={t('meta.description')}
        noIndex={true}
        pathname="/404"
        type="website"
      />
      <section
        aria-labelledby="notfound-title"
        className="site-container py-16 flex flex-col items-center text-center"
        role="main"
      >
        <div className="max-w-xl">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 id="notfound-title" className="text-3xl font-bold mb-3 text-text-primary">
            {t('h1')}
          </h1>

          <p className="mb-6 text-base text-text-muted">{t('paragraph')}</p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/home" className="btn-minimal btn-primary" aria-label={t('buttons.backAria')}>
              {t('buttons.back')}
            </Link>

            <Link
              to="/contact"
              className="btn-minimal btn-ghost"
              aria-label={t('buttons.contactAria')}
            >
              {t('buttons.contact')}
            </Link>
          </div>

          <p className="mt-8 text-sm text-text-muted">{t('copy', { year: currentYear })}</p>
        </div>
      </section>
    </>
  );
};
