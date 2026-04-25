import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PrivacyPage } from '../PrivacyPage';

describe('PrivacyPage', () => {
  it('renderiza el hero, las tarjetas legales y el enlace de contacto', () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: /privacy policy|pol[ií]tica de privacidad/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(6);
    expect(screen.getByText(/privacy & trust|privacy/i)).toBeInTheDocument();

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