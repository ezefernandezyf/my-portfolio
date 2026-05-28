import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { GithubIcon, LinkedInIcon, LanguageSwitcher, ThemeToggle } from '..';
import { useTranslation } from 'react-i18next';

export const Header = (): React.JSX.Element => {
  const { t } = useTranslation('header');
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((current) => !current);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
      window.setTimeout(() => drawerRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeDrawer = () => close();

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="bg-bg-primary/80 backdrop-blur-md">
        <nav className="site-container flex h-16 w-full items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold text-accent font-mono focus-ring"
            aria-label={t('logo.ariaHome')}
          >
            [EZ]
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `relative text-sm font-medium uppercase tracking-wider font-body text-text-secondary transition-colors duration-200 focus-ring
                after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200
                hover:text-accent hover:after:w-full
                ${isActive ? 'text-accent after:w-full' : ''}`
              }
            >
              {t('nav.projects')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative text-sm font-medium uppercase tracking-wider font-body text-text-secondary transition-colors duration-200 focus-ring
                after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200
                hover:text-accent hover:after:w-full
                ${isActive ? 'text-accent after:w-full' : ''}`
              }
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative text-sm font-medium uppercase tracking-wider font-body text-text-secondary transition-colors duration-200 focus-ring
                after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200
                hover:text-accent hover:after:w-full
                ${isActive ? 'text-accent after:w-full' : ''}`
              }
            >
              {t('nav.contact')}
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Grouped controls: ThemeToggle + LanguageSwitcher */}
          <div className="control-cluster hidden sm:inline-flex">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/ezefernandezyf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent focus-ring"
              title={t('social.githubAria')}
              aria-label={t('social.githubAria')}
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent focus-ring"
              title={t('social.linkedInAria')}
              aria-label={t('social.linkedInAria')}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="sm:hidden">
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={open ? t('mobile.closeMenu') : t('mobile.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent focus-ring md:hidden"
          >
            {open ? <XMarkIcon className="h-6 w-6" aria-hidden /> : <Bars3Icon className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`mobile-drawer-solid fixed inset-y-0 right-0 z-70 h-full w-80 max-w-full rounded-l-3xl border-l border-border bg-bg-primary shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col px-4 pb-4 pt-6">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <Link
              to="/"
              onClick={closeDrawer}
              className="flex items-center gap-3 text-text-primary no-underline"
              aria-label={t('mobile.backToHome')}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold uppercase tracking-tight text-accent font-mono shadow-sm">
                EZ
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-text-primary font-body">{t('logo.name')}</h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted font-label">{t('logo.role')}</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={closeDrawer}
              aria-label={t('mobile.closeMenu')}
              className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent focus-ring"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label={t('mobile.navLabel')}>
            <NavLink
              to="/projects"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-border-hover hover:bg-surface-elevated/80 ${isActive ? 'border-border bg-surface-elevated text-accent' : 'text-text-secondary'}`
              }
            >
              <FolderIcon className="h-5 w-5 text-text-muted" aria-hidden />
              <span>{t('mobile.projects')}</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-border-hover hover:bg-surface-elevated/80 ${isActive ? 'border-border bg-surface-elevated text-accent' : 'text-text-secondary'}`
              }
            >
              <HomeIcon className="h-5 w-5 text-text-muted" aria-hidden />
              <span>{t('mobile.about')}</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-border-hover hover:bg-surface-elevated/80 ${isActive ? 'border-border bg-surface-elevated text-accent' : 'text-text-secondary'}`
              }
            >
              <EnvelopeIcon className="h-5 w-5 text-text-muted" aria-hidden />
              <span>{t('mobile.contact')}</span>
            </NavLink>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ezefernandezyf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
                aria-label={t('social.githubAria')}
              >
                <GithubIcon className="h-5 w-5" />
                <span>{t('social.github')}</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
                aria-label={t('social.linkedInAria')}
              >
                <LinkedInIcon className="h-5 w-5" />
                <span>{t('social.linkedIn')}</span>
              </a>
            </div>
            <a
              href="/Ezequiel_Fernandez_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-10 items-center justify-center border-2 border-accent px-6 text-sm font-bold uppercase tracking-tight text-accent transition-all hover:bg-accent/5 active:scale-95"
              aria-label={t('social.downloadCvAria')}
            >
              {t('social.downloadCv')}
            </a>
          </div>

          <div className="mt-auto pt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Drawer overlay */}
      <div
        onClick={closeDrawer}
        aria-hidden
        className={`fixed inset-0 z-60 bg-black/45 backdrop-blur-[1px] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
    </header>
  );
};
