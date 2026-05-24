import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { about } from '../../data/about';
import { ContactPage } from '../ContactPage';

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}));

const EMAILJS_ENV_KEYS = [
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY',
] as const;

type EmailJsEnvKey = (typeof EMAILJS_ENV_KEYS)[number];

let emailJsEnvSnapshot: Partial<Record<EmailJsEnvKey, string | undefined>> = {};

const setEmailJsEnv = (values: Record<EmailJsEnvKey, string>) => {
  const env = import.meta.env as Record<string, string | undefined>;
  EMAILJS_ENV_KEYS.forEach((key) => {
    env[key] = values[key];
  });
};

const snapshotEmailJsEnv = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  emailJsEnvSnapshot = EMAILJS_ENV_KEYS.reduce<Partial<Record<EmailJsEnvKey, string | undefined>>>(
    (acc, key) => {
      acc[key] = env[key];
      return acc;
    },
    {},
  );
};

const restoreEmailJsEnv = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  EMAILJS_ENV_KEYS.forEach((key) => {
    const value = emailJsEnvSnapshot[key];
    if (typeof value === 'undefined') {
      delete env[key];
      return;
    }
    env[key] = value;
  });
};

vi.mock('@emailjs/browser', () => ({
  send: sendMock,
  default: {
    send: sendMock,
  },
}));

describe('ContactPage', () => {
  beforeEach(() => {
    sendMock.mockReset();
    snapshotEmailJsEnv();
    setEmailJsEnv({
      VITE_EMAILJS_SERVICE_ID: 'service_vtd7man',
      VITE_EMAILJS_TEMPLATE_ID: 'template_hcpsn6c',
      VITE_EMAILJS_PUBLIC_KEY: 'mjHKDsM12bd6FN0x7',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    restoreEmailJsEnv();
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

    expect(
      screen.getByRole('heading', { name: /quiero sumarme a un equipo y construir algo preciso/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/busco sumarme a un equipo/i)).toBeInTheDocument();
    expect(screen.getByText(/available for work|disponible para sumarme a un equipo/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(about.email, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/global \/ remote \(gmt-3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/respuesta en 24 h|24h response time/i)).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /Nombre completo/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Asunto/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Mensaje/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar mensaje/i })).toBeInTheDocument();
  });

  it('muestra errores de validación al enviar vacío y no llama a EmailJS', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(
      await screen.findByText(/El nombre debe tener al menos 2 caracteres/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/El asunto debe tener al menos 4 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/El mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument();

    expect(sendMock).not.toHaveBeenCalled();
  });

  it('simula envío exitoso con EmailJS y maneja la respuesta', async () => {
    const user = userEvent.setup();

    sendMock.mockResolvedValue({
      status: 200,
      text: 'OK',
    });

    render(<ContactPage />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(sendMock).toHaveBeenCalledWith(
      'service_vtd7man',
      'template_hcpsn6c',
      expect.objectContaining({
        name: 'Ezequiel',
        email: 'ezefernandezyf@example.com',
        subject: 'Oferta',
        message: 'Hola! Me interesa la posición.',
      }),
      { publicKey: 'mjHKDsM12bd6FN0x7' },
    );
    expect(await screen.findByText(/Gracias — tu mensaje fue enviado/i)).toBeInTheDocument();
  });

  it('simula fallo de envío con EmailJS y muestra error', async () => {
    const user = userEvent.setup();

    sendMock.mockRejectedValue(new Error('Server error'));

    render(<ContactPage />);

    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/Error al enviar:|Error:/i)).toBeInTheDocument();
  });

  it('muestra error genérico si EmailJS falla con un valor no Error', async () => {
    const user = userEvent.setup();
    sendMock.mockRejectedValue('boom');

    render(<ContactPage />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/No se pudo enviar el mensaje/i)).toBeInTheDocument();
  });
});
