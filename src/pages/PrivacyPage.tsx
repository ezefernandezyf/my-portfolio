import { Link } from 'react-router-dom';
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  KeyIcon,
  LinkIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { MetaTags } from '../shared/seo';

const fadeInUp = (delay = 0): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${delay}s forwards`,
  opacity: 0,
});

const privacySections = [
  { key: 'data', icon: KeyIcon },
  { key: 'use', icon: UserGroupIcon },
  { key: 'cookies', icon: ShieldCheckIcon },
  { key: 'external', icon: LinkIcon },
  { key: 'rights', icon: EyeSlashIcon },
  { key: 'contact', icon: EnvelopeIcon },
] as const;

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

      <div className="pb-24 pt-24">
        <div className="site-container space-y-24">
          <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end" style={fadeInUp()}>
            <div className="lg:col-span-8">
              <p className="mb-4 font-body text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted" style={fadeInUp(0.08)}>
                Privacy & Trust
              </p>
              <h1 className="font-display text-[2.75rem] font-medium leading-tight tracking-[-0.03em] text-text-primary sm:text-[3.25rem]" style={fadeInUp(0.16)}>
                {t('title')}
              </h1>
              <p className="mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-text-secondary" style={fadeInUp(0.24)}>
                {t('intro')}
              </p>
            </div>

            <aside className="lg:col-span-4 lg:border-l lg:border-border/20 lg:pl-12" style={fadeInUp(0.32)}>
              <div className="rounded-lg border border-border/20 bg-surface p-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
                  {t('lastUpdated', { date: lastUpdated })}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {t('note')}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.05em] text-accent underline-offset-4 hover:underline"
                >
                  {t('links.contact')}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2" style={fadeInUp(0.40)}>
            {privacySections.map((section) => {
              const Icon = section.icon;
              const heading = t(`sections.${section.key}.heading`);
              const paragraph = t(`sections.${section.key}.paragraph`);

              return (
                <article
                  key={section.key}
                  className={`rounded-lg border border-border/20 bg-surface p-8 transition-colors duration-200 hover:bg-surface-elevated ${section.key === 'contact' ? 'lg:col-span-2' : ''}`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mb-4 text-[1.125rem] font-medium text-text-primary">{heading}</h2>
                  {section.key === 'contact' ? (
                    <p className="max-w-[60ch] text-[0.875rem] leading-relaxed text-text-secondary">
                      {paragraph}{' '}
                      <a className="font-semibold text-text-primary underline-offset-4 hover:underline" href={`mailto:${t('contact.email')}`} aria-label={t('contact.email')}>
                        {t('contact.email')}
                      </a>
                      .
                    </p>
                  ) : (
                    <p className="max-w-[60ch] text-[0.875rem] leading-relaxed text-text-secondary">
                      {paragraph}
                    </p>
                  )}
                </article>
              );
            })}
          </section>

        </div>
      </div>
    </>
  );
};
