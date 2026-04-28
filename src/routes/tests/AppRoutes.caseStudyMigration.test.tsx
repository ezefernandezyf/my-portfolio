import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from '../../context/ThemeProvider';
import { AppRoutes } from '../AppRoutes';

describe('AppRoutes case-study migration', () => {
  it('renders movie-dashboard through the migrated feature route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/movie-dashboard']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /movie management dashboard/i })).toBeInTheDocument();
  });

  it('renders cinelab through the migrated feature route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/cinelab']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /cinelab/i })).toBeInTheDocument();
  });

  it('renders chefcitoia through the migrated feature route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/chefcitoia']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /chefcitoia/i })).toBeInTheDocument();
  });

  it('renders nexus talent through the migrated feature route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/nexus-talent']}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /nexus talent/i })).toBeInTheDocument();
  });
});