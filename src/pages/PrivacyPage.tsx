import { useTranslation } from 'react-i18next';
import { MetaTags } from '../components';
import { Link } from 'react-router-dom';

export const PrivacyPage = (): React.JSX.Element => {
  const { t } = useTranslation('privacy');

  const lastUpdated = new Date().toLocaleDateString();

  return (
    <>
      <MetaTags
        title={t('meta.title')}
        description={t('meta.description')}
        pathname="/privacy"
        type="article"
      />

      <main role="main" className="site-container pb-12 pt-8">
        <article className="mx-auto max-w-3xl prose dark:prose-invert">
          <header>
            <h1 id="privacy-title" className="text-2xl font-semibold">
              {t('title')}
            </h1>
            <p className="text-sm text-muted">{t('intro')}</p>
            <p className="text-xs text-muted mt-2">{t('lastUpdated', { date: lastUpdated })}</p>
          </header>

          <section aria-labelledby="privacy-data" className="mt-6">
            <h2 id="privacy-data" className="text-lg font-semibold">
              {t('sections.data.heading')}
            </h2>
            <p>{t('sections.data.paragraph')}</p>
          </section>

          <section aria-labelledby="privacy-use" className="mt-6">
            <h2 id="privacy-use" className="text-lg font-semibold">
              {t('sections.use.heading')}
            </h2>
            <p>{t('sections.use.paragraph')}</p>
          </section>

          <section aria-labelledby="privacy-cookies" className="mt-6">
            <h2 id="privacy-cookies" className="text-lg font-semibold">
              {t('sections.cookies.heading')}
            </h2>
            <p>{t('sections.cookies.paragraph')}</p>
          </section>

          <section aria-labelledby="privacy-external" className="mt-6">
            <h2 id="privacy-external" className="text-lg font-semibold">
              {t('sections.external.heading')}
            </h2>
            <p>{t('sections.external.paragraph')}</p>
          </section>

          <section aria-labelledby="privacy-rights" className="mt-6">
            <h2 id="privacy-rights" className="text-lg font-semibold">
              {t('sections.rights.heading')}
            </h2>
            <p>{t('sections.rights.paragraph')}</p>
          </section>

          <section aria-labelledby="privacy-contact" className="mt-6">
            <h2 id="privacy-contact" className="text-lg font-semibold">
              {t('sections.contact.heading')}
            </h2>
            <p>
              {t('sections.contact.paragraph')}{' '}
              <a href={`mailto:${t('contact.email')}`} aria-label={t('contact.email')}>
                {t('contact.email')}
              </a>
              .
            </p>
          </section>

          <footer className="mt-8">
            <p className="text-sm">
              {t('note')} <Link to="/contact">{t('links.contact')}</Link>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
};
