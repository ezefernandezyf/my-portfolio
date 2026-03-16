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
        <div className="grid-clean">
          <header className="mb-6">
            <h1 className="text-[40px] leading-9 font-semibold wrap-break-word">{t('header.title')}</h1>
            <p className="text-[16px] leading-6 text-muted wrap-break-word">{t('header.subtitle')}</p>
          </header>

          <div className="mb-6 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="input input-sm input-minimal input-outline flex-1"
            aria-label={t('search.ariaLabel')}
          />
        </div>
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
