import { Link } from 'react-router-dom';

export const NotFoundPage = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <section
      aria-labelledby="notfound-title"
      className="site-container py-16 flex flex-col items-center text-center"
      role="main"
    >
      <div className="max-w-xl">
        <div className="mx-auto mb-6 w-32 h-32 flex items-center justify-center rounded-full bg-base-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 id="notfound-title" className="text-3xl font-bold mb-3">
          Página no encontrada
        </h1>

        <p className="text-base text-muted mb-6">
          Lo sentimos — no encontramos la página que buscas. Es posible que la URL esté mal escrita
          o que esa sección ya no exista.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/home" className="btn btn-primary" aria-label="Volver al inicio">
            Volver al inicio
          </Link>

          <Link to="/contact" className="btn btn-ghost" aria-label="Ir a contacto">
            Contacto
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted">© {currentYear} Ezequiel Fernández</p>
      </div>
    </section>
  );
};
