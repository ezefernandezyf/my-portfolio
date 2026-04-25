import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import { MetaTags, ProjectCarousel } from '../../components';

type StackSection = {
  title: string;
  items: string[];
};

type ListSection = {
  kind: 'list';
  heading: string;
  items: string[] | string;
  icon: keyof typeof deepDiveIcons;
  span?: 'wide';
};

type CodeSection = {
  kind: 'code';
  heading: string;
  title: string;
  code: string;
  description: string;
};

type CaseStudySection = ListSection | CodeSection;

type CaseStudyTemplateProps = {
  title: string;
  description: string;
  pathname: string;
  repo?: string;
  demo?: string;
  repoLabel: string;
  demoLabel: string;
  backLabel: string;
  carouselAlt: string;
  noPreview: string;
  yearLabel: string;
  year?: number;
  featuredLabel?: string;
  featured?: boolean;
  stackHeading: string;
  stackSections: StackSection[];
  images: string[];
  problemHeading: string;
  problemText: string;
  solutionHeading: string;
  solutionItems: string[] | string;
  deepDiveHeading: string;
  sections: CaseStudySection[];
};

const deepDiveIcons = {
  architecture: Squares2X2Icon,
  accessibility: ShieldCheckIcon,
  performance: BoltIcon,
  challenges: WrenchScrewdriverIcon,
  improvements: SparklesIcon,
} as const;

const deepDiveHeadingClass = 'font-headline text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface';
const cardClass =
  'bg-surface-container-lowest p-8 rounded-sm border border-outline-variant/20 hover:bg-surface-container-high hover:border-outline-variant transition-all duration-200 group';

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

function normalizeItems(items: string[] | string): string[] {
  return Array.isArray(items) ? items : [items];
}

function renderSection(section: CaseStudySection, large = false) {
  const contentClass = large || ('span' in section && section.span === 'wide') ? 'lg:col-span-2' : '';

  if (section.kind === 'code') {
    return (
      <article key={section.heading} className={`${cardClass} ${contentClass}`}>
        <div className="mb-6 h-12 w-12 rounded-sm bg-surface-container-low flex items-center justify-center text-primary">
          <CodeBracketIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mb-3 font-headline text-[1.125rem] font-medium text-on-surface">{section.heading}</h3>
        <pre className="overflow-auto max-w-full text-[11px] sm:text-xs bg-surface-container-low p-3 rounded whitespace-pre-wrap wrap-break-word">
          {section.code}
        </pre>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-on-surface-variant max-w-[60ch] wrap-break-word">
          {section.description}
        </p>
      </article>
    );
  }

  return (
    <article key={section.heading} className={`${cardClass} ${contentClass}`}>
      <div className="mb-6 h-12 w-12 rounded-sm bg-surface-container-low flex items-center justify-center text-primary">
        {(() => {
          const Icon = deepDiveIcons[section.icon];
          return <Icon className="h-6 w-6" aria-hidden="true" />;
        })()}
      </div>
      <h3 className="mb-3 font-headline text-[1.125rem] font-medium text-on-surface">{section.heading}</h3>
      <ul className="space-y-4">
        {normalizeItems(section.items).map((item) => (
          <li key={item} className="flex items-start">
            <CheckIcon className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary-fixed" aria-hidden="true" />
            <span className="font-body text-[0.875rem] leading-relaxed text-on-surface-variant">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export const CaseStudyTemplate = ({
  title,
  description,
  pathname,
  repo,
  demo,
  repoLabel,
  demoLabel,
  backLabel,
  carouselAlt,
  noPreview,
  yearLabel,
  year,
  featuredLabel,
  featured,
  stackHeading,
  stackSections,
  images,
  problemHeading,
  problemText,
  solutionHeading,
  solutionItems,
  deepDiveHeading,
  sections,
}: CaseStudyTemplateProps): React.JSX.Element => {
  const deepDiveSections = sections.filter((section) => section.kind !== 'code');
  const codeSection = sections.find((section): section is CodeSection => section.kind === 'code');

  return (
    <>
      <MetaTags title={title} description={description} pathname={pathname} type="article" />

      <motion.main className="pb-0 pt-24" initial="hidden" animate="visible" variants={pageVariants}>
        <motion.section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24" variants={riseVariants}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <motion.div className="lg:col-span-8" variants={riseVariants}>
              <p className="font-label mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline">
                Case Study
              </p>
              <h1 className="font-headline text-[3rem] font-bold leading-tight tracking-[-0.02em] text-on-surface sm:text-[3.5rem]">
                {title}
              </h1>
              <p className="font-body mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-on-surface-variant">
                {description}
              </p>
              <motion.div className="mt-10 flex flex-wrap gap-4" variants={riseVariants}>
                {demo ? (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-primary transition-colors hover:bg-primary-fixed"
                    aria-label={demoLabel}
                  >
                    {demoLabel}
                  </a>
                ) : null}
                {repo ? (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-sm border border-outline-variant/20 px-6 py-3 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-surface transition-colors hover:bg-surface-container-high"
                    aria-label={repoLabel}
                  >
                    {repoLabel}
                  </a>
                ) : null}
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-surface-variant underline-offset-4 hover:underline"
                >
                  {backLabel}
                </Link>
              </motion.div>
            </motion.div>

            <motion.aside
              className="flex flex-col gap-6 lg:col-span-4 lg:border-l lg:border-outline-variant/20 lg:pl-12"
              data-testid="stack-aside"
              variants={riseVariants}
            >
              <div>
                <span className="mb-1 block font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline">
                  {yearLabel}
                </span>
                <span className="block font-body text-sm font-medium text-on-surface">{year ?? '—'}</span>
              </div>
              {featured && featuredLabel ? (
                <div>
                  <span className="mb-1 block font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline">
                    Featured
                  </span>
                  <span className="inline-flex items-center rounded-full border border-outline-variant/20 px-4 py-2 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-surface">
                    {featuredLabel}
                  </span>
                </div>
              ) : null}
              <div>
                <span className="mb-1 block font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-outline">
                  {stackHeading}
                </span>
                <div className="flex flex-wrap gap-2">
                  {stackSections.flatMap((section) => section.items).slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="border border-outline-variant/20 px-4 py-2 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-surface-variant"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.section>

        <motion.section className="max-w-6xl mx-auto mb-28 px-6 lg:px-12" variants={riseVariants}>
          <div className="relative w-full overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container-low shadow-[0_16px_32px_-16px_rgba(27,27,27,0.04)]">
            {images.length > 0 ? (
              <ProjectCarousel images={images} alt={carouselAlt} interval={5000} />
            ) : (
              <div className="flex aspect-video items-center justify-center text-on-surface-variant">
                {noPreview}
              </div>
            )}
          </div>
        </motion.section>

        <motion.section className="bg-surface-container-low py-32" variants={riseVariants}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
              <motion.div variants={riseVariants}>
                <h2 className="font-headline mb-6 flex items-center text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface">
                  <ExclamationTriangleIcon className="mr-3 h-6 w-6 text-primary-fixed" aria-hidden="true" />
                  {problemHeading}
                </h2>
                <p className="font-body max-w-[60ch] text-[0.875rem] leading-relaxed text-on-surface-variant">
                  {problemText}
                </p>
              </motion.div>

              <motion.div variants={riseVariants}>
                <h2 className="font-headline mb-6 flex items-center text-[1.75rem] font-medium tracking-[-0.01em] text-on-surface">
                  <SparklesIcon className="mr-3 h-6 w-6 text-primary-fixed" aria-hidden="true" />
                  {solutionHeading}
                </h2>
                <ul className="space-y-4">
                  {normalizeItems(solutionItems).map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckIcon className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary-fixed" aria-hidden="true" />
                      <span className="font-body text-[0.875rem] text-on-surface-variant">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section className="max-w-7xl mx-auto px-6 lg:px-12 py-32" variants={riseVariants}>
          <h2 className={`${deepDiveHeadingClass} mb-12`}>{deepDiveHeading}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deepDiveSections.map((section) => renderSection(section))}
          </div>
        </motion.section>

        <motion.section className="border-y border-outline-variant/20 bg-surface-container-low py-24" variants={riseVariants}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className={`${deepDiveHeadingClass} mb-10`}>The Engineering Stack</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {stackSections.flatMap((section) => section.items).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-outline-variant/20 px-4 py-2 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-on-surface transition-colors hover:bg-surface-container-high"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {codeSection ? (
          <motion.section className="max-w-3xl mx-auto px-6 lg:px-12 py-32 text-center" variants={riseVariants}>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-surface-container-low text-primary-fixed/20">
              <CodeBracketIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <blockquote className="mb-8 font-headline text-[1.75rem] font-medium leading-tight tracking-[-0.01em] text-on-surface">
              {codeSection.heading}
            </blockquote>
            <div className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-8 text-left">
              <h3 className="mb-3 font-headline text-[1.125rem] font-medium text-on-surface">
                {codeSection.title}
              </h3>
              <pre className="overflow-auto rounded bg-surface-container-low p-3 text-[11px] sm:text-xs whitespace-pre-wrap wrap-break-word">
                {codeSection.code}
              </pre>
              <p className="mt-4 font-body text-[0.875rem] leading-relaxed text-on-surface-variant">
                {codeSection.description}
              </p>
            </div>
          </motion.section>
        ) : null}
      </motion.main>
    </>
  );
};
