import { ArrowTopRightOnSquareIcon, CodeBracketIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components';
import { projects } from '../data/projects';

type Project = (typeof projects)[number];

const featuredProjects = projects.slice(0, 2);
const technicalStack = ['React', 'TypeScript', 'JS (ES6+)', 'Vite', 'Testing Library', 'TanStack Query'];

type HomeProjectCardProps = {
  project: Project;
};

const HomeProjectCard = ({ project }: HomeProjectCardProps): React.JSX.Element => {
  const { t } = useTranslation('projects');
  const projectName = t(project.nameKey);
  const projectShort = t(project.shortKey);
  const previewImage = project.images[0];
  const topTech = project.tech.slice(0, 3);

  return (
    <article className="group flex flex-col border border-outline-variant/20 bg-surface-container-lowest p-8 transition-all duration-300 hover:border-outline-variant dark:border-outline-variant/30 dark:bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {topTech.map((tech) => (
            <span
              key={tech}
              className="border border-outline-variant/40 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-mono text-outline">{project.year}</span>
      </div>

      <h3 className="mt-8 text-3xl font-bold tracking-tight font-headline">{projectName}</h3>
      <p className="mt-4 max-w-[45ch] leading-relaxed text-on-surface-variant">{projectShort}</p>

      <div className="relative mt-12 aspect-video overflow-hidden bg-surface-container-low">
        <img
          alt={`${projectName} preview`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={previewImage}
        />
      </div>

      <div className="mt-auto flex flex-wrap gap-6 border-t border-outline-variant/10 pt-6">
        <Link
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-fixed hover:underline focus-ring"
          to={`/projects/${project.id}`}
        >
          View case study
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden />
        </Link>

        <a
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-ring"
          href={project.repo}
          rel="noopener noreferrer"
          target="_blank"
        >
          <CodeBracketIcon className="h-4 w-4" aria-hidden />
          View repo
        </a>

        <a
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-ring"
          href={project.demo}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden />
          View demo
        </a>
      </div>
    </article>
  );
};

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

      <main role="main">
        <section className="site-container flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-12 pt-32">
          <div className="max-w-[60ch]">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-fixed font-label">
              {t('hero.label', { ns: 'home' })}
            </p>

            <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl font-headline">
              <span className="block">{t('hero.name', { ns: 'home' }).split(' ')[0]}</span>
              <span>{t('hero.name', { ns: 'home' }).split(' ').slice(1).join(' ')}</span>
            </h1>

            <h2 className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-on-surface-variant md:text-2xl">
              {t('hero.summary', { ns: 'home' })}
            </h2>

            <div className="mt-12 flex flex-wrap items-center gap-6">
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
            </div>
          </div>

          <div className="mt-24">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-outline">
              {t('stackHeading', { ns: 'home' })}
            </p>

            <div className="flex flex-wrap gap-3">
              {technicalStack.map((stackItem) => (
                <span
                  key={stackItem}
                  className="border border-outline-variant/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  {stackItem}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24" id="projects">
          <div className="site-container">
            <div className="mb-16 flex items-end justify-between border-b border-outline-variant/20 pb-8">
              <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
                {t('recentWorkHeading', { ns: 'home' })}
              </h2>
              <p className="text-sm font-medium text-outline">02 / {projectCountLabel}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <HomeProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="site-container py-32 text-center" id="contact">
          <div className="mx-auto max-w-2xl">
            <CommandLineIcon className="mx-auto mb-8 h-12 w-12 text-primary-fixed" aria-hidden />
            <h2 className="mb-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              {t('contactTitle', { ns: 'home' })}
            </h2>
            <p className="mb-12 text-xl font-medium text-on-surface-variant">
              {t('contactText', { ns: 'home' })}
            </p>
            <Link
              className="inline-flex h-16 items-center gap-4 bg-primary px-12 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform active:scale-95 focus-ring"
              to="/contact"
            >
              {t('contactCta', { ns: 'home' })}
              <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
