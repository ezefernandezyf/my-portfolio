import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectRepository } from '../../../../entities/project';
import { ProjectCard } from '../../../../shared/ui/project-card';

const INITIAL_VISIBLE_PROJECTS = 6;
const LOAD_MORE_STEP = 3;

const normalize = (value: string): string => value.toLowerCase().trim();

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

export const ProjectsListPage = (): React.JSX.Element => {
  const { t } = useTranslation('projects');
  const [query, setQuery] = useState('');
  const [visibleProjects, setVisibleProjects] = useState(INITIAL_VISIBLE_PROJECTS);
  const projects = projectRepository.getProjects();

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
    <motion.main className="bg-base-100" initial="hidden" animate="visible" variants={pageVariants}>
      <motion.section className="border-b border-base-300/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_42%),linear-gradient(180deg,rgba(2,6,23,0.03),transparent_28%)]" variants={riseVariants}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-6 py-24 lg:px-10 lg:py-10 lg:pt-50">
          <motion.div className="max-w-3xl space-y-5" variants={riseVariants}>
            <motion.div className="space-y-4" variants={riseVariants}>
              <motion.h1 className="font-headline text-[3.5rem] font-bold leading-none tracking-[-0.02em] text-on-surface" variants={riseVariants}>
                {t('meta.title')}
              </motion.h1>
              <motion.p className="max-w-[60ch] text-[1.125rem] leading-relaxed text-on-surface-variant" variants={riseVariants}>
                {t('meta.description')}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div className="grid gap-4 rounded-4xl border border-base-300 bg-base-100/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-4" variants={riseVariants}>
            <label className="flex items-center gap-3 rounded-4xl border border-base-300 bg-base-200/60 px-4 py-3 text-base-content/60 transition-colors focus-within:border-primary/40 focus-within:bg-base-100">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 stroke-current" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
                <circle cx="11" cy="11" r="6.5" />
              </svg>
              <input
                aria-label={t('search.ariaLabel')}
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-base-content/35"
                placeholder={t('search.placeholder')}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <button
              type="button"
              aria-label={t('button.filters')}
              className="inline-flex items-center justify-center gap-2 rounded-[1.4rem] border border-base-300 bg-base-200/70 px-5 py-3 text-sm font-semibold text-base-content transition-colors hover:border-primary/30 hover:bg-primary/5 md:min-w-36"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current" strokeWidth="1.8">
                <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.4" />
                <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.4" />
                <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.4" />
                <rect x="14" y="14" width="6.5" height="6.5" rx="1.4" />
              </svg>
              {t('button.filters')}
            </button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-7xl px-6 pt-12 pb-10 lg:px-10 lg:pt-16 lg:pb-12" variants={pageVariants} initial="hidden" animate="visible">
        <motion.div className="mb-6 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-base-content/45" variants={riseVariants}>
          <span>{filteredProjects.length} projects</span>
          <span>{visibleItems.length} visible</span>
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-2 lg:gap-6" variants={pageVariants}>
          {visibleItems.map((project) => (
            <motion.div key={project.id} variants={riseVariants}>
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
            </motion.div>
          ))}
        </motion.div>

        {canLoadMore ? (
          <motion.div className="mt-10 flex justify-center" variants={riseVariants}>
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center rounded-full border border-base-300 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              {t('button.loadMore')}
            </button>
          </motion.div>
        ) : null}
      </motion.section>
    </motion.main>
  );
};