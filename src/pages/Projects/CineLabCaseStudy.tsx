import { Link } from 'react-router-dom';
import { ProjectCarousel } from '../../components';
import { projects } from '../../data/projects';

export const CineLabCaseStudy = (): React.JSX.Element => {
  const project = projects.find((p) => p.id === 'cinelab');

  if (!project) {
    return (
      <main className="site-container py-12">
        <p>Project not found</p>
      </main>
    );
  }
  const stackSections = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
    { title: 'Estilos', items: ['Tailwind CSS'] },
    { title: 'Data & APIs', items: ['TMDB API', 'Axios'] },
    {
      title: 'Estado',
      items: ['Context API', 'Custom hooks (useApi, useFavorites, useLocalStorage)'],
    },
    { title: 'Testing', items: ['Vitest', 'React Testing Library'] },
    { title: 'Control de versiones', items: ['Git', 'GitHub'] },
  ];

  return (
    <main className="site-container py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-sm text-muted max-w-3xl">{project.short}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label={`Repositorio ${project.name}`}
            >
              Ver repo
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label={`Demo ${project.name}`}
            >
              Ver demo
            </a>
          )}
          <Link to="/projects" className="ml-2 text-sm hover:underline">
            ← Volver a Proyectos
          </Link>
        </div>
      </header>

      <section className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg overflow-hidden border bg-base-100">
          {project.images && project.images.length > 0 ? (
            <ProjectCarousel
              images={project.images}
              alt={`${project.name} preview`}
              interval={5000}
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center text-muted">
              No preview
            </div>
          )}

          <div className="p-4 prose max-w-none">
            <h2 className="text-xl font-semibold">Resumen</h2>
            <p>{project.short}</p>
          </div>
        </div>

        <aside
          className="rounded-lg p-4 border bg-base-100"
          aria-labelledby="stack-heading"
          data-testid="stack-aside"
        >
          <h3 id="stack-heading" className="font-semibold mb-2">
            Stack & Tecnologías
          </h3>

          <div className="space-y-3">
            {stackSections.map((sec) => (
              <div key={sec.title}>
                <h4 className="text-sm font-medium text-muted mb-1">{sec.title}</h4>
                <ul className="flex flex-wrap gap-2" role="list">
                  {sec.items.map((it) => (
                    <li key={it}>
                      <span className="px-2 py-1 rounded bg-base-200 text-xs">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted">
            <div>
              <strong>Año:</strong> {project.year ?? '—'}
            </div>
            {project.featured && (
              <div className="mt-2">
                <span className="badge">Featured</span>
              </div>
            )}
          </div>
        </aside>
      </section>

      <section className="space-y-8">
        <article>
          <h2 className="text-2xl font-semibold mb-3">¿Qué es CineLab?</h2>
          <p className="text-sm text-muted">
            CineLab es una aplicación diseñada para los amantes del cine. Permite buscar películas,
            acceder a detalles (calificaciones, sinopsis), obtener recomendaciones y gestionar
            favoritos de forma persistente. El proyecto fue un reto técnico y creativo, enfocado en
            rendimiento, accesibilidad y experiencia de usuario.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Problema que resuelve</h3>
          <p className="text-sm text-muted">
            Muchas apps de búsqueda de películas presentan interfaces lentas o sin persistencia de
            favoritos. El objetivo fue construir una SPA rápida, accesible y con manejo robusto de
            estado, enfocada en buenas prácticas de arquitectura frontend.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Tecnologías y herramientas</h3>
          <p className="text-sm text-muted mb-2">
            Stack elegido por velocidad y buenas prácticas: React + Vite, TypeScript, Tailwind CSS.
            Para integraciones: TMDB API mediante Axios con interceptors y manejo de aborts.
          </p>

          <ul className="list-disc list-inside text-sm text-muted">
            <li>React con Vite (HMR y build rápido).</li>
            <li>TypeScript para tipado y mantenibilidad.</li>
            <li>Tailwind CSS para estilos utilitarios y consistencia visual.</li>
            <li>Axios + AbortController para fetching robusto.</li>
            <li>Context API + custom hooks (useApi, useLocalStorage, useFavorites).</li>
          </ul>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Arquitectura y decisiones</h3>
          <p className="text-sm text-muted">
            Se priorizó modularidad y separación de responsabilidades: servicios de API
            desacoplados, hooks para lógica de fetching y utilidades para persistencia. El estado
            global de favoritos se maneja con Context + reducer, evitando prop-drilling.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Implementación destacada</h3>

          <div className="bg-base-100 border rounded-lg p-4">
            <h4 className="font-medium">Hook useApi (simplificado)</h4>
            <pre className="overflow-auto text-xs bg-base-200 p-3 rounded">
              {`export const useApi = (url: string) => {
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
};`}
            </pre>
            <p className="text-sm text-muted">
              Este hook abstrae la lógica de fetching, cancelación y manejo de loading, evitando
              duplicación y mejorando testabilidad.
            </p>
          </div>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Accesibilidad</h3>
          <p className="text-sm text-muted">
            Se aplicaron roles y atributos ARIA en componentes interactivos (modales/dialogs,
            botones). La app es navegable por teclado y aplica pautas de contraste.
          </p>
          <ul className="list-disc list-inside text-sm text-muted">
            <li>
              <strong>Navegación 100% keyboard:</strong> todos los controles son accesibles con
              teclado.
            </li>
            <li>
              <strong>Focus visible:</strong> estilos claros para foco en elementos interactivos.
            </li>
            <li>
              <strong>aria-label en botones sin texto:</strong> icon-buttons como favoritos o
              acciones tienen aria-label descriptivo.
            </li>
            <li>
              <strong>aria-live:</strong> se utilizan regiones aria-live para notificar resultados
              dinámicos (por ejemplo, cambios de slide en el carousel o notificaciones de
              favoritos).
            </li>
          </ul>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Performance y resultados</h3>
          <ul className="list-disc list-inside text-sm text-muted">
            <li>Lazy-loading de imágenes y previews optimizadas.</li>
            <li>Skeleton loaders para listas asíncronas.</li>
            <li>
              Lighthouse: performance y accesibilidad 90+ (mejoras pendientes: SSR, caching más
              agresivo).
            </li>
          </ul>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Retos y aprendizajes</h3>
          <ol className="list-decimal list-inside text-sm text-muted">
            <li>Manejo de fetching con cancelación para evitar race conditions y memory leaks.</li>
            <li>Sincronización de favoritos con localStorage y su testing.</li>
            <li>
              Modularidad: hooks reutilizables y servicios desacoplados facilitaron refactors.
            </li>
          </ol>
        </article>

        <article>
          <h3 className="text-xl font-semibold mb-2">Qué mejoraría</h3>
          <ul className="list-disc list-inside text-sm text-muted">
            <li>Scroll infinito en listados en lugar de paginación manual.</li>
            <li>Soporte i18n completo.</li>
            <li>Considerar SSR con Next.js para SEO y performance inicial.</li>
            <li>Explorar React Query para caching y sincronización automáticos.</li>
          </ul>
        </article>
      </section>
    </main>
  );
};
