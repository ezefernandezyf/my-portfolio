import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import useThemeColor from '../useThemeColor';

function Probe({ theme }: { theme: 'light' | 'dark' }) {
  useThemeColor(theme);
  return null;
}

afterEach(() => {
  document.head.querySelectorAll('meta[data-theme-meta="true"]').forEach((meta) => meta.remove());
  vi.restoreAllMocks();
});

describe('useThemeColor', () => {
  it('usa el valor CSS cuando existe', async () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (property: string) => (property === '--color-bg' ? '  #123456  ' : ''),
    } as unknown as CSSStyleDeclaration);

    render(<Probe theme="light" />);

    await waitFor(() => {
      expect(
        document.head.querySelector('meta[name="theme-color"][data-theme-meta="true"]')?.getAttribute('content'),
      ).toBe('#123456');
    });
  });

  it('cae al fallback oscuro cuando no hay CSS', async () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => '',
    } as unknown as CSSStyleDeclaration);

    render(<Probe theme="dark" />);

    await waitFor(() => {
      expect(
        document.head.querySelector('meta[name="theme-color"][data-theme-meta="true"]')?.getAttribute('content'),
      ).toBe('#0b1220');
    });
  });
});