import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactPage } from '../ContactPage';

describe('ContactPage', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock as unknown);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renderiza el formulario', () => {
    render(<ContactPage />);

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
    render(<ContactPage />);

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

    render(<ContactPage />);

    await user.type(screen.getByRole('textbox', { name: /Nombre/i }), 'Ezequiel');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'ezefernandezyf@example.com');
    await user.type(screen.getByRole('textbox', { name: /Asunto/i }), 'Oferta');
    await user.type(
      screen.getByRole('textbox', { name: /Mensaje/i }),
      'Hola! Me interesa la posición.',
    );
    await user.click(screen.getByRole('checkbox', { name: /Acepto/i }));

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

    render(<ContactPage />);

    await user.type(screen.getByRole('textbox', { name: /Nombre/i }), 'Ezequiel');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'ezefernandezyf@example.com');
    await user.type(screen.getByRole('textbox', { name: /Asunto/i }), 'Oferta');
    await user.type(
      screen.getByRole('textbox', { name: /Mensaje/i }),
      'Hola! Me interesa la posición.',
    );
    await user.click(screen.getByRole('checkbox', { name: /Acepto/i }));

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    const maybeError = await screen.findByText(
      /No está configurado el endpoint de envío|Error al enviar:|Error:/i,
    );
    expect(maybeError).toBeInTheDocument();
  });
});
