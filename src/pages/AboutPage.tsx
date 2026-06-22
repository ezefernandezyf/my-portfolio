import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  ServerStackIcon,
  BoltIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  Squares2X2Icon,
  SwatchIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

import { about } from '../data/about';
import { GithubIcon, LinkedInIcon } from '../components';
import { MetaTags } from '../shared/seo';
import { useTranslation } from 'react-i18next';

const stackCards = [
  {
    key: 'frontend',
    icon: CodeBracketIcon,
    items: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'Vite', 'TanStack Query', 'React Router', 'HTML5'],
  },
  {
    key: 'styles',
    icon: SwatchIcon,
    items: ['Tailwind CSS 4', 'CSS', 'Responsive UI', 'Accessibility'],
  },
  {
    key: 'backend',
    icon: ServerStackIcon,
    items: ['Node.js', 'Express', 'REST APIs', 'Prisma ORM', 'PostgreSQL', 'JWT'],
  },
  {
    key: 'testing',
    icon: BeakerIcon,
    items: ['Vitest', 'React Testing Library', 'Playwright', 'React Hook Form', 'Zod', 'Zustand', 'ESLint', 'Prettier'],
  },
] as const;

const skillIconMap: Record<string, typeof ChatBubbleLeftRightIcon> = {
  'Comunicación clara': ChatBubbleLeftRightIcon,
  'Clear communication': ChatBubbleLeftRightIcon,
  'Resolución de problemas': PuzzlePieceIcon,
  'Problem solving': PuzzlePieceIcon,
  'Pensamiento analítico': ChartBarIcon,
  'Analytical thinking': ChartBarIcon,
  'Arquitectura modular': Squares2X2Icon,
  'Modular architecture': Squares2X2Icon,
  'Trabajo en equipo': UserGroupIcon,
  Teamwork: UserGroupIcon,
  'Scrum / Kanban': AdjustmentsHorizontalIcon,
  'Aprendizaje continuo': AcademicCapIcon,
  'Continuous learning': AcademicCapIcon,
  Autonomía: BoltIcon,
  Autonomy: BoltIcon,
};

const educationCards = about.education;

function useSectionFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

export const AboutPage = (): React.JSX.Element => {
  const { t } = useTranslation('aboutpage');
  const { name, role, github, linkedIn, cv } = about;

  const translatedSkills = t('abilities.items', { returnObjects: true }) as unknown;
  const skillItems = Array.isArray(translatedSkills) && translatedSkills.length > 0
    ? (translatedSkills as string[])
    : about.abilities.flatMap((group) => group.items);

  const [heroRef, heroVisible] = useSectionFadeIn();
  const [stackRef, stackVisible] = useSectionFadeIn();
  const [softSkillsRef, softSkillsVisible] = useSectionFadeIn();
  const [educationRef, educationVisible] = useSectionFadeIn();

  return (
    <>
      <MetaTags title={t('meta.title')} description={t('summary')} pathname="/about" type="website" />
      <main role="main" className="pb-24 pt-24 bg-bg-primary">
        <div className="site-container space-y-32">
          <div ref={heroRef} className={heroVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4 lg:row-span-2">
                <div className="w-full max-w-sm lg:max-w-full">
                  <img
                    src="/profile.jpg"
                    alt={t('hero.photoAlt', { name })}
                    className="block w-full rounded-lg border border-border object-cover"
                    width={640}
                    height={800}
                  />
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-text-muted font-body">
                    <span>{role}</span>
                    <span className="font-display text-sm text-text-primary">{name}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 section-left">
                <h1 className="text-[2.75rem] font-medium leading-tight tracking-[-0.03em] text-text-primary sm:text-[3.25rem] font-display">
                  {t('h1')}
                </h1>

                <p className="mt-6 max-w-[65ch] text-[1.125rem] leading-relaxed text-text-secondary font-body">
                  {t('summary')}
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover focus-ring"
                  >
                    {t('hero.viewProjects')}
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center border border-border px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-border-hover focus-ring"
                  >
                    {t('hero.contact')}
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-text-secondary font-body">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                    aria-label={t('hero.github')}
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{t('hero.github')}</span>
                  </a>
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                    aria-label={t('hero.linkedIn')}
                  >
                    <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{t('hero.linkedIn')}</span>
                  </a>
                  <a
                    href={cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                    aria-label={t('hero.downloadCV')}
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{t('hero.downloadCV')}</span>
                  </a>
                </div>

                <div className="mt-4 text-sm text-text-muted font-body">
                  {t('availability')}
                </div>
              </div>
            </section>
          </div>

          <div ref={stackRef} className={stackVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <section className="bg-surface py-24 px-8 md:px-16 w-full border-t border-border">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-text-primary font-display">
                  <CodeBracketIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                  {t('sections.stack')}
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {stackCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <article
                        key={card.key}
                        className="card-minimal p-8 hover:border-accent/50 transition-colors duration-200"
                      >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-accent">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="mb-6 border-b border-border pb-4 text-[1.125rem] font-medium text-text-primary font-display">
                          {t(`stackCards.${card.key}`)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {card.items.map((item) => (
                            <span
                              key={item}
                              className="chip chip-outline"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <div ref={softSkillsRef} className={softSkillsVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <section className="border-t border-border bg-surface py-24 px-8 md:px-16 w-full">
              <div className="max-w-7xl mx-auto section-left flex flex-col gap-12">
                <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-text-primary font-display">
                  <SparklesIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                  {t('sections.softSkills')}
                </h2>
                <div className="card-minimal p-8 md:p-12">
                  <div className="flex flex-wrap gap-4">
                    {skillItems.map((item) => {
                      const Icon = skillIconMap[item] ?? SparklesIcon;

                      return (
                        <span
                          key={item}
                          className="chip chip-outline"
                        >
                          <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                          <span>{item}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div ref={educationRef} className={educationVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <section className="border-t border-border bg-bg-primary py-24 px-8 md:px-16 w-full">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-text-primary font-display">
                  <AcademicCapIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                  {t('sections.education')}
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {educationCards.map((item, index) => {
                    const isActive = index < 2;
                    const title = t(`education.${index}.title`);
                    const period = t(item.periodKey);

                    return (
                      <article
                        key={item.titleKey}
                        className="card-minimal p-8 flex h-full flex-col transition-colors duration-200 hover:border-accent/50"
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <span
                            className={`chip ${isActive ? 'chip-primary' : 'chip-outline'}`}
                          >
                            {period}
                          </span>
                          <span
                            className={`h-3 w-3 rounded-full border-2 ${isActive ? 'border-accent bg-bg-primary' : 'border-border bg-bg-primary'}`}
                          />
                        </div>
                        <h3 className="mb-2 text-[1.125rem] font-medium text-text-primary font-display">{title}</h3>
                        <p className="mt-auto text-[0.875rem] text-text-secondary font-body">
                          {index === 0
                            ? 'Formación integral en desarrollo de software, arquitectura de sistemas y metodologías de trabajo para construir productos consistentes.'
                            : index === 1
                              ? 'Certificación enfocada en seguridad, control de acceso y prácticas de hardening aplicadas a productos web modernos.'
                              : 'Formación intensiva en modelos generativos, flujo de entrega y criterios para llevar experimentos de IA a producción.'}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
