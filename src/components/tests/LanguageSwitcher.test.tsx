import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, afterEach } from 'vitest';


vi.mock('react-i18next', () => {
  return {
    useTranslation: () => {
      const [lng, setLng] = useState('es');
      return {
        t: (k: string) => k,
        i18n: {
          language: lng,
          changeLanguage: (newLng: string) =>
            new Promise<void>((resolve) => {
              setLng(newLng);
              setTimeout(() => resolve(), 0);
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
});
