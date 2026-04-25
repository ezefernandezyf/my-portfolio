import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renderiza el mensaje 404 y los enlaces principales', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.some((link) => link.getAttribute('href') === '/home')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/contact')).toBe(true);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});