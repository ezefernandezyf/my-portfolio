import React from 'react';
import { render, cleanup, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from '../';

const STORAGE_KEY = 'my-portfolio.theme';

function createMockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;

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
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
    window.matchMedia = originalMatchMedia;
  });

  it("toggle aplica la clase 'dark' y persiste en localStorage cuando la preferencia inicial es 'light'", async () => {
    localStorage.setItem(STORAGE_KEY, 'light');

    render(<TestComponent />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');

    const toggleBtn = screen.getByTestId('toggle');
    await act(async () => {
      await userEvent.click(toggleBtn);
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it("cuando la preferencia es 'system' sigue matchMedia y responde a cambios", async () => {
    localStorage.removeItem(STORAGE_KEY);

    const { mql, trigger } = createMockMatchMedia(false);
    window.matchMedia = (() => mql) as (query: string) => MediaQueryList;

    render(<TestComponent />);

    expect(screen.getByTestId('theme').textContent).toBe('system');

    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await act(async () => {
      trigger(true);
    });

    await waitFor(() => {
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});
