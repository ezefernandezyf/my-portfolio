import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectRepository } from '../../../../entities/project';
import { ProjectCard } from '../../../../shared/ui/project-card';

const INITIAL_VISIBLE_PROJECTS = 6;
const LOAD_MORE_STEP = 3;

const normalize = (value: string): string => value.toLowerCase().trim();

const fadeInUp = (delay = 0): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${delay}s forwards`,
  opacity: 0,
});

export const ProjectsListPage = (): React.JSX.Element => {
  const { t } = useTranslation('projects');
  const [query, setQuery] = useState('');
  const [visibleProjects, setVisibleProjects] = useState(INITIAL_VISIBLE_PROJECTS);
  const projects = projectRepository.getProjects();

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);
  const [reducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const normalizedQuery = normalize(query);
  const filteredProjects = projects.filter((project) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchableContent = [
      t(project.nameKey),
      t(project.shortKey),
      project.tech.join(' '),
      project.year.toString(),
      project.id,
    ]
      .join(' ')
      .toLowerCase();

    return searchableContent.includes(normalizedQuery);
  });

  const visibleItems = filteredProjects.slice(0, visibleProjects);
  const canLoadMore = visibleProjects < filteredProjects.length;

  const handleLoadMore = (): void => {
    setVisibleProjects((currentVisibleProjects) => currentVisibleProjects + LOAD_MORE_STEP);
  };

  return (
    <main className="bg-bg-primary">
      <section className="border-b border-border/70 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_42%),linear-gradient(180deg,rgba(2,6,23,0.03),transparent_28%)]" style={fadeInUp()}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-6 py-24 lg:px-10 lg:py-10 lg:pt-50">
          <div className="max-w-3xl space-y-5">
            <div className="space-y-4">
              <h1 className="font-display text-[3.5rem] leading-none tracking-[-0.02em] text-text-primary" style={fadeInUp(0.08)}>
                {t('meta.title')}
              </h1>
              <p className="max-w-[60ch] text-[1.125rem] leading-relaxed text-text-secondary" style={fadeInUp(0.16)}>
                {t('meta.description')}
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-4xl border border-border bg-bg-primary/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-4">
            <label className="flex items-center gap-3 rounded-4xl border border-border bg-surface/60 px-4 py-3 text-text-secondary transition-colors focus-within:border-accent/40 focus-within:bg-bg-primary">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 stroke-current" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
                <circle cx="11" cy="11" r="6.5" />
              </svg>
              <input
                aria-label={t('search.ariaLabel')}
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-text-muted"
                placeholder={t('search.placeholder')}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <button
              type="button"
              aria-label={t('button.filters')}
              className="inline-flex items-center justify-center gap-2 rounded-[1.4rem] border border-border bg-surface/70 px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent/30 hover:bg-accent/5 md:min-w-36"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current" strokeWidth="1.8">
                <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.4" />
                <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.4" />
                <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.4" />
                <rect x="14" y="14" width="6.5" height="6.5" rx="1.4" />
              </svg>
              {t('button.filters')}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pt-12 pb-10 lg:px-10 lg:pt-16 lg:pb-12" style={fadeInUp(0.24)}>
        <div className="mb-6 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
          <span>{filteredProjects.length} projects</span>
          <span>{visibleItems.length} visible</span>
        </div>

        <div ref={gridRef} className="grid gap-6 lg:grid-cols-2 lg:gap-6">
          {visibleItems.map((project, index) => (
            <div
              key={project.id}
              className={gridVisible ? 'animate-fade-in-up' : 'opacity-0'}
              style={reducedMotion ? undefined : { animationDelay: `${index * 50}ms` }}
            >
              <ProjectCard
                id={project.id}
                nameKey={project.nameKey}
                shortKey={project.shortKey}
                repo={project.repo}
                demo={project.demo}
                image={project.images[0]}
                tech={project.tech}
                year={project.year}
              />
            </div>
          ))}
        </div>

        {canLoadMore ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center rounded-full border border-border bg-bg-primary px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent/30 hover:bg-accent/5"
            >
              {t('button.loadMore')}
            </button>
          </div>
        ) : null}
      </section>

      {/* Expanded content section for SEO — crawler-accessible, above 200 words */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary font-display">
              {t('contentSection.heading')}
            </h2>
            <p className="text-base leading-relaxed text-text-secondary font-body">
              {t('contentSection.paragraph1')}
            </p>
            <p className="text-base leading-relaxed text-text-secondary font-body">
              {t('contentSection.paragraph2')}
            </p>
            <p className="text-base leading-relaxed text-text-secondary font-body">
              {t('contentSection.paragraph3')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};