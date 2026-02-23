import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { CvIcon, GithubIcon, LinkedInIcon, SocialButton, ThemeToggle } from '..';

export const Header = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => drawerRef.current?.focus(), 150);
    }
  }, [open]);

  const onLinkClick = () => {
    close();
  };

  return (
    <header className="bg-base-100 sticky top-0 z-50 border-b border-base-200">
      <div className="site-container flex items-center justify-between h-16">
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

        <nav className="hidden md:flex items-center gap-6" aria-label="Principal">
          <Link to="/about" className="text-sm hover:text-primary" aria-label="Ir a Acerca de mí">
            Acerca de mí
          </Link>
          <Link to="/projects" className="text-sm hover:text-primary" aria-label="Ir a Proyectos">
            Proyectos
          </Link>
          <Link to="/contact" className="text-sm hover:text-primary" aria-label="Ir a Contacto">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <SocialButton to="https://github.com/ezefernandezyf" ariaLabel="Abrir perfil de GitHub">
              <GithubIcon className="h-5 w-5 text-base-content/90" />
            </SocialButton>

            <SocialButton
              to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
              ariaLabel="Abrir perfil de LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5 text-base-content/90" />
            </SocialButton>

            <SocialButton to="/CV.pdf" ariaLabel="Descargar CV">
              <CvIcon className="h-5 w-5 text-base-content/90" />
            </SocialButton>
          </div>

          <ThemeToggle />

          <div className="md:hidden">
            <button
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={toggle}
              className="btn btn-ghost btn-circle"
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="pt-6 ps-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              onClick={onLinkClick}
              className="flex items-center gap-3 no-underline"
              aria-label="Ir al inicio"
            >
              <div className="w-10 h-10 rounded-md bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                EZ
              </div>
              <div>
                <h2 className="text-sm font-semibold">Ezequiel Fernández</h2>
                <p className="text-xs text-muted">Front-end Developer</p>
              </div>
            </Link>

            <button onClick={close} aria-label="Cerrar menú" className="btn btn-ghost btn-square">
              <XMarkIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-2 text-base" aria-label="Navegación móvil">
            <Link
              to="/about"
              onClick={onLinkClick}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors"
              aria-label="Ir a Acerca"
            >
              <HomeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>Acerca de mí</span>
            </Link>

            <Link
              to="/home#projects"
              onClick={onLinkClick}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors"
              aria-label="Ir a Proyectos"
            >
              <FolderIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>Proyectos</span>
            </Link>

            <Link
              to="/contact"
              onClick={onLinkClick}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors"
              aria-label="Ir a Contacto"
            >
              <EnvelopeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>Contacto</span>
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-3 mb-4 text-base-content/80">
            <div className="flex items-center gap-2">
              <SocialButton
                to="https://github.com/ezefernandezyf"
                ariaLabel="Abrir perfil de GitHub"
              >
                <div className="inline-flex items-center gap-3">
                  <GithubIcon className="h-5 w-5" />
                  <span>GitHub</span>
                </div>
              </SocialButton>
            </div>
            <div className="flex items-center gap-2">
              <SocialButton
                to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
                ariaLabel="Abrir perfil de LinkedIn"
              >
                <div className="inline-flex items-center gap-3">
                  <LinkedInIcon className="h-5 w-5" />
                  <span>LinkedIn</span>
                </div>
              </SocialButton>
            </div>
            <div className="flex items-center gap-2">
              <SocialButton to="/CV.pdf" ariaLabel="Descargar CV">
                <div className="inline-flex items-center gap-3">
                  <CvIcon className="h-5 w-5" />
                  <span>Descargar CV</span>
                </div>
              </SocialButton>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-30 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
        aria-hidden
      />
    </header>
  );
};
