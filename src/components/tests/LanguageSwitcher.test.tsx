import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, afterEach } from 'vitest';

let changeLanguageBehavior = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 0);
  });

vi.mock('react-i18next', () => {
  const headerKeys: Record<string, string> = {
    'language.switchToEs': 'Cambiar a español',
    'language.switchToEn': 'Switch to English',
    'language.label': 'Language switcher',
  };
  return {
    useTranslation: () => {
      const [lng, setLng] = useState('es');
      return {
        t: (k: string) => headerKeys[k] ?? k,
        i18n: {
          language: lng,
          changeLanguage: (newLng: string) =>
            changeLanguageBehavior().then(() => {
              setLng(newLng);
            }),
        },
      };
    },
  };
});

import { LanguageSwitcher } from '../';

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/about']}>
      <LanguageSwitcher />
    </MemoryRouter>,
  );
}

describe('LanguageSwitcher (UI)', () => {
  afterEach(() => {
    vi.resetAllMocks();
    changeLanguageBehavior = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 0);
      });
    document.documentElement.lang = '';
  });

  it('cambia a inglés y actualiza document.documentElement.lang', async () => {
    renderWithRouter();
    const user = userEvent.setup();

    const esBtn = screen.getByRole('button', { name: /cambiar a español/i });
    const enBtn = screen.getByRole('button', { name: /switch to english/i });

    expect(esBtn).toHaveAttribute('aria-pressed', 'true');
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');

    await user.click(enBtn);

    await waitFor(() => {
      expect(esBtn).toHaveAttribute('aria-pressed', 'false');
      expect(enBtn).toHaveAttribute('aria-pressed', 'true');
      expect(document.documentElement.lang).toBe('en');
    });
  });

  it('no hace nada si ya está en el idioma seleccionado', async () => {
    renderWithRouter();
    const user = userEvent.setup();

    const esBtn = screen.getByRole('button', { name: /cambiar a español/i });
    await user.click(esBtn); // already ES

    await waitFor(() => {
      expect(esBtn).toHaveAttribute('aria-pressed', 'true');
      expect(document.documentElement.lang).toBe(''); // not changed
    });
  });

  it('registra un error cuando changeLanguage falla', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    changeLanguageBehavior = () => Promise.reject(new Error('boom'));

    renderWithRouter();
    const user = userEvent.setup();

    const enBtn = screen.getByRole('button', { name: /switch to english/i });
    await user.click(enBtn);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
