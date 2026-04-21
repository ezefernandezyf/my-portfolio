import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, afterEach } from 'vitest';

let changeLanguageBehavior = (_newLng: string) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 0);
  });


vi.mock('react-i18next', () => {
  return {
    useTranslation: () => {
      const [lng, setLng] = useState('es');
      return {
        t: (k: string) => k,
        i18n: {
          language: lng,
          changeLanguage: (newLng: string) =>
            changeLanguageBehavior(newLng).then(() => {
              setLng(newLng);
            }),
        },
      };
    },
  };
});

import { LanguageSwitcher } from '../';

describe('LanguageSwitcher (UI)', () => {
  afterEach(() => {
    vi.resetAllMocks();
    changeLanguageBehavior = (_newLng: string) =>
      new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 0);
      });
    document.documentElement.lang = '';
  });

  it('marca el idioma activo y actualiza document.documentElement.lang', async () => {
    render(<LanguageSwitcher />);
    const user = userEvent.setup();

    const esBtn = screen.getByRole('button', { name: /cambiar a español/i });
    const enBtn = screen.getByRole('button', { name: /switch to english/i });

    expect(esBtn).toHaveAttribute('aria-pressed', 'true');
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');

    await user.click(enBtn);

    await waitFor(() => {
      expect(enBtn).toHaveAttribute('aria-pressed', 'true');
      expect(esBtn).toHaveAttribute('aria-pressed', 'false');
      expect(document.documentElement.lang).toBe('en');
    });
  });

  it('permite volver a español y mantiene el estado sincronizado', async () => {
    render(<LanguageSwitcher />);
    const user = userEvent.setup();

    const esBtn = screen.getByRole('button', { name: /cambiar a español/i });
    await user.click(esBtn);

    await waitFor(() => {
      expect(esBtn).toHaveAttribute('aria-pressed', 'true');
      expect(document.documentElement.lang).toBe('es');
    });
  });

  it('registra un error cuando changeLanguage falla', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    changeLanguageBehavior = () => Promise.reject(new Error('boom'));

    render(<LanguageSwitcher />);
    const user = userEvent.setup();

    const enBtn = screen.getByRole('button', { name: /switch to english/i });
    await user.click(enBtn);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
