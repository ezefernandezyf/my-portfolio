import { Link } from 'react-router-dom';
import { ProjectCarousel } from '../components';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const HomePage = (): React.JSX.Element => {
  return (
    <main role="main" className="site-container pb-12 pt-4">
      <section
        aria-labelledby="home-hero-title"
        className="grid gap-8 md:gap-12 md:grid-cols-2 items-center"
      >
        <div>
          <p className="text-sm text-primary font-medium mb-2">Hola — soy</p>
          <h1 id="home-hero-title" className="text-4xl md:text-5xl font-extrabold leading-tight">
            Ezequiel Fernández
          </h1>
          <p className="mt-3 text-lg text-muted max-w-xl">
            Front-end Developer — me especializo en interfaces limpias y accesibles usando React,
            Vite y TypeScript. Construyo experiencias enfocadas en rendimiento y buenas prácticas.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/about" className="btn btn-primary" aria-label="Ir a Acerca">
              Acerca de mí
            </Link>

            <Link to="/projects" className="btn btn-outline" aria-label="Ver Proyectos">
              Proyectos
            </Link>

            <a
              href="/CV.pdf"
              className="btn btn-ghost"
              aria-label="Descargar CV"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar CV
            </a>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Stack destacado</h3>
            <ul className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Vite', 'Tailwind', 'Testing'].map((t) => (
                <li
                  key={t}
                  className="px-3 py-1 rounded-full bg-base-200 text-sm text-muted"
                  aria-hidden
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside aria-label="Preview destacado" className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-base-200">
            <img
              src="/profile.jpg"
              alt="Foto de Ezequiel Fernández"
              width={64}
              height={64}
              loading="lazy"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold">Ezequiel Fernández</p>
              <p className="text-sm text-muted">Front-end Developer</p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-base-200 bg-base-100 shadow-sm">
            <div className="relative">
              <ProjectCarousel
                images={[
                  '/projects/cinelab-1.jpg',
                  '/projects/cinelab-2.jpg',
                  '/projects/cinelab-3.jpg',
                  '/projects/cinelab-4.jpg',
                ]}
                interval={3500}
                autoPlay={true}
                alt="CineLab preview"
              />
            </div>

            <div className="p-4">
              <h4 className="font-semibold">CineLab</h4>
              <p className="text-sm text-muted mt-1">
                SPA de catálogo de películas — búsqueda, filtros y detalle de títulos. UI enfocada
                en rendimiento y UX.
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <Link
                  to="/projects#cinelab"
                  className="hover:text-primary"
                  aria-label="Ver case study CineLab"
                >
                  Ver case study
                </Link>

                <a
                  href="https://github.com/ezefernandezyf/cinelab-react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 not-first-of-type:text-muted hover:text-primary"
                  aria-label="Repositorio de CineLab en GitHub"
                >
                  Ver repo
                </a>
                <a
                  href="https://cinelab-movies.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-flex items-center gap-2 btn btn-outline"
                  aria-label="Abrir demo en producción de CineLab (se abre en nueva pestaña)"
                >
                  Ver demo
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
                </a>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                <span className="px-2 py-1 rounded bg-base-200">React</span>
                <span className="px-2 py-1 rounded bg-base-200">TypeScript</span>
                <span className="px-2 py-1 rounded bg-base-200">TMDB API</span>
                <span className="px-2 py-1 rounded bg-base-200">Vite</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-base-200 bg-base-100">
            <h5 className="font-semibold">Proyectos</h5>
            <p className="text-sm text-muted mt-2">
              Apps públicas con repositorios y case studies.
            </p>
            <Link to="/projects" className="mt-3 inline-block text-sm hover:text-primary">
              Ver todos
            </Link>
          </div>

          <div className="p-4 rounded-lg border border-base-200 bg-base-100">
            <h5 className="font-semibold">Contacto</h5>
            <p className="text-sm text-muted mt-2">
              ¿Querés trabajar juntos? Haceme llegar un mensaje.
            </p>
            <Link to="/contact" className="mt-3 inline-block text-sm hover:text-primary">
              Contactar
            </Link>
          </div>

          <div className="p-4 rounded-lg border border-base-200 bg-base-100">
            <h5 className="font-semibold">CV</h5>
            <p className="text-sm text-muted mt-2">Descargá mi CV en PDF.</p>
            <a
              href="/CV.pdf"
              className="mt-3 inline-block text-sm hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
