import { Link } from 'react-router-dom';
import { about } from '../data/about';
import { MetaTags, TechCategories } from '../components';
import { useTranslation } from 'react-i18next';

export const AboutPage = (): React.JSX.Element => {
  const { t } = useTranslation('aboutpage');
  const { name, role, projects, education, github, linkedIn, cv, email } = about;

  return (
    <>
      <MetaTags title={t('meta.title')} description={t('summary')} pathname="/about" type="website" />
      <main role="main" className="site-container pb-12 pt-8">
        <section className="grid gap-8 md:grid-cols-3 items-start">
          <aside className="md:col-span-1">
            <div className="p-4 rounded-lg bg-base-200">
              <img
                src="/profile.jpg"
                alt={t('hero.photoAlt', { name })}
                className="w-32 h-32 rounded-md object-cover mx-auto"
                width={128}
                height={128}
              />
              <h2 className="mt-4 text-center text-2xl font-semibold">{name}</h2>
              <p className="text-center text-sm text-muted">{role}</p>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-minimal w-full"
                  aria-label={t('hero.downloadCV')}
                >
                  {t('hero.downloadCV')}
                </a>

                <div className="flex justify-center gap-3 mt-2">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('hero.github')}
                    className="btn btn-ghost btn-sm btn-minimal"
                  >
                    {t('hero.github')}
                  </a>
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('hero.linkedIn')}
                    className="btn btn-ghost btn-sm btn-minimal"
                  >
                    {t('hero.linkedIn')}
                  </a>
                </div>
              </div>

              <div className="mt-4 text-xs text-muted text-center">
                <div>{email}</div>
                <div className="mt-1">{t('availability')}</div>
              </div>
            </div>

            <TechCategories
              categories={about.categories}
              abilities={about.abilities}
            />
          </aside>

          <div className="md:col-span-2 space-y-6">
            <article className="prose dark:prose-invert max-w-none">
              <h1 className="text-xl font-semibold mb-4">{t('h1')}</h1>
              <div className="rounded-lg bg-base-100 border border-base-200 p-4">
                <p>{t('summary')}</p>
              </div>
            </article>

            <section>
              <h3 className="text-lg font-semibold">{t('projects.title')}</h3>
              <ol className="mt-4 space-y-4">
                {projects.map((p) => (
                  <li key={p.id} className="bg-base-100 rounded-lg border border-base-200 p-4">
                    <strong>{t(`projects.${p.id}.name`)}</strong> — {t(`projects.${p.id}.short`)}
                    <div className="text-sm mt-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-primary">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-primary/80"
                            aria-label={t('projects.links.repo')}
                          >
                            {t('projects.links.repo')}
                          </a>
                        )}
                        {p.repo && p.demo && <span aria-hidden className="text-muted">·</span>}
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-primary/80"
                            aria-label={t('projects.links.demo')}
                          >
                            {t('projects.links.demo')}
                          </a>
                        )}
                        {(p.repo || p.demo) && <span aria-hidden className="text-muted">·</span>}
                        <Link to={`/projects/${p.id}`} className="hover:underline hover:text-primary/80">
                          {t('projects.links.caseStudy')}
                        </Link>
                      </div>
                      <div className="mt-1 text-muted">
                        <em>{t('projects.learnedLabel')}</em> {t(`projects.${p.id}.whatILearned`)}
                      </div>
                      <div className="mt-2 text-xs flex flex-wrap gap-2 text-muted">
                        {p.tech.map((tName) => (
                          <span key={tName} className="chip chip-outline">
                            {tName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-semibold">{t('education.title')}</h3>
              <div className="mt-4 grid gap-5 md:grid-cols-3 auto-rows-fr">
                {education.map((e, idx) => (
                  <article
                    key={idx}
                    className="card-minimal flex h-full flex-col overflow-hidden transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="p-5 flex h-full flex-col">
                      <h4 className="font-semibold leading-snug text-base md:text-[1.05rem]">
                        {t(`education.${idx}.title`)}
                      </h4>
                      <div className="mt-3 inline-flex w-fit rounded-full border border-base-200 bg-base-200/80 px-3 py-1 text-xs font-medium text-muted">
                        {t(e.periodKey)}
                      </div>
                      <div className="mt-auto h-px w-full bg-base-200/80" aria-hidden />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">{t('contact.title')}</h3>
              <p className="text-sm text-muted mt-2 rounded-lg bg-base-100 border border-base-200 p-4">
                {t('contact.paragraph', { email })}
              </p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};