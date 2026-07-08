import { useEffect, useRef, useState } from 'react';
import { ArrowTopRightOnSquareIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projectRepository } from '../entities/project';
import { MetaTags } from '../shared/seo';
import { ProjectCard } from '../shared/ui/project-card';
import { CurrentlySection, type CurrentlyItem } from '../components/CurrentlySection';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const featuredProjects = projectRepository.getProjects().slice(0, 2);
const technicalStack = ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS 4', 'Vite'];

export const HomePage = (): React.JSX.Element => {
  const { t, i18n } = useTranslation(['home', 'projects']);
  const localize = useLocalizedPath();
  const cvPath = i18n.language?.startsWith('en') ? '/Ezequiel_Fernandez_CV_EN.pdf' : '/Ezequiel_Fernandez_CV.pdf';
  const projects = projectRepository.getProjects();
  const currentlyItems = t('currently.list', { returnObjects: true }) as CurrentlyItem[];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  );
  const [isPointerInHero, setIsPointerInHero] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (isTouchDevice || reducedMotion) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerEnter = () => {
    if (isTouchDevice || reducedMotion) return;
    setIsPointerInHero(true);
  };

  const handlePointerLeave = () => {
    setIsPointerInHero(false);
  };

  const projectCountLabel = String(projects.length).padStart(2, '0');

  const currentlyRef = useRef<HTMLDivElement>(null);
  const [currentlyVisible, setCurrentlyVisible] = useState(false);
  useEffect(() => {
    const el = currentlyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentlyVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const projectsRef = useRef<HTMLDivElement>(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const contactRef = useRef<HTMLDivElement>(null);
  const [contactVisible, setContactVisible] = useState(false);
  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MetaTags
        title={t('meta.title', { ns: 'home' })}
        description={t('meta.description', { ns: 'home' })}
        pathname="/"
        image="/og-image.png"
      />

      <div>
        <section
          className="relative min-h-[calc(100svh-4rem)] bg-bg-primary pb-12 pt-32"
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {!isTouchDevice && !reducedMotion && (
            <div
              className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 300px)`,
                opacity: isPointerInHero ? 1 : 0,
              }}
              aria-hidden="true"
            />
          )}

          <div className="site-container relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center">
            <div className="max-w-[65ch]">
              <p className="animate-fade-in-up mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-accent font-body">
                {t('hero.label', { ns: 'home' })}
              </p>

              <h1 className="animate-fade-in-up [animation-delay:75ms] text-6xl font-bold leading-[0.9] tracking-tighter text-text-primary md:text-8xl font-display">
                <span className="block">{t('hero.name', { ns: 'home' }).split(' ')[0]}</span>
                <span>{t('hero.name', { ns: 'home' }).split(' ').slice(1).join(' ')}</span>
              </h1>

              <h2 className="animate-fade-in-up [animation-delay:150ms] mt-8 max-w-3xl text-xl font-medium leading-relaxed text-text-secondary md:text-2xl font-body">
                {t('hero.summary', { ns: 'home' })}
              </h2>

              <div className="animate-fade-in-up [animation-delay:300ms] mt-12 flex flex-wrap items-center gap-6">
                <Link
                  aria-label={t('hero.cta.projects', { ns: 'home' })}
                  className="inline-flex h-14 items-center justify-center bg-accent px-8 text-sm font-bold uppercase tracking-widest text-bg-primary transition-all hover:bg-accent-hover focus-ring active:scale-95"
                  to={localize('/projects')}
                >
                  {t('hero.cta.projects', { ns: 'home' })}
                </Link>

                <Link
                  aria-label={t('hero.cta.about', { ns: 'home' })}
                  className="inline-flex h-14 items-center justify-center border border-border px-8 text-sm font-bold uppercase tracking-widest text-text-primary transition-all hover:border-border-hover focus-ring active:scale-95"
                  to={localize('/about')}
                >
                  {t('hero.cta.about', { ns: 'home' })}
                </Link>

                <a
                  aria-label={t('hero.cta.downloadCV', { ns: 'home' })}
                  className="inline-flex h-14 items-center gap-2 px-4 text-sm font-bold uppercase tracking-tight text-accent hover:underline underline-offset-8 focus-ring"
                  href={cvPath}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t('hero.cta.downloadCV', { ns: 'home' })}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
            </div>

            <div className="animate-fade-in-up [animation-delay:450ms] mt-24">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted font-body">
                {t('stackHeading', { ns: 'home' })}
              </p>

              <div className="flex flex-wrap gap-3">
                {technicalStack.map((stackItem) => (
                  <span
                    key={stackItem}
                    className="chip-outline chip"
                  >
                    {stackItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div ref={currentlyRef} className={currentlyVisible ? 'animate-fade-in-up' : 'opacity-0'}>
          <CurrentlySection items={currentlyItems} />
        </div>

        <section className="bg-surface py-24" id="projects">
          <div ref={projectsRef} className={projectsVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="site-container">
              <div className="mb-16 flex items-end justify-between border-b border-border pb-8">
                <h2 className="text-[1.75rem] font-bold tracking-tight text-text-primary md:text-[2.25rem] font-display">
                  {t('recentWorkHeading', { ns: 'home' })}
                </h2>
                <p className="text-sm font-medium text-text-muted">02 / {projectCountLabel}</p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={projectsVisible ? 'animate-fade-in-up' : 'opacity-0'}
                    style={reducedMotion ? undefined : { animationDelay: `${50 + index * 50}ms` }}
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
              <div className="mt-12 text-center">
                <Link
                  to={localize('/projects')}
                  className="btn-minimal btn-outline inline-flex items-center gap-2 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em]"
                >
                  {t('viewAllProjects', { ns: 'home' })}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container py-32 text-center" id="contact">
          <div ref={contactRef} className={contactVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="mx-auto max-w-2xl">
              <CommandLineIcon className="mx-auto mb-8 h-12 w-12 text-accent" aria-hidden />
              <h2 className="mb-6 text-[1.75rem] font-bold tracking-tight text-text-primary md:text-[2.25rem] font-display">
                {t('contactTitle', { ns: 'home' })}
              </h2>
              <p className="mb-12 text-xl font-medium text-text-secondary font-body">
                {t('contactText', { ns: 'home' })}
              </p>
              <Link
                className="inline-flex h-16 items-center gap-4 bg-accent px-12 text-sm font-bold uppercase tracking-[0.2em] text-bg-primary transition-transform active:scale-95 focus-ring"
                to={localize('/contact')}
              >
                {t('contactCta', { ns: 'home' })}
                <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
