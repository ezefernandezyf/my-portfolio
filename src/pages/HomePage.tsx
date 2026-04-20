import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';
import { MetaTags, ProjectCard, ProjectCarousel } from '../components';
import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';

const HOME_PROJECT_LIMIT = 2;

type Project = (typeof projects)[number];

const selectHomeProjects = (items: Project[]): Project[] => {
  const featured = items.filter((project) => project.featured);
  const ordered = featured.length > 0 ? featured : items;

  return ordered.slice(0, HOME_PROJECT_LIMIT);
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

export const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation(['home', 'projects']);
  const reduceMotion = useReducedMotion();
  const recentProjects = selectHomeProjects(projects);

  const featuredName = t('projects:movie-dashboard.name');
  const featuredShort = t('projects:movie-dashboard.short');

  return (
    <>
      <MetaTags
        title={t('meta.title', { ns: 'home' })}
        description={t('meta.description', { ns: 'home' })}
        pathname="/"
        image="/og-image.png"
      />

      <main role="main" className="site-container pb-14 pt-8 md:pb-16">
        <motion.div
          className="page-shell"
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.section
            aria-labelledby="home-hero-title"
            className="section-shell grid gap-8 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10"
            variants={itemVariants}
          >
            <div>
              <p className="inline-flex items-center rounded-full border border-base-200 bg-base-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                {t('hero.greeting', { ns: 'home' })}
              </p>
              <h1
                id="home-hero-title"
                className="mt-4 text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight wrap-break-word"
              >
                {t('hero.name', { ns: 'home' })}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted wrap-break-word">
                {t('hero.summary', { ns: 'home' })}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="btn btn-primary btn-minimal"
                  aria-label={t('hero.cta.about', { ns: 'home' })}
                >
                  {t('hero.cta.about', { ns: 'home' })}
                </Link>

                <Link
                  to="/projects"
                  className="btn btn-outline btn-minimal"
                  aria-label={t('hero.cta.projects', { ns: 'home' })}
                >
                  {t('hero.cta.projects', { ns: 'home' })}
                </Link>

                <a
                  href="/Ezequiel_Fernandez_CV.pdf"
                  className="btn btn-ghost btn-minimal"
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
                  {['React', 'TypeScript', 'JavaScript', 'Vite', 'Testing', 'TanStack Query'].map((tName) => (
                    <li key={tName} className="chip chip-ghost" aria-hidden>
                      {tName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside aria-label="Preview destacado" className="space-y-5 lg:max-w-md lg:justify-self-end">
              <div className="flex items-center gap-4 rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
                <img
                  src="/profile.jpg"
                  alt={t('hero.name', { ns: 'home' })}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold">{t('hero.name', { ns: 'home' })}</p>
                  <p className="text-sm text-muted">{t('hero.role', { ns: 'home' })}</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm">
                <ProjectCarousel
                  images={[
                    '/projects/moviedash-1.jpg',
                    '/projects/moviedash-2.jpg',
                    '/projects/moviedash-3.jpg',
                    '/projects/moviedash-4.jpg',
                  ]}
                  interval={3500}
                  autoPlay={true}
                  alt={t('featured.title', { ns: 'home' }) + ' preview'}
                />

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    {t('featured.caseStudyBtn', { ns: 'home' })}
                  </p>
                  <h4 className="mt-2 font-semibold wrap-break-word">{featuredName}</h4>
                  <p className="mt-1 text-sm text-muted wrap-break-word">{featuredShort}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <Link
                      to="/projects/movie-dashboard"
                      className="hover:text-primary hover:underline underline-offset-4"
                      aria-label={t('featured.caseStudyLinkAria', { ns: 'home' })}
                    >
                      {t('featured.caseStudyBtn', { ns: 'home' })}
                    </Link>

                    <a
                      href="https://github.com/ezefernandezyf/movie-management-dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline underline-offset-4"
                      aria-label={t('featured.repoAria', { ns: 'home', name: featuredName })}
                    >
                      {t('featured.repoBtn', { ns: 'home' })}
                    </a>
                    <a
                      href="https://moviesdashboard.vercel.app/home"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn btn-outline btn-minimal"
                      aria-label={t('featured.demoAria', { ns: 'home', name: featuredName })}
                    >
                      {t('featured.demoBtn', { ns: 'home' })}
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
                    </a>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                    <span className="chip chip-outline">React</span>
                    <span className="chip chip-outline">TypeScript</span>
                    <span className="chip chip-outline">Vite</span>
                    <span className="chip chip-outline">TanStack Query</span>
                    <span className="chip chip-outline">Supabase</span>
                  </div>
                </div>
              </div>
            </aside>

          </motion.section>

          <motion.section
            aria-labelledby="home-recent-work-title"
            className="section-shell bg-base-100/95 p-6 md:p-8 lg:p-10"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                  {t('sections.recentWork.eyebrow', { ns: 'home' })}
                </p>
                <h2 id="home-recent-work-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {t('sections.recentWork.title', { ns: 'home' })}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted">
                  {t('sections.recentWork.description', { ns: 'home' })}
                </p>
              </div>

              <Link to="/projects" className="btn btn-ghost btn-minimal self-start md:self-auto">
                {t('sections.recentWork.viewAll', { ns: 'home' })}
              </Link>
            </div>

            <motion.div className="mt-8 grid gap-6 lg:grid-cols-2" variants={containerVariants}>
              {recentProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="h-full">
                  <ProjectCard
                    id={project.id}
                    nameKey={project.nameKey}
                    shortKey={project.shortKey}
                    repo={project.repo}
                    demo={project.demo}
                    images={project.images}
                    tech={project.tech}
                    year={project.year}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
      </main>
    </>
  );
};
