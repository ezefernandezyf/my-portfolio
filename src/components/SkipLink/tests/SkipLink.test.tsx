import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { changeTestLang } from '../../../setupTests';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders with Spanish text by default', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: 'Saltar al contenido principal' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders with English text after language change', async () => {
    await changeTestLang('en');
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: 'Skip to content' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has skip-link class for CSS hooks', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('skip-link');
  });

  it('is visually hidden by default (style-based sr-only)', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link');
    expect(link.style.height).toBe('1px');
    expect(link.style.width).toBe('1px');
    expect(link.style.overflow).toBe('hidden');
    expect(link.style.transform).toBe('translateY(-100%)');
  });

  it('becomes visible on focus', async () => {
    const user = userEvent.setup();
    render(<SkipLink />);

    const link = screen.getByRole('link');
    await user.click(link);
    link.focus();

    expect(link.style.height).toBe('auto');
    expect(link.style.width).toBe('auto');
    expect(link.style.overflow).toBe('visible');
    expect(link.style.transform).toBe('translateY(0)');
  });

  it('hides again on blur', async () => {
    const user = userEvent.setup();
    render(<SkipLink />);

    const link = screen.getByRole('link');
    await user.click(link);
    link.focus();
    link.blur();

    expect(link.style.height).toBe('1px');
    expect(link.style.transform).toBe('translateY(-100%)');
  });
});
