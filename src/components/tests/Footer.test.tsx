import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../';

describe('Footer minimal', () => {
  it('muestra copyright y el link de privacidad', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/© \d{4} Ezequiel Fernández/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /política de privacidad/i })).toHaveAttribute(
      'href',
      '/privacy',
    );
  });
});
