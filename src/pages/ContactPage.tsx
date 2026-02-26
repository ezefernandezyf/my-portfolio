import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MetaTags } from '../components';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email inválido'),
  subject: z.string().min(4, 'Asunto demasiado corto'),
  message: z.string().min(10, 'Mensaje demasiado corto'),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: 'Debes aceptar el consentimiento para enviar' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

export const ContactPage = (): React.JSX.Element => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    setErrorMessage(null);

    if (!endpoint) {
      setErrorMessage(
        'No está configurado el endpoint de envío. Revisa VITE_CONTACT_FORM_ENDPOINT.',
      );
      setStatus('error');
      return;
    }

    try {
      const payload = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = (body && (body.error || body.message)) || `Error ${res.status}`;
        throw new Error(String(msg));
      }

      setStatus('success');
      reset();
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Error al enviar');
      setStatus('error');
    }
  };

  return (
    <>
      <MetaTags
        title="Contacto"
        description="Contactame si creés que mi perfil encaja en tu equipo. Estoy disponible para roles Front-end."
        pathname="/contact"
        type="article"
      />
      <main className="site-container pb-12 pt-8">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-3xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">Contacto</h1>
            <p className="text-sm text-muted mt-2">
              Estoy buscando mi primera oportunidad profesional como Frontend Developer. Si creés
              que mi perfil puede encajar en tu equipo, podés contactarme por correo o rellenar el
              formulario abajo.
            </p>
          </header>

          <section>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="input w-full"
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p role="alert" className="text-xs text-error mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="input w-full"
                  placeholder="tu@ejemplo.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p role="alert" className="text-xs text-error mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Asunto
                </label>
                <input
                  id="subject"
                  {...register('subject')}
                  className="input w-full"
                  placeholder="Asunto del mensaje"
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p role="alert" className="text-xs text-error mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className="textarea w-full"
                  placeholder="Contame más sobre la oportunidad..."
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p role="alert" className="text-xs text-error mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  {...register('consent')}
                  className="checkbox mt-1"
                />
                <label htmlFor="consent" className="text-sm text-muted">
                  Acepto que mi mensaje sea enviado y almacenado temporalmente para responder.
                </label>
              </div>
              {errors.consent && (
                <p role="alert" className="text-xs text-error">
                  {errors.consent.message}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || status === 'sending'}
                  aria-busy={isSubmitting || status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>

              {status === 'success' && (
                <p role="status" className="text-sm text-success">
                  Gracias — tu mensaje fue enviado.
                </p>
              )}
              {status === 'error' && errorMessage && (
                <p role="alert" className="text-sm text-error">
                  Error: {errorMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </main>
    </>
  );
};
