import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ProjectsPage } from '../ProjectsPage';

describe('ProjectsPage', () => {
  it('muestra ChefcitoIA y enlaza a su case study dedicado', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /proyectos|projects/i })).toBeInTheDocument();
    expect(screen.getByText(/chefcitoia/i)).toBeInTheDocument();

    const caseStudyLink = screen
      .getAllByRole('link')
      .find((link) => (link.getAttribute('href') || '').includes('/projects/chefcitoia'));

    expect(caseStudyLink).toBeDefined();
  });
});