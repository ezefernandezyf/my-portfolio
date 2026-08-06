import { useTranslation } from 'react-i18next';

import { projectRepository } from '../../../entities/project';
import { ROUTE_META } from '../../../data/route-meta';
import { CaseStudyTemplate } from '../../../pages/Projects/CaseStudyTemplate';
import { buildCaseStudyContent } from '../lib/buildCaseStudyContent';

type ProjectCaseStudyPageProps = {
  projectId: string;
  namespace: string;
};

export const ProjectCaseStudyPage = ({ projectId, namespace }: ProjectCaseStudyPageProps): React.JSX.Element => {
  const { t, i18n } = useTranslation(namespace);
  const { t: tProjects } = useTranslation('projects');
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const project = projectRepository.getProjectById(projectId);

  if (!project) {
    return (
      <main className="site-container py-12">
        <p>{t('notFound', { defaultValue: 'Project not found' })}</p>
      </main>
    );
  }

  const content = buildCaseStudyContent(projectId, t);

  if (!content) {
    return (
      <main className="site-container py-12">
        <p>{t('notFound', { defaultValue: 'Project not found' })}</p>
      </main>
    );
  }

  const projectName = tProjects(project.nameKey);
  const projectShort = tProjects(project.shortKey);
  const routeMeta = ROUTE_META[`projects/${projectId}`]?.[lang];

  return (
    <CaseStudyTemplate
      title={projectName}
      description={projectShort}
      metaTitle={routeMeta?.title}
      metaDescription={routeMeta?.description}
      pathname={`/projects/${project.id}`}
      repo={project.repo}
      demo={project.demo}
      repoLabel={String(t('header.repoAria', { defaultValue: `Repository ${projectName}` }))}
      demoLabel={String(t('header.demoAria', { defaultValue: `Demo ${projectName}` }))}
      backLabel={String(t('header.backToProjects', { defaultValue: '← Back to Projects' }))}
      carouselAlt={String(t('carousel.alt', { name: projectName }))}
      noPreview={String(t('noPreview', { defaultValue: 'No preview' }))}
      yearLabel={String(t('labels.year'))}
      year={project.year}
      featured={project.featured}
      featuredLabel={String(t('labels.featured'))}
      stackHeading={String(t('stack.heading'))}
      stackSections={content.stackSections}
      images={project.images ?? []}
      problemHeading={String(t('problem.heading'))}
      problemText={String(t('problem.text'))}
      solutionHeading={String(t('solution.heading'))}
      solutionItems={t('solution.list', { returnObjects: true }) as string[]}
      deepDiveHeading={String(t('deepDive.heading'))}
      sections={content.sections}
    />
  );
};