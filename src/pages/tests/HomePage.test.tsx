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

  it('renderiza el hero, links principales y la preview de proyecto', () => {
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
      screen.getByRole('link', { name: /proyectos|projects/i }),
    ).toBeInTheDocument();

    const cvLinks = screen.getAllByRole('link', { name: /descargar cv/i });
    expect(cvLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvLinks[0]).toHaveAttribute('href', '/Ezequiel_Fernandez_CV.pdf');

    expect(screen.getByText(/stack destacado|featured stack/i)).toBeInTheDocument();
    expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1);

    expect(screen.getByTestId('carousel-mock')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /cinelab/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /repositorio de cinelab|ver repo|view repo/i }),
    ).toHaveAttribute('href', 'https://github.com/ezefernandezyf/cinelab-react');

    expect(screen.getByRole('link', { name: /abrir demo|ver demo|view demo/i })).toHaveAttribute(
      'href',
      'https://cinelab-movies.vercel.app',
    );

    expect(screen.getByRole('link', { name: /ver todos|view all/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contactar|contact/i })).toBeInTheDocument();
  });
});
