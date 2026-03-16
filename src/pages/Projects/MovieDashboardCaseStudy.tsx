import { Link } from 'react-router-dom';
import { MetaTags, ProjectCarousel } from '../../components';
import { projects } from '../../data/projects';
import { useTranslation } from 'react-i18next';

export const MovieDashboardCaseStudy = (): React.JSX.Element => {
    const { t } = useTranslation('moviedashboardcasestudy');
    const { t: tProjects } = useTranslation('projects');
    const project = projects.find((p) => p.id === 'movie-dashboard');

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

    return (
        <>
            <MetaTags
                title={projectName}
                description={projectShort}
                pathname={`/projects/${project.id}`}
                type="article"
            />
            <main className="site-container pb-12 pt-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{projectName}</h1>
                    <p className="text-sm text-muted max-w-3xl">{projectShort}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        {project.repo && (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-minimal"
                                aria-label={t('header.repoAria', { name: projectName })}
                            >
                                {t('header.repoAria', { name: projectName })}
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-minimal"
                                aria-label={t('header.demoAria', { name: projectName })}
                            >
                                {t('header.demoAria', { name: projectName })}
                            </a>
                        )}
                        <Link to="/projects" className="ml-2 text-sm hover:underline">
                            {t('header.backToProjects')}
                        </Link>
                    </div>
                </header>

                <section className="mb-8 grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 rounded-lg overflow-hidden border bg-base-100">
                        {project.images && project.images.length > 0 ? (
                            <ProjectCarousel
                                images={project.images}
                                alt={t('carousel.alt', { name: projectName })}
                                interval={5000}
                            />
                        ) : (
                            <div className="w-full aspect-video flex items-center justify-center text-muted">
                                {t('noPreview', { defaultValue: 'No preview' })}
                            </div>
                        )}

                        <div className="p-4 prose max-w-none">
                            <h2 className="text-xl font-semibold">{t('summary.heading')}</h2>
                            <p className="text-sm text-muted">{t('summary.text')}</p>
                        </div>
                    </div>

                    <aside className="rounded-lg p-4 border bg-base-100" aria-labelledby="stack-heading">
                        <h3 id="stack-heading" className="font-semibold mb-2">
                            {t('stack.heading')}
                        </h3>
                        <div className="space-y-3">
                            {stackSections.map((sec) => (
                                <div key={sec.title}>
                                    <h4 className="text-sm font-medium text-muted mb-1">{sec.title}</h4>
                                    <ul className="flex flex-wrap gap-2" role="list">
                                        {sec.items.map((it) => (
                                            <li key={it}>
                                                <span className="chip chip-outline">{it}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm text-muted">
                            <div>
                                <strong>{t('labels.year')}</strong> {project.year ?? '—'}
                            </div>
                            {project.featured && (
                                <div className="mt-2">
                                    <span className="badge badge-minimal badge-primary">{t('labels.featured')}</span>
                                </div>
                            )}
                        </div>
                    </aside>
                </section>

                <section className="space-y-8">
                    <article>
                        <h2 className="text-2xl font-semibold mb-3">{t('summary.heading')}</h2>
                        <p className="text-sm text-muted">{t('summary.text')}</p>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('problem.heading')}</h3>
                        <p className="text-sm text-muted">{t('problem.text')}</p>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('techTools.heading')}</h3>
                        <p className="text-sm text-muted mb-2">{t('techTools.text')}</p>
                        <ul className="list-disc list-inside text-sm text-muted">
                            {(t('techTools.list', { returnObjects: true }) as string[]).map((li, idx) => (
                                <li key={idx}>{li}</li>
                            ))}
                        </ul>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('architecture.heading')}</h3>
                        <p className="text-sm text-muted">{t('architecture.text')}</p>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('implementation.heading')}</h3>
                        <div className="bg-base-100 border rounded-lg p-4">
                            <h4 className="font-medium">{t('implementation.hookTitle')}</h4>
                            <pre className="overflow-auto text-xs bg-base-200 p-3 rounded">
                                {t('implementation.hookCode')}
                            </pre>
                            <p className="text-sm text-muted">{t('implementation.hookDescription')}</p>
                        </div>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('accessibility.heading')}</h3>
                        <p className="text-sm text-muted">{t('accessibility.lead')}</p>
                        <ul className="list-disc list-inside text-sm text-muted">
                            {(t('accessibility.list', { returnObjects: true }) as string[]).map((li, idx) => (
                                <li key={idx}>{li}</li>
                            ))}
                        </ul>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('performance.heading')}</h3>
                        <ul className="list-disc list-inside text-sm text-muted">
                            {(t('performance.list', { returnObjects: true }) as string[]).map((li, idx) => (
                                <li key={idx}>{li}</li>
                            ))}
                        </ul>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('challenges.heading')}</h3>
                        <ol className="list-decimal list-inside text-sm text-muted">
                            {(t('challenges.list', { returnObjects: true }) as string[]).map((li, idx) => (
                                <li key={idx}>{li}</li>
                            ))}
                        </ol>
                    </article>
                    <article>
                        <h3 className="text-xl font-semibold mb-2">{t('improvements.heading')}</h3>
                        <ul className="list-disc list-inside text-sm text-muted">
                            {(t('improvements.list', { returnObjects: true }) as string[]).map((li, idx) => (
                                <li key={idx}>{li}</li>
                            ))}
                        </ul>
                    </article>
                </section>
            </main>
        </>
    );
};