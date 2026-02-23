import { CvIcon, GithubIcon, LinkedInIcon, SocialButton } from '..';

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-base-200 bg-base-100 py-8">
      <div className="site-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-semibold">Ezequiel Fernández</h3>
          <p className="text-sm text-muted">Front-end Developer</p>
        </div>

        <nav aria-label="Navegación de pie" className="flex gap-4">
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

        <div className="flex items-center gap-3">
          <SocialButton
            to="https://github.com/ezefernandezyf"
            ariaLabel="Abrir perfil de GitHub"
            className="btn-ghost"
          >
            <div className="inline-flex items-center gap-2">
              <GithubIcon className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </div>
          </SocialButton>

          <SocialButton
            to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
            ariaLabel="Abrir perfil de LinkedIn"
            className="btn-ghost"
          >
            <div className="inline-flex items-center gap-2">
              <LinkedInIcon className="h-5 w-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </div>
          </SocialButton>

          <SocialButton to="/CV.pdf" ariaLabel="Descargar CV" className="btn-ghost">
            <div className="inline-flex items-center gap-2">
              <CvIcon className="h-5 w-5" />
              <span className="hidden sm:inline">CV</span>
            </div>
          </SocialButton>
        </div>
      </div>

      <div className="site-container mt-6 pt-4 border-t border-base-200 flex flex-col md:flex-row items-center justify-between text-sm text-muted">
        <p>© {currentYear} Ezequiel Fernández. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-primary" aria-label="Política de privacidad">
            Política de privacidad
          </a>
        </p>
      </div>
    </footer>
  );
};
