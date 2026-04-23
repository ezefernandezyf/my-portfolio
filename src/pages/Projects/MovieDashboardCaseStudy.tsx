import { useTranslation } from 'react-i18next';

import { projects } from '../../data/projects';
import { CaseStudyTemplate } from './CaseStudyTemplate';

export const MovieDashboardCaseStudy = (): React.JSX.Element => {
    const { t } = useTranslation('moviedashboardcasestudy');
    const { t: tProjects } = useTranslation('projects');
    const project = projects.find((projectItem) => projectItem.id === 'movie-dashboard');

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
        { title: t('stack.sections.frontend'), items: ['React', 'TypeScript', 'Vite'] },
        { title: t('stack.sections.styles'), items: ['Tailwind CSS'] },
        { title: t('stack.sections.data'), items: ['Supabase', 'React Query'] },
        { title: t('stack.sections.forms'), items: ['react-hook-form', 'Zod'] },
        { title: t('stack.sections.testing'), items: ['Vitest', 'React Testing Library'] },
        { title: t('stack.sections.vcs'), items: ['Git', 'GitHub'] },
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