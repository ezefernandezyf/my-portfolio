import { useMemo, useState } from 'react';
import { MetaTags, ProjectCard } from '../components';
import { projects } from '../data/projects';

export const ProjectsPage = (): React.JSX.Element => {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        (p.tech ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesQuery;
    });
  }, [query]);

  return (
    <>
      <MetaTags
        title="Proyectos"
        description="Colección de proyectos públicos: repositorios, demos y case studies. Built with React, Vite & TypeScript."
        pathname="/projects"
        type="website"
      />
      <main className="site-container py-12">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Proyectos</h1>
          <p className="text-sm text-muted">
            Algunos proyectos públicos, con repositorios y demos.
          </p>
        </header>

        <div className="mb-6 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar proyectos..."
            className="input input-sm flex-1"
            aria-label="Buscar proyectos"
          />
        </div>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.slice(0, visibleCount).map((p) => (
            <ProjectCard key={p.id} {...p} image={p.images?.[0]} />
          ))}
        </section>

        {visibleCount < filtered.length && (
          <div className="mt-6 text-center">
            <button onClick={() => setVisibleCount((c) => c + 9)} className="btn btn-outline">
              Ver más
            </button>
          </div>
        )}
      </main>
    </>
  );
};
