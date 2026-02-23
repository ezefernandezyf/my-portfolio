import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext, type ThemeContextValue } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

describe('ThemeToggle', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('muestra el título correcto y llama a toggle al hacer click (resolvedTheme = light)', async () => {
    const toggleMock = vi.fn();
    const contextValue: ThemeContextValue = {
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: vi.fn(),
      toggle: toggleMock,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button', { name: /alternar tema/i });
    expect(button).toHaveAttribute('title');
    expect(button.getAttribute('title')?.toLowerCase()).toContain('tema: light');

    await userEvent.click(button);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('muestra el título correcto y llama a toggle al hacer click (resolvedTheme = dark)', async () => {
    const toggleMock = vi.fn();
    const contextValue: ThemeContextValue = {
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: vi.fn(),
      toggle: toggleMock,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button', { name: /alternar tema/i });
    expect(button.getAttribute('title')?.toLowerCase()).toContain('tema: dark');

    await userEvent.click(button);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('cambia el icono cuando cambia resolvedTheme (re-renderizando con otro context value)', async () => {
    const toggleMock = vi.fn();

    const lightValue: ThemeContextValue = {
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: vi.fn(),
      toggle: toggleMock,
    };

    const darkValue: ThemeContextValue = {
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: vi.fn(),
      toggle: toggleMock,
    };

    const { rerender } = render(
      <ThemeContext.Provider value={lightValue}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button', { name: /alternar tema/i });
    const svgBefore = button.querySelector('svg')?.outerHTML ?? '';

    rerender(
      <ThemeContext.Provider value={darkValue}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const svgAfter = button.querySelector('svg')?.outerHTML ?? '';
    expect(svgBefore).not.toBe(svgAfter);
  });
});
