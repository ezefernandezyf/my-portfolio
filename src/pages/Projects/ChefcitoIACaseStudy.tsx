import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { MetaTags, ProjectCarousel } from '../../components';
import { projects } from '../../data/projects';

export const ChefcitoIACaseStudy = (): React.JSX.Element => {
  const { t } = useTranslation('chefcitoiacasestudy');
  const { t: tProjects } = useTranslation('projects');
  const project = projects.find((item) => item.id === 'chefcitoia');

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
    { title: t('stack.sections.frontend'), items: ['React 19', 'TypeScript', 'Vite 5'] },
    { title: t('stack.sections.styles'), items: ['Tailwind CSS 4'] },
    { title: t('stack.sections.data'), items: ['Fetch + AbortController', '/api/recipe-generator/*', 'recipeMapper'] },
    { title: t('stack.sections.forms'), items: ['Zod', 'react-hook-form'] },
    { title: t('stack.sections.testing'), items: ['Vitest', 'Testing Library'] },
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

      <main className="site-container pb-10 pt-6 sm:pb-12 sm:pt-8 overflow-x-hidden">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight wrap-break-word">{projectName}</h1>
          <p className="text-sm text-muted max-w-3xl leading-6 wrap-break-word">{projectShort}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-minimal w-full sm:w-auto justify-center whitespace-normal wrap-break-word text-center"
                aria-label={t('chefcitoiacasestudy:header.repoAria', { name: projectName })}
              >
                {t('chefcitoiacasestudy:header.repoAria', { name: projectName })}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-minimal w-full sm:w-auto justify-center whitespace-normal wrap-break-word text-center"
                aria-label={t('chefcitoiacasestudy:header.demoAria', { name: projectName })}
              >
                {t('chefcitoiacasestudy:header.demoAria', { name: projectName })}
              </a>
            )}
            <Link to="/projects" className="text-sm hover:underline underline-offset-4">
              {t('chefcitoiacasestudy:header.backToProjects')}
            </Link>
          </div>
        </header>

        <section className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-lg overflow-hidden border bg-base-100 min-w-0">
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

            <div className="p-3 sm:p-4 max-w-none">
              <h2 className="text-lg sm:text-xl font-semibold wrap-break-word">{t('summary.heading')}</h2>
              <p className="text-sm text-muted leading-6 wrap-break-word">{t('summary.text')}</p>
            </div>
          </div>

          <aside
            className="rounded-lg p-3 sm:p-4 border bg-base-100 min-w-0"
            aria-labelledby="stack-heading"
            data-testid="stack-aside"
          >
            <h3 id="stack-heading" className="font-semibold mb-2">
              {t('stack.heading')}
            </h3>

            <div className="space-y-3">
              {stackSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-medium text-muted mb-1">{section.title}</h4>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {section.items.map((item) => (
                      <li key={item}>
                        <span className="chip chip-outline">{item}</span>
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

        <section className="space-y-6 sm:space-y-8">
          <article>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 wrap-break-word">{t('summary.heading')}</h2>
            <p className="text-sm text-muted leading-6 wrap-break-word">{t('summary.text')}</p>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('problem.heading')}</h3>
            <p className="text-sm text-muted leading-6 wrap-break-word">{t('problem.text')}</p>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('techTools.heading')}</h3>
            <p className="text-sm text-muted mb-2 leading-6 wrap-break-word">{t('techTools.text')}</p>
            <ul className="list-disc list-inside text-sm text-muted">
              {(t('techTools.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('architecture.heading')}</h3>
            <p className="text-sm text-muted leading-6 wrap-break-word">{t('architecture.text')}</p>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('implementation.heading')}</h3>

            <div className="bg-base-100 border rounded-lg p-3 sm:p-4">
              <h4 className="font-medium">{t('implementation.hookTitle')}</h4>
              <pre className="overflow-auto max-w-full text-[11px] sm:text-xs bg-base-200 p-2 sm:p-3 rounded whitespace-pre-wrap wrap-break-word">
                {t('implementation.hookCode')}
              </pre>
              <p className="text-sm text-muted leading-6 wrap-break-word">{t('implementation.hookDescription')}</p>
            </div>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('accessibility.heading')}</h3>
            <p className="text-sm text-muted leading-6 wrap-break-word">{t('accessibility.lead')}</p>
            <ul className="list-disc list-inside text-sm text-muted">
              {(t('accessibility.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('performance.heading')}</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              {(t('performance.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('challenges.heading')}</h3>
            <ol className="list-decimal list-inside text-sm text-muted">
              {(t('challenges.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 wrap-break-word">{t('improvements.heading')}</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              {(t('improvements.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </>
  );
};