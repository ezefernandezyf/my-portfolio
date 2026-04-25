import { ArrowTopRightOnSquareIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MetaTags, ProjectCard } from '../components';
import { projects } from '../data/projects';

const featuredProjects = projects.slice(0, 2);
const technicalStack = ['React', 'TypeScript', 'JS (ES6+)', 'Vite', 'Testing Library', 'TanStack Query'];

const pageVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
} as const;

const riseVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation(['home', 'projects']);

  const projectCountLabel = String(projects.length).padStart(2, '0');

  return (
    <>
      <MetaTags
        title={t('meta.title', { ns: 'home' })}
        description={t('meta.description', { ns: 'home' })}
        pathname="/"
        image="/og-image.png"
      />

      <motion.main role="main" initial="hidden" animate="visible" variants={pageVariants}>
        <section className="site-container flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-12 pt-32">
          <motion.div className="max-w-[60ch]" variants={riseVariants}>
            <motion.p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-fixed font-label" variants={riseVariants}>
              {t('hero.label', { ns: 'home' })}
            </motion.p>

            <motion.h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl font-headline" variants={riseVariants}>
              <span className="block">{t('hero.name', { ns: 'home' }).split(' ')[0]}</span>
              <span>{t('hero.name', { ns: 'home' }).split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.h2 className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-on-surface-variant md:text-2xl" variants={riseVariants}>
              {t('hero.summary', { ns: 'home' })}
            </motion.h2>

            <motion.div className="mt-12 flex flex-wrap items-center gap-6" variants={riseVariants}>
              <Link
                aria-label={t('hero.cta.projects', { ns: 'home' })}
                className="inline-flex h-14 items-center justify-center bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90 focus-ring active:scale-95"
                to="/projects"
              >
                {t('hero.cta.projects', { ns: 'home' })}
              </Link>

              <Link
                aria-label={t('hero.cta.about', { ns: 'home' })}
                className="inline-flex h-14 items-center justify-center border border-outline/20 px-8 text-sm font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-surface-container-low focus-ring active:scale-95"
                to="/about"
              >
                {t('hero.cta.about', { ns: 'home' })}
              </Link>

              <a
                aria-label={t('hero.cta.downloadCV', { ns: 'home' })}
                className="inline-flex h-14 items-center gap-2 px-4 text-sm font-bold uppercase tracking-tight text-primary-fixed hover:underline underline-offset-8 focus-ring"
                href="/Ezequiel_Fernandez_CV.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                {t('hero.cta.downloadCV', { ns: 'home' })}
                <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform" aria-hidden />
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="mt-24" variants={riseVariants}>
            <motion.p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-outline" variants={riseVariants}>
              {t('stackHeading', { ns: 'home' })}
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={riseVariants}>
              {technicalStack.map((stackItem) => (
                <motion.span
                  key={stackItem}
                  className="border border-outline-variant/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                  variants={riseVariants}
                >
                  {stackItem}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <motion.section className="bg-surface-container-low py-24" id="projects" variants={riseVariants}>
          <div className="site-container">
            <motion.div className="mb-16 flex items-end justify-between border-b border-outline-variant/20 pb-8" variants={riseVariants}>
              <motion.h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl" variants={riseVariants}>
                {t('recentWorkHeading', { ns: 'home' })}
              </motion.h2>
              <motion.p className="text-sm font-medium text-outline" variants={riseVariants}>02 / {projectCountLabel}</motion.p>
            </motion.div>

            <motion.div className="grid grid-cols-1 gap-8 lg:grid-cols-2" variants={pageVariants}>
              {featuredProjects.map((project) => (
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
          </div>
        </motion.section>

        <motion.section className="site-container py-32 text-center" id="contact" variants={riseVariants}>
          <div className="mx-auto max-w-2xl">
            <CommandLineIcon className="mx-auto mb-8 h-12 w-12 text-primary-fixed" aria-hidden />
            <motion.h2 className="mb-6 font-headline text-4xl font-bold tracking-tight md:text-5xl" variants={riseVariants}>
              {t('contactTitle', { ns: 'home' })}
            </motion.h2>
            <motion.p className="mb-12 text-xl font-medium text-on-surface-variant" variants={riseVariants}>
              {t('contactText', { ns: 'home' })}
            </motion.p>
            <Link
              className="inline-flex h-16 items-center gap-4 bg-primary px-12 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform active:scale-95 focus-ring"
              to="/contact"
            >
              {t('contactCta', { ns: 'home' })}
              <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform" aria-hidden />
            </Link>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
};
