import React from 'react';
import { Link } from 'react-router-dom';
import { SocialButton, ThemeToggle } from '..';

/**
 * Header (Navbar) usando daisyUI + Tailwind
 * - Reemplazá los enlaces por los tuyos cuando corresponda
 */
export const Header = (): React.JSX.Element => {
  return (
    <header className="bg-base-100 sticky top-0 z-40 border-b border-base-200">
      <div className="site-container flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 no-underline" aria-label="Ir al inicio">
            <div className="w-10 h-10 rounded-md bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              <span className="select-none">EZ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">Ezequiel Fernández</h1>
              <p className="text-xs text-muted">Front-end Developer</p>
            </div>
          </Link>
        </div>

        {/* Nav (visible en desktop) */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Principal">
          <a href="#about" className="text-sm hover:text-primary" aria-label="Ir a Acerca de mí">
            Acerca
          </a>
          <a href="#projects" className="text-sm hover:text-primary" aria-label="Ir a Proyectos">
            Proyectos
          </a>
          <a href="#contact" className="text-sm hover:text-primary" aria-label="Ir a Contacto">
            Contacto
          </a>
        </nav>

        {/* Acciones (social + theme) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <SocialButton to="https://github.com/ezefernandezyf" ariaLabel="Abrir perfil de GitHub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.69 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.48 3.18-1.17 3.18-1.17.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.07 0 4.42-2.71 5.39-5.29 5.67.42.36.79 1.07.79 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </SocialButton>

            <SocialButton
              to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
              ariaLabel="Abrir perfil de LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.852 0-2.135 1.445-2.135 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.636-1.851 3.369-1.851 3.602 0 4.267 2.372 4.267 5.456v6.286zM5.337 7.433a2.066 2.066 0 11.001-4.132 2.066 2.066 0 010 4.132zM6.538 20.452H3.137V9h3.401v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </SocialButton>

            <SocialButton to="/CV.pdf" ariaLabel="Descargar CV">
              {/* Icono CV (inline) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm1 7V3.5L20.5 9zM8 18v-6h3v6zm5 0v-8h3v8z" />
              </svg>
            </SocialButton>
          </div>

          <ThemeToggle />

          {/* Mobile menu */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Abrir menú">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#about" aria-label="Ir a Acerca">
                    Acerca
                  </a>
                </li>
                <li>
                  <a href="#projects" aria-label="Ir a Proyectos">
                    Proyectos
                  </a>
                </li>
                <li>
                  <a href="#contact" aria-label="Ir a Contacto">
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ezefernandezyf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir perfil de GitHub"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir perfil de LinkedIn"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="/CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Descargar CV"
                  >
                    Descargar CV
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
