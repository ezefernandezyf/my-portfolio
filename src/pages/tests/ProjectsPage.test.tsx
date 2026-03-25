import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ProjectsPage } from '../ProjectsPage';

describe('ProjectsPage', () => {
  it('muestra el spotlight de ChefcitoIA con repo, demo y case study dedicado', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /proyectos|projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /movie management dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cinelab/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /chefcitoia/i })).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: /case study/i }).length).toBe(3);
    expect(screen.getAllByRole('link', { name: /view repo|ver repo/i }).length).toBe(3);
    expect(screen.getAllByRole('link', { name: /view demo|ver demo/i }).length).toBe(3);

    expect(
      screen.getByRole('link', {
        name: /ver repo chefcitoia|view repo chefcitoia/i,
      }),
    ).toHaveAttribute('href', 'https://github.com/ezefernandezyf/ia-recipe-generator');
    expect(
      screen.getByRole('link', {
        name: /ver demo chefcitoia|view demo chefcitoia/i,
      }),
    ).toHaveAttribute('href', 'https://chefcitoia.vercel.app');

    const caseStudyLink = screen
      .getAllByRole('link')
      .find((link) => (link.getAttribute('href') || '').includes('/projects/chefcitoia'));

    expect(caseStudyLink).toBeDefined();
  });
});