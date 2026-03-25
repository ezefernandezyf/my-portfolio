import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ChefcitoIACaseStudy } from '../Projects/ChefcitoIACaseStudy';

describe('ChefcitoIACaseStudy', () => {
  it('muestra la cabecera con repo y demo, más stack y secciones principales', () => {
    render(
      <MemoryRouter>
        <ChefcitoIACaseStudy />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /chefcitoia/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /repositorio ia recipe generator|ia recipe generator repository/i,
      }),
    ).toHaveAttribute('href', 'https://github.com/ezefernandezyf/ia-recipe-generator');
    expect(
      screen.getByRole('link', {
        name: /demo ia recipe generator|ia recipe generator demo/i,
      }),
    ).toHaveAttribute('href', 'https://chefcitoia.vercel.app');

    const aside = screen.getByTestId('stack-aside');
    const withinAside = within(aside);

    expect(withinAside.getByText(/frontend/i)).toBeInTheDocument();
    expect(withinAside.getByText(/estilos|styles/i)).toBeInTheDocument();
    expect(withinAside.getByText(/zod/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /tecnologías y herramientas|technologies & tools/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /arquitectura y decisiones|architecture & decisions/i,
      }),
    ).toBeInTheDocument();
  });
});