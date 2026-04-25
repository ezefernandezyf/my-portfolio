import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactPage } from '../ContactPage';
import { about } from '../../data/about';

describe('ContactPage', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock as unknown);
    (globalThis as { __CONTACT_FORM_ENDPOINT__?: string }).__CONTACT_FORM_ENDPOINT__ =
      'https://api.example.com/contact';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete (globalThis as { __CONTACT_FORM_ENDPOINT__?: string }).__CONTACT_FORM_ENDPOINT__;
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByRole('textbox', { name: /Nombre completo/i }), 'Ezequiel');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'ezefernandezyf@example.com');
    await user.type(screen.getByRole('textbox', { name: /Asunto/i }), 'Oferta');
    await user.type(
      screen.getByRole('textbox', { name: /Mensaje/i }),
      'Hola! Me interesa la posición.',
    );
  };

  it('renderiza la estructura principal del contacto', () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading', { name: /construyamos algo preciso/i })).toBeInTheDocument();
    expect(screen.getByText(/traduzco requisitos complejos/i)).toBeInTheDocument();
    expect(screen.getByText(/available for work|disponible para trabajar/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(about.email, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/global \/ remote \(gmt-3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/respuesta en 24 h|24h response time/i)).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /Nombre completo/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Asunto/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Mensaje/i })).toBeInTheDocument();
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
    expect(screen.getByText(/El asunto debe tener al menos 4 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/El mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('simula envío exitoso (mock) y maneja la respuesta', async () => {
    const user = userEvent.setup();

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<ContactPage />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/Gracias — tu mensaje fue enviado/i)).toBeInTheDocument();
  });

  it('simula fallo de envío (mock) y muestra error', async () => {
    const user = userEvent.setup();

    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });

    render(<ContactPage />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/Error al enviar:|Error:/i)).toBeInTheDocument();
  });

  it('muestra error genérico si el submit falla con un valor no Error', async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue('boom');

    render(<ContactPage />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/No se pudo enviar el mensaje/i)).toBeInTheDocument();
  });
});
