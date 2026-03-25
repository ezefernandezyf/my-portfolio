import { useMemo, useState } from 'react';
import { MetaTags, ProjectCard } from '../components';
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

          <section className="grid gap-6 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))] sm:justify-center">
            {filtered.slice(0, visibleCount).map((p) => (
              <ProjectCard key={p.id} {...p} image={p.images?.[0]} />
            ))}
          </section>

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
