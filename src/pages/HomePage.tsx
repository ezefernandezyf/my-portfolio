import { Link } from 'react-router-dom';

export const HomePage = (): React.JSX.Element => {
  return (
    <section aria-labelledby="home-title" className="prose max-w-none">
      <h1 id="home-title" className="text-3xl font-bold">
        Hola, soy Ezequiel 👋
      </h1>
      <p className="text-lg">
        Bienvenido a mi portfolio. Soy desarrollador front-end. Este es un placeholder
        para la página principal.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/about" className="btn btn-primary" aria-label="Ir a Acerca">
          Acerca
        </Link>
        <Link to="/projects" className="btn btn-outline" aria-label="Ir a Proyectos">
          Proyectos
        </Link>
        <Link to="/contact" className="btn btn-ghost" aria-label="Ir a Contacto">
          Contacto
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-sm text-muted">
          Placeholder: aquí añadiré una breve introducción, skills y proyectos destacados.
        </p>
      </div>
    </section>
  );
};
