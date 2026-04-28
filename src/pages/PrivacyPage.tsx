import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const pageVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const riseVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

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

      <motion.main role="main" className="pb-24 pt-24" initial="hidden" animate="visible" variants={pageVariants}>
        <div className="site-container space-y-24">
          <motion.section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end" variants={riseVariants}>
            <div className="lg:col-span-8">
              <motion.p className="mb-4 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline" variants={riseVariants}>
                Privacy & Trust
              </motion.p>
              <motion.h1 className="font-headline text-[2.75rem] font-medium leading-tight tracking-[-0.03em] text-on-surface sm:text-[3.25rem]" variants={riseVariants}>
                {t('title')}
              </motion.h1>
              <motion.p className="mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-on-surface-variant" variants={riseVariants}>
                {t('intro')}
              </motion.p>
            </div>

            <motion.aside className="lg:col-span-4 lg:border-l lg:border-outline-variant/20 lg:pl-12" variants={riseVariants}>
              <div className="rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline">
                  {t('lastUpdated', { date: lastUpdated })}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                  {t('note')}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.05em] text-primary-fixed underline-offset-4 hover:underline"
                >
                  {t('links.contact')}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.aside>
          </motion.section>

          <motion.section className="grid grid-cols-1 gap-6 lg:grid-cols-2" variants={pageVariants}>
            {privacySections.map((section) => {
              const Icon = section.icon;
              const heading = t(`sections.${section.key}.heading`);
              const paragraph = t(`sections.${section.key}.paragraph`);

              return (
                <motion.article
                  key={section.key}
                  className={`rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-8 transition-colors duration-200 hover:bg-surface-container-high ${section.key === 'contact' ? 'lg:col-span-2' : ''}`}
                  variants={riseVariants}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-low text-primary-fixed">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mb-4 text-[1.125rem] font-medium text-on-surface">{heading}</h2>
                  {section.key === 'contact' ? (
                    <p className="max-w-[60ch] text-[0.875rem] leading-relaxed text-on-surface-variant">
                      {paragraph}{' '}
                      <a className="font-semibold text-on-surface underline-offset-4 hover:underline" href={`mailto:${t('contact.email')}`} aria-label={t('contact.email')}>
                        {t('contact.email')}
                      </a>
                      .
                    </p>
                  ) : (
                    <p className="max-w-[60ch] text-[0.875rem] leading-relaxed text-on-surface-variant">
                      {paragraph}
                    </p>
                  )}
                </motion.article>
              );
            })}
          </motion.section>

        </div>
      </motion.main>
    </>
  );
};
