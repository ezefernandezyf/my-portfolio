import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { CvIcon, GithubIcon, LanguageSwitcher, LinkedInIcon, SocialButton, ThemeToggle } from '..';
import { useTranslation } from 'react-i18next';

export const Header = (): React.JSX.Element => {
  const { t } = useTranslation('header');
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
          <Link
            to="/"
            className="flex items-center gap-3 no-underline"
            aria-label={t('logo.ariaHome')}
          >
            <div className="w-10 h-10 rounded-md bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              <span className="select-none">{t('logo.abbr')}</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">{t('logo.name')}</h1>
              <p className="text-xs text-muted">{t('logo.role')}</p>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label={t('nav.aria')}>
          <NavLink
            to="/about"
            className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''}`}
            aria-label={t('mobile.about')}
          >
            {t('nav.about')}
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''}`}
            aria-label={t('nav.projects')}
          >
            {t('nav.projects')}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''}`}
            aria-label={t('nav.contact')}
          >
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <SocialButton to="https://github.com/ezefernandezyf" ariaLabel={t('social.githubAria')}>
              <GithubIcon className="h-5 w-5 text-base-content/90" />
            </SocialButton>

            <SocialButton
              to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
              ariaLabel={t('social.linkedInAria')}
            >
              <LinkedInIcon className="h-5 w-5 text-base-content/90" />
            </SocialButton>

            <a
              href="/Ezequiel_Fernandez_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label={t('social.downloadCvAria')}
            >
              <CvIcon className="h-5 w-5 text-base-content/90" />
            </a>
          </div>

          <ThemeToggle />

          <LanguageSwitcher />

          <div className="md:hidden">
            <button
              aria-label={open ? t('mobile.closeMenu') : t('mobile.openMenu')}
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
              aria-label={t('mobile.backToHome')}
            >
              <div className="w-10 h-10 rounded-md bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                EZ
              </div>
              <div>
                <h2 className="text-sm font-semibold">{t('logo.name')}</h2>
                <p className="text-xs text-muted">{t('logo.role')}</p>
              </div>
            </Link>

            <button
              onClick={close}
              aria-label={t('mobile.closeMenu')}
              className="btn btn-ghost btn-square"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-2 text-base" aria-label={t('mobile.navLabel')}>
            <NavLink
              to="/about"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors ${isActive ? 'text-primary' : ''}`
              }
              aria-label={t('mobile.about')}
            >
              <HomeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.about')}</span>
            </NavLink>

            <NavLink
              to="/projects"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors ${isActive ? 'text-primary' : ''}`
              }
              aria-label={t('mobile.projects')}
            >
              <FolderIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.projects')}</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-base-200 transition-colors ${isActive ? 'text-primary' : ''}`
              }
              aria-label={t('mobile.contact')}
            >
              <EnvelopeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.contact')}</span>
            </NavLink>
          </nav>

          <div className="mt-auto flex flex-col gap-3 mb-4 text-base-content/80">
            <div className="flex items-center gap-2">
              <SocialButton
                to="https://github.com/ezefernandezyf"
                ariaLabel={t('social.githubAria')}
              >
                <div className="inline-flex items-center gap-3">
                  <GithubIcon className="h-5 w-5" />
                  <span>{t('social.github')}</span>
                </div>
              </SocialButton>
            </div>
            <div className="flex items-center gap-2">
              <SocialButton
                to="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
                ariaLabel={t('social.linkedInAria')}
              >
                <div className="inline-flex items-center gap-3">
                  <LinkedInIcon className="h-5 w-5" />
                  <span>{t('social.linkedIn')}</span>
                </div>
              </SocialButton>
            </div>
            <div className="flex items-center gap-2">
              <SocialButton to="/CV.pdf" ariaLabel={t('social.downloadCvAria')}>
                <div className="inline-flex items-center gap-3">
                  <CvIcon className="h-5 w-5" />
                  <span>{t('social.downloadCv')}</span>
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
