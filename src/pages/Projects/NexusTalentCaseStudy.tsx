import { useTranslation } from 'react-i18next';

import { projects } from '../../data/projects';
import { CaseStudyTemplate } from './CaseStudyTemplate';

export const NexusTalentCaseStudy = (): React.JSX.Element => {
  const { t } = useTranslation('nexustalentcasestudy');
  const { t: tProjects } = useTranslation('projects');
  const project = projects.find((projectItem) => projectItem.id === 'nexus-talent');

  if (!project) {
    return (
      <main className="site-container py-12">
        <p>{t('notFound', { defaultValue: 'Project not found' })}</p>
      </main>
    );
  }

  const projectName = tProjects(project.nameKey);
  const projectShort = tProjects(project.shortKey);

  const stackSections = [
    { title: t('stack.sections.frontend'), items: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion'] },
    { title: t('stack.sections.state'), items: ['TanStack Query', 'Zod', 'Context API'] },
    { title: t('stack.sections.backend'), items: ['Supabase Auth', 'Supabase Postgres'] },
    { title: t('stack.sections.testing'), items: ['Vitest', 'React Testing Library', 'Vercel'] },
  ];

  const sections = [
    {
      kind: 'list' as const,
      heading: t('architecture.heading'),
      items: t('architecture.list', { returnObjects: true }) as string[],
      icon: 'architecture' as const,
      span: 'wide' as const,
    },
    {
      kind: 'list' as const,
      heading: t('accessibility.heading'),
      items: t('accessibility.list', { returnObjects: true }) as string[],
      icon: 'accessibility' as const,
    },
    {
      kind: 'list' as const,
      heading: t('performance.heading'),
      items: t('performance.list', { returnObjects: true }) as string[],
      icon: 'performance' as const,
    },
    {
      kind: 'list' as const,
      heading: t('challenges.heading'),
      items: t('challenges.list', { returnObjects: true }) as string[],
      icon: 'challenges' as const,
    },
    {
      kind: 'list' as const,
      heading: t('improvements.heading'),
      items: t('improvements.list', { returnObjects: true }) as string[],
      icon: 'improvements' as const,
    },
    {
      kind: 'code' as const,
      heading: t('implementation.heading'),
      title: t('implementation.hookTitle'),
      code: t('implementation.hookCode'),
      description: t('implementation.hookDescription'),
    },
  ];

  return (
    <CaseStudyTemplate
      title={projectName}
      description={projectShort}
      pathname={`/projects/${project.id}`}
      repo={project.repo}
      demo={project.demo}
      repoLabel={`Repository ${projectName}`}
      demoLabel={`Demo ${projectName}`}
      backLabel="← Back to Projects"
      carouselAlt={t('carousel.alt', { name: projectName })}
      noPreview={t('noPreview', { defaultValue: 'No preview' })}
      yearLabel={t('labels.year')}
      year={project.year}
      featured={project.featured}
      featuredLabel={t('labels.featured')}
      stackHeading={t('stack.heading')}
      stackSections={stackSections}
      images={project.images ?? []}
      problemHeading={t('problem.heading')}
      problemText={t('problem.text')}
      solutionHeading={t('solution.heading')}
      solutionItems={t('solution.list', { returnObjects: true }) as string[]}
      deepDiveHeading={t('deepDive.heading')}
      sections={sections}
    />
  );
};