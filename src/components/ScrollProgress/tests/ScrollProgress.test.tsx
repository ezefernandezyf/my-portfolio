import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ScrollProgress } from '../ScrollProgress';

describe('ScrollProgress', () => {
  beforeEach(() => {
    // Default: page at top, scrollable height
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
  });

  it('renders as progressbar with correct ARIA attributes', () => {
    render(<ScrollProgress />);

    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows 0% width at page top', () => {
    render(<ScrollProgress />);

    const bar = screen.getByRole('progressbar');
    expect(bar.style.width).toBe('0%');
  });

  it('shows ~50% width at mid-scroll', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<ScrollProgress />);

    const bar = screen.getByRole('progressbar');
    // 500 / (2000 - 1000) = 50%
    expect(bar.style.width).toBe('50%');
  });

  it('shows 100% width at page bottom', () => {
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
    render(<ScrollProgress />);

    const bar = screen.getByRole('progressbar');
    expect(bar.style.width).toBe('100%');
  });

  it('applies reduced-motion: no transition when prefers-reduced-motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ScrollProgress />);

    const bar = screen.getByRole('progressbar');
    expect(bar.style.transition).toBe('none');
  });
});
