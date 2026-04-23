import { useTranslation } from 'react-i18next';

import { projects } from '../../data/projects';
import { CaseStudyTemplate } from './CaseStudyTemplate';

export const CineLabCaseStudy = (): React.JSX.Element => {
  const { t } = useTranslation('cinelabcasestudy');
  const { t: tProjects } = useTranslation('projects');
  const project = projects.find((projectItem) => projectItem.id === 'cinelab');

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
    { title: t('stack.sections.frontend', { defaultValue: 'Frontend' }), items: ['React', 'TypeScript', 'Vite'] },
    { title: t('stack.sections.styles', { defaultValue: 'Estilos' }), items: ['Tailwind CSS'] },
    { title: t('stack.sections.data', { defaultValue: 'Data & APIs' }), items: ['TMDB API', 'Axios'] },
    {
      title: t('stack.sections.state', { defaultValue: 'Estado' }),
      items: ['Context API', 'Custom hooks (useApi, useFavorites, useLocalStorage)'],
    },
    { title: t('stack.sections.testing', { defaultValue: 'Testing' }), items: ['Vitest', 'React Testing Library'] },
    { title: t('stack.sections.vcs', { defaultValue: 'Control de versiones' }), items: ['Git', 'GitHub'] },
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
      code: `export const useApi = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    axios.get(url, { signal: controller.signal })
      .then(res => setData(res.data))
      .catch(err => { if (!axios.isCancel(err)) console.error(err); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading };
};`,
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