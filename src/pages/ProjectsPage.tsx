import { Link } from 'react-router-dom';

export const ProjectsPage = (): React.JSX.Element => {
  return (
    <section id="projects" aria-labelledby="projects-title" className="prose max-w-none">
      <h1 id="projects-title" className="text-2xl font-semibold">
        Proyectos
      </h1>

      <p>
        Este es un placeholder para la página de Proyectos. Aquí listaré mis proyectos, con
        descripciones, enlaces al código fuente y capturas o demos en vivo.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/home" className="btn btn-primary" aria-label="Ir al inicio">
          Inicio
        </Link>
        <Link to="/about" className="btn btn-outline" aria-label="Ir a Acerca">
          Acerca de mí
        </Link>
        <Link to="/contact" className="btn btn-ghost" aria-label="Ir a Contacto">
          Contacto
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-sm text-muted">
          Placeholder: aquí añadiré tarjetas de proyectos, filtros por tecnología y enlaces a
          repositorios.
        </p>
      </div>
    </section>
  );
};
