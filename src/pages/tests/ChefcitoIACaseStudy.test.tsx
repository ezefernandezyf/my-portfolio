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
        name: /repository chefcitoia/i,
      }),
    ).toHaveAttribute('href', 'https://github.com/ezefernandezyf/ia-recipe-generator');
    expect(
      screen.getByRole('link', {
        name: /demo chefcitoia/i,
      }),
    ).toHaveAttribute('href', 'https://chefcitoia.vercel.app');

    const aside = screen.getByTestId('stack-aside');
    const withinAside = within(aside);

    expect(withinAside.getByText(/2026/)).toBeInTheDocument();
    expect(withinAside.getByText(/featured/i)).toBeInTheDocument();
    expect(withinAside.getByText(/stack & tecnologías/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /problema|problem/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /arquitectura y decisiones/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /solución|solution/i,
      }),
    ).toBeInTheDocument();
  });
});