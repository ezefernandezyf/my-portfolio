import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../shared/seo', () => ({
  MetaTags: () => null,
}));

import { HomePage } from '../HomePage';

describe('HomePage', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renderiza el hero, stack, proyectos recientes y CTA de contacto', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /ezequiel\s*fernández/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /acerca de mí|about/i })).toBeInTheDocument();
    const projectLinks = screen.getAllByRole('link', { name: /proyectos|projects/i });
    expect(projectLinks.length).toBeGreaterThanOrEqual(1);
    expect(projectLinks[0]).toBeInTheDocument();

    const cvLinks = screen.getAllByRole('link', { name: /descargar cv/i });
    expect(cvLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvLinks[0]).toHaveAttribute('href', '/Ezequiel_Fernandez_CV.pdf');

    expect(screen.getByText(/technical ecosystem|ecosistema técnico/i)).toBeInTheDocument();
    expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1);

    expect(
      screen.getByRole('heading', { name: /recent work|trabajos recientes/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /EchoLog/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Nexus Talent/i })).toBeInTheDocument();

    const repoLinks = screen.getAllByRole('link', { name: /ver repo|view repo/i });
    expect(repoLinks).toHaveLength(2);
    expect(repoLinks[0]).toHaveAttribute('href', 'https://github.com/ezefernandezyf/echolog');
    expect(repoLinks[1]).toHaveAttribute('href', 'https://github.com/ezefernandezyf/nexus-talent');

    const demoLinks = screen.getAllByRole('link', { name: /ver demo|view demo/i });
    expect(demoLinks).toHaveLength(2);
    expect(demoLinks[0]).toHaveAttribute('href', 'https://echolog-web.vercel.app');
    expect(demoLinks[1]).toHaveAttribute('href', 'https://nexustalent.vercel.app');

    const caseStudyLinks = screen.getAllByRole('link', { name: /ver case study|view case study/i });
    expect(caseStudyLinks).toHaveLength(2);
    expect(caseStudyLinks[0]).toHaveAttribute('href', '/projects/echolog');
    expect(caseStudyLinks[1]).toHaveAttribute('href', '/projects/nexus-talent');

    expect(
      screen.getByRole('heading', { name: /interested in my profile|te interesa mi perfil/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contactar|contact/i })).toBeInTheDocument();
  });

  it('renderiza el glow del cursor y responde a pointer events', async () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const heroSection = container.querySelector('section');
    expect(heroSection).toBeInTheDocument();

    const glow = container.querySelector('[aria-hidden="true"]');
    expect(glow).toBeInTheDocument();

    const user = userEvent.setup();
    await user.pointer({ target: heroSection!, coords: { clientX: 200, clientY: 150 } });

    expect(glow).toBeInTheDocument();
  });

  it('activa animaciones cuando el IntersectionObserver detecta interseccion', () => {
    const observerCallbacks: Array<(entries: IntersectionObserverEntry[]) => void> = [];

    window.IntersectionObserver = vi.fn(function (
      callback: (entries: IntersectionObserverEntry[]) => void,
    ) {
      observerCallbacks.push(callback);
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        takeRecords: vi.fn(() => []),
        root: null,
        rootMargin: '',
        thresholds: [],
      };
    }) as unknown as typeof IntersectionObserver;

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    act(() => {
      observerCallbacks.forEach((cb) => {
        cb([{ isIntersecting: true } as IntersectionObserverEntry]);
      });
    });

    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    expect(animatedElements.length).toBeGreaterThanOrEqual(1);
  });

  it('no mueve el cursor glow cuando reducedMotion esta activo', async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const heroSection = container.querySelector('section');
    expect(heroSection).toBeInTheDocument();

    // Glow div should NOT render when reducedMotion is true
    const glow = container.querySelector('.pointer-events-none.fixed.inset-0');
    expect(glow).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.pointer({ target: heroSection!, coords: { clientX: 200, clientY: 150 } });
  });
});
