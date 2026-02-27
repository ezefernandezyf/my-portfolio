import { Link } from 'react-router-dom';
import { ProjectCarousel } from '../components';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { MetaTags } from '../components';
import { useTranslation } from 'react-i18next';

export const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation(['home', 'projects']);

  const featuredName = t('projects:cinelab.name');
  const featuredShort = t('projects:cinelab.short');

  return (
    <>
      <MetaTags
        title={t('meta.title', { ns: 'home' })}
        description={t('meta.description', { ns: 'home' })}
        pathname="/"
        image="/og-image.png"
      />

      <main role="main" className="site-container pb-12 pt-8">
        <section
          aria-labelledby="home-hero-title"
          className="grid gap-8 md:gap-12 md:grid-cols-2 items-center"
        >
          <div>
            <p className="text-sm text-primary font-medium mb-2">
              {t('hero.greeting', { ns: 'home' })}
            </p>
            <h1 id="home-hero-title" className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t('hero.name', { ns: 'home' })}
            </h1>
            <p className="mt-3 text-lg text-muted max-w-xl">{t('hero.summary', { ns: 'home' })}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/about"
                className="btn btn-primary"
                aria-label={t('hero.cta.about', { ns: 'home' })}
              >
                {t('hero.cta.about', { ns: 'home' })}
              </Link>

              <Link
                to="/projects"
                className="btn btn-outline"
                aria-label={t('hero.cta.projects', { ns: 'home' })}
              >
                {t('hero.cta.projects', { ns: 'home' })}
              </Link>

              <a
                href="/Ezequiel_Fernandez_CV.pdf"
                className="btn btn-ghost"
                aria-label={t('hero.cta.downloadCV', { ns: 'home' })}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.cta.downloadCV', { ns: 'home' })}
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">{t('stack.heading', { ns: 'home' })}</h3>
              <ul className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'JavaScript', 'Vite', 'Testing'].map((tName) => (
                  <li
                    key={tName}
                    className="px-3 py-1 rounded-full bg-base-200 text-sm text-muted"
                    aria-hidden
                  >
                    {tName}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside aria-label="Preview destacado" className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-base-200">
              <img
                src="/profile.jpg"
                alt={t('hero.name', { ns: 'home' })}
                width={64}
                height={64}
                loading="lazy"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{t('hero.name', { ns: 'home' })}</p>
                <p className="text-sm text-muted">{t('hero.role', { ns: 'home' })}</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-base-200 bg-base-100 shadow-sm">
              <div className="relative">
                <ProjectCarousel
                  images={[
                    '/projects/cinelab-1.jpg',
                    '/projects/cinelab-2.jpg',
                    '/projects/cinelab-3.jpg',
                    '/projects/cinelab-4.jpg',
                  ]}
                  interval={3500}
                  autoPlay={true}
                  alt={t('featured.title', { ns: 'home' }) + ' preview'}
                />
              </div>

              <div className="p-4">
                <h4 className="font-semibold">{featuredName}</h4>
                <p className="text-sm text-muted mt-1">{featuredShort}</p>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Link
                    to="/projects#cinelab"
                    className="hover:text-primary hover:underline"
                    aria-label={t('featured.caseStudyLinkAria', { ns: 'home' })}
                  >
                    {t('featured.caseStudyBtn', { ns: 'home' })}
                  </Link>

                  <a
                    href="https://github.com/ezefernandezyf/cinelab-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 not-first-of-type:text-muted hover:text-primary hover:underline"
                    aria-label={t('featured.repoAria', { ns: 'home', name: featuredName })}
                  >
                    {t('featured.repoBtn', { ns: 'home' })}
                  </a>
                  <a
                    href="https://cinelab-movies.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-flex items-center gap-2 btn btn-outline"
                    aria-label={t('featured.demoAria', { ns: 'home', name: featuredName })}
                  >
                    {t('featured.demoBtn', { ns: 'home' })}
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="px-2 py-1 rounded bg-base-200">React</span>
                  <span className="px-2 py-1 rounded bg-base-200">TypeScript</span>
                  <span className="px-2 py-1 rounded bg-base-200">TMDB API</span>
                  <span className="px-2 py-1 rounded bg-base-200">Vite</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-base-200 bg-base-100">
              <h5 className="font-semibold">{t('cards.projects.title', { ns: 'home' })}</h5>
              <p className="text-sm text-muted mt-2">{t('cards.projects.text', { ns: 'home' })}</p>
              <Link to="/projects" className="mt-3 inline-block text-sm hover:text-primary">
                {t('cards.projects.link', { ns: 'home' })}
              </Link>
            </div>

            <div className="p-4 rounded-lg border border-base-200 bg-base-100">
              <h5 className="font-semibold">{t('cards.contact.title', { ns: 'home' })}</h5>
              <p className="text-sm text-muted mt-2">{t('cards.contact.text', { ns: 'home' })}</p>
              <Link to="/contact" className="mt-3 inline-block text-sm hover:text-primary">
                {t('cards.contact.link', { ns: 'home' })}
              </Link>
            </div>

            <div className="p-4 rounded-lg border border-base-200 bg-base-100">
              <h5 className="font-semibold">{t('cards.cv.title', { ns: 'home' })}</h5>
              <p className="text-sm text-muted mt-2">{t('cards.cv.text', { ns: 'home' })}</p>
              <a
                href="/Ezequiel_Fernandez_CV.pdf"
                className="mt-3 inline-block text-sm hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cards.cv.link', { ns: 'home' })}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
