import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components';
import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';

export const ProjectsPage = (): React.JSX.Element => {
  const { t } = useTranslation('projects');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const name = t(p.nameKey).toLowerCase();
      const short = t(p.shortKey).toLowerCase();
      const matchesQuery =
        !q ||
        name.includes(q) ||
        short.includes(q) ||
        (p.tech ?? []).some((tname) => tname.toLowerCase().includes(q));
      return matchesQuery;
    });
  }, [query, t]);

  const visibleProjects = filtered.slice(0, visibleCount);

  return (
    <>
      <MetaTags
        title={t('meta.title')}
        description={t('meta.description')}
        pathname="/projects"
        type="website"
      />
      <main className="site-container pb-12 pt-8">
        <div className="page-shell">
          <header className="section-shell p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{t('meta.title')}</p>
            <h1 className="mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight wrap-break-word">
              {t('projects:header.title')}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted wrap-break-word">
              {t('projects:header.subtitle')}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="input input-sm input-minimal input-outline flex-1"
                aria-label={t('search.ariaLabel')}
              />
            </div>
          </header>

          {visibleProjects.map((project) => (
            <section key={project.id} className="section-shell overflow-hidden border border-primary/20 bg-base-100">
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-base-200">
                  <img
                    src={project.images?.[0]}
                    alt={`${t(project.nameKey)} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    {t('meta.title')}
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight wrap-break-word">
                    {t(project.nameKey)}
                  </h2>
                  <p className="mt-3 text-sm md:text-base leading-7 text-muted wrap-break-word">
                    {t(project.shortKey)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(project.tech ?? []).slice(0, 6).map((tech) => (
                      <span key={tech} className="chip chip-outline">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn btn-primary btn-minimal w-full min-w-0 whitespace-nowrap text-center text-[0.72rem] sm:text-sm"
                    >
                      {t('links.caseStudy')}
                    </Link>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-minimal w-full min-w-0 whitespace-nowrap text-center text-[0.72rem] sm:text-sm"
                        aria-label={`${t('links.repo')} ${t(project.nameKey)}`}
                      >
                        {t('links.repo')}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-minimal w-full min-w-0 whitespace-nowrap text-center text-[0.72rem] sm:text-sm"
                        aria-label={`${t('links.demo')} ${t(project.nameKey)}`}
                      >
                        {t('links.demo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}

          {visibleCount < filtered.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 9)}
                className="btn btn-outline btn-minimal"
              >
                {t('button.loadMore')}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
