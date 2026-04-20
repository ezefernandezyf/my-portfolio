import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PrivacyPage } from '../PrivacyPage';

describe('PrivacyPage', () => {
  it('renderiza el contenido legal y el enlace de contacto', () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(5);

    const mailtoLink = screen
      .getAllByRole('link')
      .find((link) => (link.getAttribute('href') ?? '').startsWith('mailto:'));

    expect(mailtoLink).toBeDefined();
    const contactLink = screen
      .getAllByRole('link')
      .find((link) => link.getAttribute('href') === '/contact');

    expect(contactLink).toBeDefined();
  });
});