import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { openSourceContributions } from '../data/openSource';
import { ROUTE_META } from '../data/route-meta';
import { MetaTags } from '../shared/seo';

const GITHUB_PROFILE_URL = 'https://github.com/ezefernandezyf';

const fadeInUp = (delay = 0): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${delay}s forwards`,
  opacity: 0,
});

type ContributionBlockProps = {
  heading: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ContributionBlock = ({ heading, body, icon: Icon }: ContributionBlockProps): React.JSX.Element => (
  <div>
    <h3 className="mb-3 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
      <span aria-hidden="true">
        <Icon className="h-4 w-4 text-accent" />
      </span>
      {heading}
    </h3>
    <p className="text-[0.875rem] leading-relaxed text-text-secondary">{body}</p>
  </div>
);

export const OpenSourcePage = (): React.JSX.Element => {
  const { t, i18n } = useTranslation('opensource');
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const locale = lang === 'en' ? 'en-US' : 'es-AR';

  const formatDate = (isoDate: string): string =>
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(`${isoDate}T00:00:00`),
    );

  const formatNumber = (value: number): string => new Intl.NumberFormat(locale).format(value);

  // Derived from the data, never typed by hand: a wrong stat is a wrong claim.
  const repositoryCount = new Set(openSourceContributions.map((item) => item.repository)).size;
  const releaseCount = openSourceContributions.filter((item) => item.releasedIn).length;

  const stats = [
    { key: 'merged', value: openSourceContributions.length },
    { key: 'repositories', value: repositoryCount },
    { key: 'releases', value: releaseCount },
  ];

  return (
    <>
      <MetaTags
        title={ROUTE_META['open-source'][lang].title}
        description={ROUTE_META['open-source'][lang].description}
        pathname="/open-source"
        type="article"
      />

      <div className="pb-24 pt-24">
        <div className="site-container space-y-24">
          <section
            aria-labelledby="open-source-heading"
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end"
            style={fadeInUp()}
          >
            <div className="lg:col-span-8">
              <p className="mb-4 font-body text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
                {t('eyebrow')}
              </p>
              <h1
                id="open-source-heading"
                className="font-display text-[2.75rem] font-medium leading-tight tracking-[-0.03em] text-text-primary sm:text-[3.25rem]"
              >
                {t('title')}
              </h1>
              <p className="mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-text-secondary">
                {t('intro')}
              </p>
            </div>

            <aside className="lg:col-span-4 lg:border-l lg:border-border/20 lg:pl-12">
              <div className="space-y-4 rounded-lg border border-border/20 bg-surface p-6">
                {stats.map((stat) => (
                  <div key={stat.key} className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-[1.75rem] leading-none text-text-primary">
                      {formatNumber(stat.value)}
                    </span>
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
                      {t(`stats.${stat.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section aria-label={t('title')} className="space-y-6">
            {openSourceContributions.map((contribution, index) => {
              const keyPrefix = `contributions.${contribution.keyPrefix}`;
              const chips: string[] = [];

              if (contribution.releasedIn) {
                chips.push(
                  t('labels.releasedIn', {
                    version: `${contribution.packageName} ${contribution.releasedIn}`,
                  }),
                );
              }
              if (contribution.approvals) {
                chips.push(t('labels.approvals', { total: contribution.approvals }));
              }
              if (contribution.reviewCycle) {
                chips.push(t('labels.reviewCycle'));
              }

              return (
                <article
                  key={contribution.id}
                  className="rounded-lg border border-border/20 bg-surface p-8 transition-colors duration-200 hover:bg-surface-elevated"
                  style={fadeInUp(0.1 + index * 0.08)}
                >
                  <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border/20 pb-6">
                    <div>
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
                        {t('labels.pullRequest', { number: contribution.pullRequestNumber })} ·{' '}
                        {t('labels.mergedAt', { date: formatDate(contribution.mergedAt) })}
                      </p>
                      <h2 className="mt-2 font-display text-[1.5rem] font-medium tracking-[-0.01em] text-text-primary">
                        {contribution.repository}
                      </h2>
                      <p className="mt-2 text-sm text-text-secondary">
                        {t('labels.stars', { total: formatNumber(contribution.stars) })} ·{' '}
                        {t('labels.diff', { diff: contribution.diff })}
                      </p>
                    </div>

                    {chips.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {chips.map((chip) => (
                          <li
                            key={chip}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-secondary"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    )}
                  </header>

                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <ContributionBlock
                      heading={t('labels.problem')}
                      body={t(`${keyPrefix}.problem`)}
                      icon={ExclamationTriangleIcon}
                    />
                    <ContributionBlock
                      heading={t('labels.change')}
                      body={t(`${keyPrefix}.change`)}
                      icon={WrenchScrewdriverIcon}
                    />
                    <ContributionBlock
                      heading={t('labels.review')}
                      body={t(`${keyPrefix}.review`)}
                      icon={CheckIcon}
                    />
                  </div>

                  <footer className="mt-6 border-t border-border/20 pt-6">
                    <a
                      href={contribution.pullRequestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.05em] text-accent underline-offset-4 hover:underline"
                    >
                      {t('labels.viewOnGithub', { number: contribution.pullRequestNumber })}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </footer>
                </article>
              );
            })}
          </section>

          <section
            aria-labelledby="open-source-verification-heading"
            className="grid grid-cols-1 gap-8 border-t border-border/20 pt-12 lg:grid-cols-12"
            style={fadeInUp(0.4)}
          >
            <div className="lg:col-span-8">
              <h2
                id="open-source-verification-heading"
                className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-text-primary"
              >
                {t('verification.heading')}
              </h2>
              <p className="mt-4 max-w-[65ch] text-[1rem] leading-relaxed text-text-secondary">
                {t('verification.paragraph')}
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-border/20 lg:pl-12">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.05em] text-accent underline-offset-4 hover:underline"
              >
                {t('verification.profileCta')}
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
