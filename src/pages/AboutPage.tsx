import { Link } from 'react-router-dom';
import { about } from '../data/about';
import { TechCategories } from '../components';

export const AboutPage = (): React.JSX.Element => {
  const { name, role, summary, projects, education, github, linkedIn, cv, email, availability } =
    about;

  return (
    <main role="main" className="site-container py-12">
      <section className="grid gap-8 md:grid-cols-3 items-start">
        <aside className="md:col-span-1">
          <div className="p-4 rounded-lg bg-base-200">
            <img
              src="/profile.jpg"
              alt={`Foto de ${name}`}
              className="w-32 h-32 rounded-md object-cover mx-auto"
              width={128}
              height={128}
            />
            <h2 className="mt-4 text-center text-2xl font-semibold">{name}</h2>
            <p className="text-center text-sm text-muted">{role}</p>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                aria-label={`Descargar CV de ${name}`}
              >
                Descargar CV
              </a>

              <div className="flex justify-center gap-3 mt-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub de ${name}`}
                  className="btn btn-ghost btn-sm"
                >
                  GitHub
                </a>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${name}`}
                  className="btn btn-ghost btn-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted text-center">
              <div>{email}</div>
              <div className="mt-1">{availability}</div>
            </div>
          </div>

          <TechCategories categories={about.categories} />
        </aside>

        <div className="md:col-span-2 space-y-6">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-xl font-semibold mb-4">Acerca de mí</h1>
            <div className="rounded-lg bg-base-100 border border-base-200 p-4">
              <p>{summary}</p>
            </div>
          </article>

          <section>
            <h3 className="text-lg font-semibold">Proyectos destacados</h3>
            <ol className="mt-4 space-y-4 rounded-lg bg-base-100 border border-base-200 p-4">
              {projects.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}</strong> — {p.short}
                  <div className="text-sm mt-1">
                    <div className="text-purple-400">
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-gray-400"
                        aria-label={`Repositorio ${p.name}`}
                      >
                        Ver repo
                      </a>
                      {' · '}
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-gray-400"
                        aria-label={`Demo ${p.name}`}
                      >
                        Ver demo
                      </a>
                      {' · '}
                      <Link
                        to={`/projects/${p.id}`}
                        className="hover:underline hover:text-gray-400"
                      >
                        Case study
                      </Link>
                    </div>
                    <div className="mt-1 text-muted">
                      <em>Qué aprendí:</em> {p.whatILearned}
                    </div>
                    <div className="mt-2 text-xs flex flex-wrap gap-2 text-muted">
                      {p.tech.map((t) => (
                        <span key={t} className="px-2 py-1 rounded bg-base-200 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Educación</h3>
            <div className="mt-3 space-y-4 rounded-lg bg-base-100 border border-base-200 p-4">
              {education.map((e, idx) => (
                <div key={idx}>
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-sm text-muted">{e.period}</div>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Contacto</h3>
            <p className="text-sm text-muted mt-2 rounded-lg bg-base-100 border border-base-200 p-4">
              Podés escribirme a <a href={`mailto:${email}`}>{email}</a> o usar la página de{' '}
              <Link to="/contact">Contacto</Link>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
};
