import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ProjectsPage } from '../ProjectsPage';

describe('ProjectsPage', () => {
  it('renders the editorial directory shell and project actions', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /projects|proyectos/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /search projects|buscar proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filters|filtros/i })).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /view repo|ver repo/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /view demo|ver demo/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /view case study|ver case study/i })).toHaveLength(3);
  });
});
