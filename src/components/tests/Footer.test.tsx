import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../';

describe('Footer', () => {
  it('renderiza enlaces principales y botones sociales', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /acerca/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument();

    const github = screen.getByRole('link', { name: /abrir perfil de github/i });
    expect(github).toBeInTheDocument();
    expect(github).toHaveAttribute('href', expect.stringContaining('github.com'));

    const linkedin = screen.getByRole('link', { name: /abrir perfil de linkedin/i });
    expect(linkedin).toBeInTheDocument();
    expect(linkedin).toHaveAttribute('href', expect.stringContaining('linkedin.com'));

    // copyright contiene el año actual
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
