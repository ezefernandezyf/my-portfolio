import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MetaTags } from '../components';
import { useTranslation } from 'react-i18next';

export const ContactPage = (): React.JSX.Element => {
  const { t } = useTranslation('contact');

  const contactSchema = z.object({
    name: z.string().min(2, t('contact.form.name.validation_min')),
    email: z.email(t('contact.form.email.validation')),
    subject: z.string().min(4, t('contact.form.subject.validation_min')),
    message: z.string().min(10, t('contact.form.message.validation_min')),
    consent: z
      .boolean()
      .refine((val) => val === true, { message: t('contact.form.consent.validation') }),
  });
  type ContactFormData = z.infer<typeof contactSchema>;

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

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
      setErrorMessage(t('contact.errors.no_endpoint'));
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
      setErrorMessage(err instanceof Error ? err.message : t('contact.errors.send_failed'));
      setStatus('error');
    }
  };

  return (
    <>
      <MetaTags
        title={t('meta.contact.title')}
        description={t('meta.contact.description')}
        pathname="/contact"
        type="article"
      />
      <main className="site-container pb-12 pt-8">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-3xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">{t('contact.title')}</h1>
            <p className="text-sm text-muted mt-2">{t('contact.intro')}</p>
          </header>

          <section>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  {t('contact.form.name.label')}
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="input w-full"
                  placeholder={t('contact.form.name.placeholder')}
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
                  {t('contact.form.email.label')}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="input w-full"
                  placeholder={t('contact.form.email.placeholder')}
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
                  {t('contact.form.subject.label')}
                </label>
                <input
                  id="subject"
                  {...register('subject')}
                  className="input w-full"
                  placeholder={t('contact.form.subject.placeholder')}
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
                  {t('contact.form.message.label')}
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className="textarea w-full"
                  placeholder={t('contact.form.message.placeholder')}
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
                  {t('contact.form.consent.label')}
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
                  {status === 'sending'
                    ? t('contact.form.submit.sending')
                    : t('contact.form.submit.default')}
                </button>
              </div>

              {status === 'success' && (
                <p role="status" className="text-sm text-success">
                  {t('contact.status.success')}
                </p>
              )}
              {status === 'error' && errorMessage && (
                <p role="alert" className="text-sm text-error">
                  {t('contact.status.error_prefix')} {errorMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </main>
    </>
  );
};
