import { render, screen } from '@testing-library/react';
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

    expect(
      screen.getByRole('link', { name: /acerca de mí|about/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /proyectos|projects/i }),
    ).toBeInTheDocument();

    const cvLinks = screen.getAllByRole('link', { name: /descargar cv/i });
    expect(cvLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvLinks[0]).toHaveAttribute('href', '/Ezequiel_Fernandez_CV.pdf');

    expect(screen.getByText(/technical ecosystem|ecosistema técnico/i)).toBeInTheDocument();
    expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1);

    expect(screen.getByRole('heading', { name: /recent work|trabajos recientes/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Nexus Talent/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Movie Management Dashboard/i })).toBeInTheDocument();

      const repoLinks = screen.getAllByRole('link', { name: /ver repo|view repo/i });
      expect(repoLinks).toHaveLength(2);
    expect(repoLinks[0]).toHaveAttribute('href', 'https://github.com/ezefernandezyf/nexus-talent');
    expect(repoLinks[1]).toHaveAttribute('href', 'https://github.com/ezefernandezyf/movie-management-dashboard');

      const demoLinks = screen.getAllByRole('link', { name: /ver demo|view demo/i });
      expect(demoLinks).toHaveLength(2);
    expect(demoLinks[0]).toHaveAttribute('href', 'https://nexustalent.vercel.app');
    expect(demoLinks[1]).toHaveAttribute('href', 'https://moviesdashboard.vercel.app/');

      const caseStudyLinks = screen.getAllByRole('link', { name: /ver case study|view case study/i });
      expect(caseStudyLinks).toHaveLength(2);
    expect(caseStudyLinks[0]).toHaveAttribute('href', '/projects/nexus-talent');
    expect(caseStudyLinks[1]).toHaveAttribute('href', '/projects/movie-dashboard');

    expect(screen.getByRole('heading', { name: /interested in my profile|te interesa mi perfil/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contactar|contact/i })).toBeInTheDocument();
  });
});
