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
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200/20 bg-surface/70 backdrop-blur-md">
      <nav className="site-container flex h-16 w-full max-w-full items-center justify-between gap-8 md:h-12">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold uppercase tracking-tight text-on-surface font-space-grotesk focus-ring"
            aria-label={t('logo.ariaHome')}
          >
            [EZ]
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-tight font-space-grotesk transition-colors duration-200 focus-ring ${isActive ? 'text-primary' : 'text-text/70 hover:text-primary'}`
              }
            >
              {t('nav.projects')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-tight font-space-grotesk transition-colors duration-200 focus-ring ${isActive ? 'text-primary' : 'text-text/70 hover:text-primary'}`
              }
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-tight font-space-grotesk transition-colors duration-200 focus-ring ${isActive ? 'text-primary' : 'text-text/70 hover:text-primary'}`
              }
            >
              {t('nav.contact')}
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/ezefernandezyf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-text/70 hover:text-primary focus-ring transition-colors"
              title={t('social.githubAria')}
              aria-label={t('social.githubAria')}
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-text/70 hover:text-primary focus-ring transition-colors"
              title={t('social.linkedInAria')}
              aria-label={t('social.linkedInAria')}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <a
              href="/Ezequiel_Fernandez_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center justify-center border-2 border-primary px-6 text-sm font-bold uppercase tracking-tight text-primary transition-all hover:bg-primary/5 active:scale-95 sm:inline-flex"
              aria-label={t('social.downloadCvAria')}
            >
              {t('social.downloadCv')}
            </a>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={open ? t('mobile.closeMenu') : t('mobile.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="inline-flex h-10 w-10 items-center justify-center text-text/70 transition-colors hover:text-primary focus-ring md:hidden"
          >
            {open ? <XMarkIcon className="h-6 w-6" aria-hidden /> : <Bars3Icon className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-70 h-full w-80 max-w-full rounded-l-3xl border-l border-neutral-200 bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col px-4 pb-4 pt-6">
          <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
            <Link to="/" onClick={closeDrawer} className="flex items-center gap-3 text-text no-underline" aria-label={t('mobile.backToHome')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-surface text-sm font-bold uppercase tracking-tight text-text font-space-grotesk shadow-sm">
                EZ
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-text font-space-grotesk">{t('logo.name')}</h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted font-label">{t('logo.role')}</p>
              </div>
            </Link>

            <button type="button" onClick={closeDrawer} aria-label={t('mobile.closeMenu')} className="inline-flex h-10 w-10 items-center justify-center text-text/70 transition-colors hover:text-primary focus-ring">
              <XMarkIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label={t('mobile.navLabel')}>
            <NavLink
              to="/projects"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-neutral-200 hover:bg-neutral-200/80 ${isActive ? 'border-neutral-200 bg-neutral-200 text-primary' : 'text-text/85'}`
              }
            >
              <FolderIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.projects')}</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-neutral-200 hover:bg-neutral-200/80 ${isActive ? 'border-neutral-200 bg-neutral-200 text-primary' : 'text-text/85'}`
              }
            >
              <HomeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.about')}</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold transition-colors hover:border-neutral-200 hover:bg-neutral-200/80 ${isActive ? 'border-neutral-200 bg-neutral-200 text-primary' : 'text-text/85'}`
              }
            >
              <EnvelopeIcon className="h-5 w-5 text-muted" aria-hidden />
              <span>{t('mobile.contact')}</span>
            </NavLink>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ezefernandezyf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-base-content/80 transition-colors hover:text-primary"
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
                className="inline-flex items-center gap-3 text-base-content/80 transition-colors hover:text-primary"
                aria-label={t('social.linkedInAria')}
              >
                <LinkedInIcon className="h-5 w-5" />
                <span>{t('social.linkedIn')}</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="text-sm text-muted font-label">{t('social.downloadCvAria')}</span>
            </div>
            <a
              href="/Ezequiel_Fernandez_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-10 items-center justify-center border-2 border-primary px-6 text-sm font-bold uppercase tracking-tight text-primary transition-all hover:bg-primary/5 active:scale-95"
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

      <div
        onClick={closeDrawer}
        aria-hidden
        className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
    </header>
  );
};