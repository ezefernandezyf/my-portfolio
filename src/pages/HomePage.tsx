import { ArrowTopRightOnSquareIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projectRepository } from '../entities/project';
import { MetaTags } from '../shared/seo';
import { ProjectCard } from '../shared/ui/project-card';

const featuredProjects = projectRepository.getProjects().slice(0, 2);
const technicalStack = ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS 4', 'Vite'];

const fadeInUp = (delay = 0): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${delay}s forwards`,
  opacity: 0,
});

export const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation(['home', 'projects']);
  const projects = projectRepository.getProjects();

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
          <div className="max-w-[60ch]" style={fadeInUp()}>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-fixed font-label" style={fadeInUp(0.08)}>
              {t('hero.label', { ns: 'home' })}
            </p>

            <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl font-headline" style={fadeInUp(0.16)}>
              <span className="block">{t('hero.name', { ns: 'home' }).split(' ')[0]}</span>
              <span>{t('hero.name', { ns: 'home' }).split(' ').slice(1).join(' ')}</span>
            </h1>

            <h2 className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-on-surface-variant md:text-2xl" style={fadeInUp(0.24)}>
              {t('hero.summary', { ns: 'home' })}
            </h2>

            <div className="mt-12 flex flex-wrap items-center gap-6" style={fadeInUp(0.32)}>
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

          <div className="mt-24" style={fadeInUp(0.24)}>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-outline" style={fadeInUp(0.32)}>
              {t('stackHeading', { ns: 'home' })}
            </p>

            <div className="flex flex-wrap gap-3" style={fadeInUp(0.40)}>
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

        <section className="bg-surface-container-low py-24" id="projects" style={fadeInUp(0.32)}>
          <div className="site-container">
            <div className="mb-16 flex items-end justify-between border-b border-outline-variant/20 pb-8">
              <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
                {t('recentWorkHeading', { ns: 'home' })}
              </h2>
              <p className="text-sm font-medium text-outline">02 / {projectCountLabel}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <div key={project.id}>
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
            <div className="mt-12 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-outline-variant/30 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant transition-all hover:border-outline-variant hover:text-on-surface focus-ring"
              >
                {t('viewAllProjects', { ns: 'home' })}
              </Link>
            </div>
          </div>
        </section>

        <section className="site-container py-32 text-center" id="contact" style={fadeInUp(0.40)}>
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
