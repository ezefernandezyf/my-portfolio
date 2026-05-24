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

const fadeInUp = (delay = 0): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${delay}s forwards`,
  opacity: 0,
});

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

export const AboutPage = (): React.JSX.Element => {
  const { t } = useTranslation('aboutpage');
  const { name, role, github, linkedIn, cv, email } = about;

  const translatedSkills = t('abilities.items', { returnObjects: true }) as unknown;
  const skillItems = Array.isArray(translatedSkills) && translatedSkills.length > 0
    ? (translatedSkills as string[])
    : about.abilities.flatMap((group) => group.items);

  return (
    <>
      <MetaTags title={t('meta.title')} description={t('summary')} pathname="/about" type="website" />
      <main
        role="main"
        className="pb-24 pt-24"
      >
        <div className="site-container space-y-32">
          <section
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end"
            style={fadeInUp()}
          >
            <div className="lg:col-span-8">
              <h1
                className="font-headline text-[2.75rem] font-medium leading-tight tracking-[-0.03em] text-on-surface sm:text-[3.25rem]"
                style={fadeInUp(0.08)}
              >
                {t('h1')}
              </h1>
              <p
                className="font-body mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-on-surface-variant"
                style={fadeInUp(0.16)}
              >
                {t('summary')}
              </p>
              <div className="mt-10 flex flex-wrap gap-4" style={fadeInUp(0.24)}>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-fixed"
                >
                  {t('hero.viewProjects')}
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-sm border border-outline-variant/20 px-6 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
                >
                  {t('hero.contact')}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-on-surface-variant">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-on-surface"
                  aria-label={t('hero.github')}
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{t('hero.github')}</span>
                </a>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-on-surface"
                  aria-label={t('hero.linkedIn')}
                >
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{t('hero.linkedIn')}</span>
                </a>
                <a
                  href={cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-on-surface"
                  aria-label={t('hero.downloadCV')}
                >
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{t('hero.downloadCV')}</span>
                </a>
              </div>
              <div className="mt-4 text-sm text-on-surface-variant">
                <div>{email}</div>
                <div className="mt-1">{t('availability')}</div>
              </div>
            </div>

            <div className="group lg:col-span-4 w-full max-w-95 lg:justify-self-end" style={fadeInUp(0.16)}>
              <img
                src="/profile.jpg"
                alt={t('hero.photoAlt', { name })}
                className="block w-full rounded-lg border border-outline-variant/20 object-cover opacity-100 transition-all duration-500"
                width={640}
                height={800}
              />
              <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                <span>{role}</span>
                <span>{name}</span>
              </div>
            </div>
          </section>

          <section
            className="bg-surface-container-low py-24 px-8 md:px-16 w-full border-t border-outline-variant/10"
            style={fadeInUp(0.24)}
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface">
                <CodeBracketIcon className="h-6 w-6 text-primary-fixed" aria-hidden="true" />
                {t('sections.stack')}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {stackCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.key}
                      className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors duration-200 group"
                    >
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-low text-primary-fixed">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mb-6 border-b border-outline-variant/20 pb-4 text-[1.125rem] font-medium text-on-surface">
                        {t(`stackCards.${card.key}`)}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {card.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-sm border border-outline-variant/30 px-3 py-1.5 text-[0.875rem] text-on-surface transition-colors group-hover:border-outline-variant/60"
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

          <section className="border-t border-outline-variant/10 bg-surface py-24 px-8 md:px-16 w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface">
                <SparklesIcon className="h-6 w-6 text-primary-fixed" aria-hidden="true" />
                {t('sections.softSkills')}
              </h2>
              <div className="bg-surface-container-lowest p-8 md:p-12 rounded-lg border border-outline-variant/20">
                <div className="flex flex-wrap gap-4">
                  {skillItems.map((item) => {
                    const Icon = skillIconMap[item] ?? SparklesIcon;

                    return (
                      <span
                        key={item}
                        className="flex items-center gap-2 rounded-full border border-outline-variant/30 px-4 py-2 text-[0.875rem] text-on-surface transition-colors hover:bg-surface-container-low"
                      >
                        <Icon className="h-4 w-4 text-primary-fixed" aria-hidden="true" />
                        <span>{item}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            className="border-t border-outline-variant/10 bg-surface-container-low py-24 px-8 md:px-16 w-full"
            style={fadeInUp(0.32)}
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <h2 className="flex items-center gap-3 text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface">
                <AcademicCapIcon className="h-6 w-6 text-primary-fixed" aria-hidden="true" />
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
                      className="flex h-full flex-col rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-8 transition-colors duration-200 hover:bg-surface-container-high"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <span
                          className={`rounded-sm border px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.05em] ${isActive ? 'border-primary-fixed/20 bg-primary-fixed/10 text-primary-fixed' : 'border-outline-variant/20 bg-surface-container-high text-on-surface-variant'}`}
                        >
                          {period}
                        </span>
                        <span
                          className={`h-3 w-3 rounded-full border-2 ${isActive ? 'border-primary-fixed bg-surface-container-lowest' : 'border-outline-variant bg-surface-container-lowest'}`}
                        />
                      </div>
                      <h3 className="mb-2 text-[1.125rem] font-medium text-on-surface">{title}</h3>
                      <p className="mt-auto text-[0.875rem] text-on-surface-variant">
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
      </main>
    </>
  );
};
