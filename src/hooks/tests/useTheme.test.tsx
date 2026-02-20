import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useTheme from '../useTheme';

const STORAGE_KEY = 'my-portfolio.theme';

/**
 * Mock tipado para window.matchMedia que implementa addEventListener/removeEventListener
 * y permite disparar cambios con trigger(matches).
 */
function createMockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;

  // Map para poder eliminar listeners correctamente si fuera necesario
  const listeners = new Map<EventListenerOrEventListenerObject, EventListener>();

  const mql: MediaQueryList = {
    get matches() {
      return matches;
    },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
      if (type !== 'change') return;
      const wrapped: EventListener = (e: Event) => {
        const ev = e as MediaQueryListEvent;
        if (typeof listener === 'function') {
          (listener as EventListener)(ev as unknown as Event);
        } else if (typeof (listener as EventListenerObject).handleEvent === 'function') {
          (listener as EventListenerObject).handleEvent(ev as unknown as Event);
        }
      };
      listeners.set(listener, wrapped);
    },
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
      if (type !== 'change') return;
      listeners.delete(listener);
    },
    dispatchEvent(event: Event) {
      void event;
      return false;
    },
  } as unknown as MediaQueryList;

  const trigger = (v: boolean) => {
    matches = v;
    const ev = { matches: v } as MediaQueryListEvent;
    for (const wrapped of listeners.values()) {
      wrapped(ev as unknown as Event);
    }
  };

  return { mql, trigger };
}

/** Componente de prueba que expone botones para interactuar con el hook */
function TestComponent(): React.JSX.Element {
  const { theme, resolvedTheme, setTheme, toggle } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="resolved">{resolvedTheme}</div>
      <button data-testid="set-system" onClick={() => setTheme('system')}>
        Set System
      </button>
      <button data-testid="toggle" onClick={() => toggle()}>
        Toggle
      </button>
    </div>
  );
}

describe('useTheme hook', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    cleanup();
    // limpiar estado global
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
    // restaurar matchMedia original
    window.matchMedia = originalMatchMedia;
  });

  it("toggle aplica la clase 'dark' y persiste en localStorage cuando la preferencia inicial es 'light'", async () => {
    // forzamos preferencia explícita 'light' en localStorage
    localStorage.setItem(STORAGE_KEY, 'light');

    render(<TestComponent />);

    // Antes del toggle: no debe existir la clase dark
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');

    const toggleBtn = screen.getByTestId('toggle');
    await userEvent.click(toggleBtn);

    // Después del toggle: preferencia a 'dark' y clase aplicada
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it("cuando la preferencia es 'system' sigue matchMedia y responde a cambios", async () => {
    // Eliminamos cualquier preferencia guardada para que el hook arranque en 'system'
    localStorage.removeItem(STORAGE_KEY);

    // Mock de matchMedia: empieza en false (light)
    const { mql, trigger } = createMockMatchMedia(false);
    window.matchMedia = (() => mql) as unknown as (query: string) => MediaQueryList;

    render(<TestComponent />);

    // theme inicial debe ser 'system'
    expect(screen.getByTestId('theme').textContent).toBe('system');
    // resolvedTheme debe ser 'light' según el mock inicial
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Disparamos cambio del sistema: ahora matches = true => dark
    trigger(true);

    // Esperamos que el DOM y el resolvedTheme se actualicen
    await waitFor(() => {
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});
