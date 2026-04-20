import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../components')>();
  return {
    ...actual,
    ProjectCarousel: (props: React.ComponentProps<'div'>) => (
      <div data-testid="carousel-mock" {...props}>
        Carousel Mock
      </div>
    ),
    MetaTags: () => null,
  };
});

import { HomePage } from '../HomePage';

describe('HomePage', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renderiza el hero, la preview y la grilla curada de proyectos', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /ezequiel fernández/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /acerca de mí|about/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^proyectos$|^projects$/i }),
    ).toBeInTheDocument();

    const cvLinks = screen.getAllByRole('link', { name: /descargar cv/i });
    expect(cvLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvLinks[0]).toHaveAttribute('href', '/Ezequiel_Fernandez_CV.pdf');

    expect(screen.getByText(/stack destacado|featured stack/i)).toBeInTheDocument();
    expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1);

    expect(screen.getByTestId('carousel-mock')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /proyectos seleccionados|selected projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Movie Management Dashboard/i, level: 4 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Movie Management Dashboard/i, level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /CineLab/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /ChefcitoIA/i })).not.toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link')
        .find((link) => link.getAttribute('href') === 'https://github.com/ezefernandezyf/movie-management-dashboard'),
    ).toBeDefined();

    expect(
      screen
        .getAllByRole('link')
        .find((link) => link.getAttribute('href') === 'https://moviesdashboard.vercel.app/home'),
    ).toBeDefined();

    expect(
      screen.getByRole('link', { name: /ver todos los proyectos|view all projects/i }),
    ).toBeInTheDocument();
  });
});
