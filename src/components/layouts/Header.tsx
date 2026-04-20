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
    <header
      className="sticky top-0 z-50 border-b border-base-200/70 bg-base-100/90 backdrop-blur-md"
    >
      <div className="site-container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 no-underline"
            aria-label={t('logo.ariaHome')}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-base-200 bg-base-100 text-sm font-bold uppercase tracking-tight text-base-content shadow-sm">
              <span className="select-none">{t('logo.abbr')}</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold tracking-tight text-base-content">{t('logo.name')}</h1>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t('logo.role')}</p>
            </div>
          </Link>
        </div>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-tight md:flex"
          aria-label={t('nav.aria')}
        >
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary ${isActive ? 'text-primary' : 'text-base-content/70'}`
            }
            aria-label={t('mobile.about')}
          >
            {t('nav.about')}
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary ${isActive ? 'text-primary' : 'text-base-content/70'}`
            }
            aria-label={t('nav.projects')}
          >
            {t('nav.projects')}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary ${isActive ? 'text-primary' : 'text-base-content/70'}`
            }
            aria-label={t('nav.contact')}
          >
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 sm:flex">
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
              className="btn btn-ghost btn-minimal"
              aria-label={t('social.downloadCvAria')}
            >
              <CvIcon className="h-5 w-5 text-base-content/90" />
            </a>
          </div>

          <LanguageSwitcher />

          <ThemeToggle />

          <div className="md:hidden">
            <button
              aria-label={open ? t('mobile.closeMenu') : t('mobile.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={toggle}
              className="btn btn-ghost btn-circle btn-minimal"
              type="button"
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
        className={`mobile-drawer-solid fixed inset-y-0 right-0 h-full w-80 max-w-full rounded-l-[1.5rem] border-l border-base-200 bg-base-100/98 shadow-[0_24px_80px_rgba(15,23,42,0.22)] transform transition-transform duration-300 ease-in-out z-70
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col px-4 pb-4 pt-6">
          <div className="mb-6 flex items-center justify-between border-b border-base-200/70 pb-4">
            <Link
              to="/"
              onClick={onLinkClick}
              className="flex items-center gap-3 no-underline"
              aria-label={t('mobile.backToHome')}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-base-200 bg-base-100 text-sm font-bold uppercase tracking-tight text-base-content shadow-sm">
                EZ
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-base-content">{t('logo.name')}</h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t('logo.role')}</p>
              </div>
            </Link>

            <button
              onClick={close}
              aria-label={t('mobile.closeMenu')}
              className="btn btn-ghost btn-square btn-minimal"
              type="button"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-2 text-base" aria-label={t('mobile.navLabel')}>
            <NavLink
              to="/about"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 transition-colors hover:border-base-200 hover:bg-base-200/80 ${isActive ? 'border-base-200 bg-base-200 text-primary' : 'text-base-content/85'}`
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
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 transition-colors hover:border-base-200 hover:bg-base-200/80 ${isActive ? 'border-base-200 bg-base-200 text-primary' : 'text-base-content/85'}`
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
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 transition-colors hover:border-base-200 hover:bg-base-200/80 ${isActive ? 'border-base-200 bg-base-200 text-primary' : 'text-base-content/85'}`
              }
              aria-label={t('mobile.contact')}
            >
              <EnvelopeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.contact')}</span>
            </NavLink>
          </nav>

          <div className="mt-auto mb-4 flex flex-col gap-3 text-base-content/80">
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 z-60 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
        aria-hidden
      />
    </header>
  );
};