export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-base-200 bg-base-100 py-6">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            © {currentYear} Ezequiel Fernández. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-sm hover:text-primary"
            aria-label="Política de privacidad"
          >
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};
