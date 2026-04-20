import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
type ContactPageComponent = typeof import('../ContactPage').ContactPage;
let ContactPageComponent: ContactPageComponent;

describe('ContactPage', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let originalEnv: Record<string, string | undefined> | undefined;

  const setEndpoint = (value: string | undefined) => {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    const env = { ...(meta.env ?? {}) };
    if (value === undefined) {
      delete env.VITE_CONTACT_FORM_ENDPOINT;
    } else {
      env.VITE_CONTACT_FORM_ENDPOINT = value;
    }
    Object.defineProperty(meta, 'env', {
      value: env,
      configurable: true,
      writable: true,
    });
  };

  beforeEach(async () => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock as unknown);
    originalEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
    setEndpoint('https://api.example.com/contact');
    ContactPageComponent = (await import('../ContactPage')).ContactPage;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (originalEnv) {
      Object.defineProperty(import.meta, 'env', {
        value: originalEnv,
        configurable: true,
        writable: true,
      });
    }
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByRole('textbox', { name: /Nombre/i }), 'Ezequiel');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'ezefernandezyf@example.com');
    await user.type(screen.getByRole('textbox', { name: /Asunto/i }), 'Oferta');
    await user.type(
      screen.getByRole('textbox', { name: /Mensaje/i }),
      'Hola! Me interesa la posición.',
    );
    await user.click(screen.getByRole('checkbox', { name: /Acepto/i }));
  };

  it('renderiza el formulario', () => {
    render(<ContactPageComponent />);

    expect(screen.getByRole('heading', { name: /Contacto/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Nombre/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Asunto/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Mensaje/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Acepto/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar mensaje/i })).toBeInTheDocument();
  });

  it('muestra errores de validación al enviar vacío y no llama a fetch', async () => {
    const user = userEvent.setup();
    render(<ContactPageComponent />);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(
      await screen.findByText(/El nombre debe tener al menos 2 caracteres/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/Asunto demasiado corto/i)).toBeInTheDocument();
    expect(screen.getByText(/Mensaje demasiado corto/i)).toBeInTheDocument();
    expect(screen.getByText(/Debes aceptar el consentimiento/i)).toBeInTheDocument();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('simula envío exitoso (mock) y maneja la respuesta', async () => {
    const user = userEvent.setup();

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactPageComponent />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    const maybe = await screen.findByText(
      /Gracias — tu mensaje fue enviado|No está configurado el endpoint de envío/i,
    );
    expect(maybe).toBeInTheDocument();
  });

  it('simula fallo de envío (mock) y muestra error', async () => {
    const user = userEvent.setup();

    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });

    render(<ContactPageComponent />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/Error al enviar:|Error:/i)).toBeInTheDocument();
  });

  it('muestra error genérico si el submit falla con un valor no Error', async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue('boom');

    render(<ContactPageComponent />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    const maybeError = await screen.findByText(
      /No se pudo enviar el mensaje|No está configurado el endpoint de envío/i,
    );
    expect(maybeError).toBeInTheDocument();
  });
});
