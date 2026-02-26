import { Link } from 'react-router-dom';
import { ProjectCarousel } from '../components';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { MetaTags } from '../components';
import { useTranslation } from 'react-i18next';

export const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation('common');
  return (
    <>
      <MetaTags
        title={t('meta.home.title')}
        description={t('meta.home.description')}
        pathname="/"
        image="/og-image.png"
      />

      <main role="main" className="site-container pb-12 pt-8">
        <section
          aria-labelledby="home-hero-title"
          className="grid gap-8 md:gap-12 md:grid-cols-2 items-center"
        >
          <div>
            <p className="text-sm text-primary font-medium mb-2">{t('home.greeting')}</p>
            <h1 id="home-hero-title" className="text-4xl md:text-5xl font-extrabold leading-tight">
              Ezequiel Fernández
            </h1>
            <p className="mt-3 text-lg text-muted max-w-xl">{t('home.hero_sub')}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/about" className="btn btn-primary" aria-label={t('home.cta_about')}>
                {t('home.cta_about')}
              </Link>

              <Link to="/projects" className="btn btn-outline" aria-label={t('home.cta_projects')}>
                {t('home.cta_projects')}
              </Link>

              <a
                href="/Ezequiel_Fernandez_CV.pdf"
                className="btn btn-ghost"
                aria-label={t('home.cta_cv')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('home.cta_cv')}
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">{t('home.stack_title')}</h3>
              <ul className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'JavaScript', 'Vite', 'Testing'].map((t) => (
                  <li
                    key={t}
                    className="px-3 py-1 rounded-full bg-base-200 text-sm text-muted"
                    aria-hidden
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside aria-label="Preview destacado" className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-base-200">
              <img
                src="/profile.jpg"
                alt="Foto de Ezequiel Fernández"
                width={64}
                height={64}
                loading="lazy"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">Ezequiel Fernández</p>
                <p className="text-sm text-muted">Front-end Developer</p>
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
                  alt="CineLab preview"
                />
              </div>

              <div className="p-4">
                <h4 className="font-semibold">CineLab</h4>
                <p className="text-sm text-muted mt-1">{t('home.preview_short')}</p>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Link
                    to="/projects#cinelab"
                    className="hover:text-primary hover:underline"
                    aria-label="Ver case study CineLab"
                  >
                    {t('home.preview_actions.case_study')}
                  </Link>

                  <a
                    href="https://github.com/ezefernandezyf/cinelab-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 not-first-of-type:text-muted hover:text-primary hover:underline"
                    aria-label="Repositorio de CineLab en GitHub"
                  >
                    {t('home.preview_actions.repo')}
                  </a>
                  <a
                    href="https://cinelab-movies.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-flex items-center gap-2 btn btn-outline"
                    aria-label="Abrir demo en producción de CineLab (se abre en nueva pestaña)"
                  >
                    {t('home.preview_actions.demo')}
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
              <h5 className="font-semibold">{t('home.section.projects.title')}</h5>
              <p className="text-sm text-muted mt-2">
               {t('home.section.projects.desc')}
              </p>
              <Link to="/projects" className="mt-7 inline-block text-sm hover:text-primary">
                {t('home.section.projects.link_text')}
              </Link>
            </div>

            <div className="p-4 rounded-lg border border-base-200 bg-base-100">
              <h5 className="font-semibold">{t('home.section.contact.title')}</h5>
              <p className="text-sm text-muted mt-2">
                {t('home.section.contact.desc')}
              </p>
              <Link to="/contact" className="mt-3 inline-block text-sm hover:text-primary">
                {t('home.section.contact.link_text')}
              </Link>
            </div>

            <div className="p-4 rounded-lg border border-base-200 bg-base-100">
              <h5 className="font-semibold">{t('home.section.cv.title')}</h5>
              <p className="text-sm text-muted mt-2">{t('home.section.cv.desc')}</p>
              <a
                href="/Ezequiel_Fernandez_CV.pdf"
                className="mt-7 inline-block text-sm hover:text-primary "
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('home.section.cv.link_text')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
