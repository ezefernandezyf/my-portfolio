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
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">{t('header.title')}</h1>
          <p className="text-sm text-muted">{t('header.subtitle')}</p>
        </header>

        <div className="mb-6 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="input input-sm flex-1"
            aria-label={t('search.ariaLabel')}
          />
        </div>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.slice(0, visibleCount).map((p) => (
            <ProjectCard key={p.id} {...p} image={p.images?.[0]} />
          ))}
        </section>

        {visibleCount < filtered.length && (
          <div className="mt-6 text-center">
            <button onClick={() => setVisibleCount((c) => c + 9)} className="btn btn-outline">
              {t('button.loadMore')}
            </button>
          </div>
        )}
      </main>
    </>
  );
};
