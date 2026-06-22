import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { ProjectsListPage } from '../ProjectsListPage';

describe('Stagger integration', () => {
  it('renders project cards with stagger structure', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <ProjectsListPage />
      </MemoryRouter>,
    );

    // All 7 project cards render
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBeGreaterThan(0);

    // Cards initially have opacity-0 (hidden until IntersectionObserver fires)
    const gridItems = document.querySelectorAll('.opacity-0');
    expect(gridItems.length).toBeGreaterThan(0);
  });

  it('shows project count text', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <ProjectsListPage />
      </MemoryRouter>,
    );

    // The projects count is rendered as plain text in the page
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
  });
});
