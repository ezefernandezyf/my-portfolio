import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../data/projects', () => ({
  projects: [
    {
      id: 'alpha',
      nameKey: 'Alpha Project',
      shortKey: 'Alpha short summary',
      repo: 'https://example.com/alpha-repo',
      demo: 'https://example.com/alpha-demo',
      images: ['/projects/alpha.jpg'],
      tech: ['React', 'Testing Library'],
      year: 2025,
      featured: true,
    },
    {
      id: 'beta',
      nameKey: 'Beta Project',
      shortKey: 'Beta focused short summary',
      repo: '',
      demo: 'https://example.com/beta-demo',
      images: ['/projects/beta.jpg'],
      tech: ['Zod'],
      year: 2025,
      featured: false,
    },
    {
      id: 'gamma',
      nameKey: 'Gamma Project',
      shortKey: 'Gamma focused short summary',
      repo: 'https://example.com/gamma-repo',
      demo: '',
      images: ['/projects/gamma.jpg'],
      tech: ['Vite'],
      year: 2025,
      featured: false,
    },
    {
      id: 'delta',
      nameKey: 'Delta Project',
      shortKey: 'Delta short summary',
      repo: 'https://example.com/delta-repo',
      demo: 'https://example.com/delta-demo',
      images: ['/projects/delta.jpg'],
      tech: ['TypeScript'],
      year: 2025,
      featured: false,
    },
    {
      id: 'epsilon',
      nameKey: 'Epsilon Project',
      shortKey: 'Epsilon short summary',
      repo: 'https://example.com/epsilon-repo',
      demo: 'https://example.com/epsilon-demo',
      images: ['/projects/epsilon.jpg'],
      tech: ['React'],
      year: 2025,
      featured: false,
    },
    {
      id: 'zeta',
      nameKey: 'Zeta Project',
      shortKey: 'Zeta short summary',
      repo: 'https://example.com/zeta-repo',
      demo: 'https://example.com/zeta-demo',
      images: ['/projects/zeta.jpg'],
      tech: ['React Query'],
      year: 2025,
      featured: false,
    },
    {
      id: 'eta',
      nameKey: 'Eta Project',
      shortKey: 'Eta short summary',
      repo: 'https://example.com/eta-repo',
      demo: 'https://example.com/eta-demo',
      images: ['/projects/eta.jpg'],
      tech: ['Supabase'],
      year: 2025,
      featured: false,
    },
    {
      id: 'theta',
      nameKey: 'Theta Project',
      shortKey: 'Theta short summary',
      repo: 'https://example.com/theta-repo',
      demo: 'https://example.com/theta-demo',
      images: ['/projects/theta.jpg'],
      tech: ['Zod', 'Vite'],
      year: 2025,
      featured: false,
    },
    {
      id: 'iota',
      nameKey: 'Iota Project',
      shortKey: 'Iota short summary',
      repo: 'https://example.com/iota-repo',
      demo: 'https://example.com/iota-demo',
      images: ['/projects/iota.jpg'],
      tech: ['React Hook Form'],
      year: 2025,
      featured: false,
    },
    {
      id: 'kappa',
      nameKey: 'Kappa Project',
      shortKey: 'Kappa short summary',
      repo: 'https://example.com/kappa-repo',
      demo: 'https://example.com/kappa-demo',
      images: ['/projects/kappa.jpg'],
      tech: ['ESLint'],
      year: 2025,
      featured: false,
    },
  ],
}));

import { ProjectsPage } from '../ProjectsPage';

describe('ProjectsPage coverage', () => {
  it('filtra proyectos, muestra load more y maneja enlaces faltantes', async () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'beta');

    expect(screen.getByRole('heading', { name: /beta project/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /alpha project/i })).not.toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'project');

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(9);

    const betaSection = screen.getByRole('heading', { name: /beta project/i }).closest('section');
    expect(betaSection).toBeTruthy();

    const betaLinks = betaSection ? betaSection.querySelectorAll('a') : [];
    expect(Array.from(betaLinks).some((link) => link.getAttribute('href')?.includes('beta-demo'))).toBe(true);
    expect(Array.from(betaLinks).some((link) => link.getAttribute('href')?.includes('beta-repo'))).toBe(false);
  });
});