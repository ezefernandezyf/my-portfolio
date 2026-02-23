import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeProvider';
import { Header } from '..';

describe('Header (mobile drawer)', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>,
    );

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('abre y cierra el drawer con el botón de menú (aria-expanded & aria-hidden) y bloquea scroll', async () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).toHaveAttribute('aria-hidden', 'true');

    await userEvent.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(drawer).toHaveAttribute('aria-hidden', 'false');
    expect(document.body.style.overflow).toBe('hidden');

    const closeBtn = within(drawer).getByRole('button', { name: /cerrar menú/i });
    await userEvent.click(closeBtn);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(drawer).toHaveAttribute('aria-hidden', 'true');
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('cierra el drawer con Escape', async () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    await userEvent.click(menuButton);

    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).toHaveAttribute('aria-hidden', 'false');

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(drawer).toHaveAttribute('aria-hidden', 'true');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('cierra el drawer al clicar un enlace del menú (p. ej. Acerca)', async () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /abrir menú/i });
    await userEvent.click(menuButton);

    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).toHaveAttribute('aria-hidden', 'false');

    const aboutLink = within(drawer).getByRole('link', { name: /acerca/i });
    await userEvent.click(aboutLink);

    await waitFor(() => {
      expect(drawer).toHaveAttribute('aria-hidden', 'true');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(document.body.style.overflow).toBe('');
    });
  });
});
