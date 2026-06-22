import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { MetaTags } from '../shared/seo';
import { about } from '../data/about';
import { useTranslation } from 'react-i18next';

function useSectionFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

export const ContactPage = (): React.JSX.Element => {
  const { t } = useTranslation('contact');

  const contactSchema = z.object({
    name: z.string().min(2, t('form.name.validation_min')),
    email: z.string().email(t('form.email.validation')),
    subject: z.string().min(4, t('form.subject.validation_min')),
    message: z.string().min(10, t('form.message.validation_min')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const getEmailJsConfig = () => {
    const env = import.meta.env;
    const serviceId = env.VITE_EMAILJS_SERVICE_ID;
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return null;
    }

    return { serviceId, templateId, publicKey };
  };

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
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    setErrorMessage(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      const emailJsConfig = getEmailJsConfig();

      if (!emailJsConfig) {
        setErrorMessage(t('errors.no_emailjs'));
        setStatus('error');
        return;
      }

      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, payload, {
        publicKey: emailJsConfig.publicKey,
      });

      setStatus('success');
      reset();
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage(err instanceof Error ? err.message : t('errors.send_failed'));
      setStatus('error');
    }
  };

  const [formRef, formVisible] = useSectionFadeIn();

  return (
    <>
      <MetaTags
        title={t('meta.contact.title')}
        description={t('meta.contact.description')}
        pathname="/contact"
        type="article"
      />
      <main role="main" className="pb-24 pt-24 bg-bg-primary">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
            <section className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary font-body">
                    {t('hero.label')}
                  </span>
                </div>

                <h1
                  className="text-5xl font-bold leading-none tracking-tighter text-text-primary md:text-7xl font-display"
                  aria-label={t('hero.titleAccessible')}
                >
                  <span className="block">{t('hero.titleLine1')}</span>
                  <span className="block">{t('hero.titleLine2')}</span>
                  <span className="block text-accent">{t('hero.titleAccent')}</span>
                </h1>

                <p className="max-w-[40ch] text-lg leading-relaxed text-text-secondary font-body">
                  {t('hero.description')}
                </p>
              </div>

              <div className="mt-16 space-y-6">
                <div className="space-y-4 rounded-lg border border-border bg-surface p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-elevated">
                      <EnvelopeIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-text-muted font-body">
                        {t('hero.emailLabel')}
                      </p>
                      <a
                        className="text-base font-medium text-text-primary font-body"
                        href={`mailto:${about.email}`}
                      >
                        {about.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-elevated">
                      <MapPinIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-text-muted font-body">
                        {t('hero.locationLabel')}
                      </p>
                      <p className="text-base font-medium text-text-primary font-body">{t('hero.locationValue')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative lg:col-span-7">
              <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

              <div ref={formRef} className={formVisible ? 'animate-fade-in-up' : 'opacity-0'}>
                <div className="rounded-xl border border-border bg-surface p-8 md:p-12">
                  <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-[11px] font-semibold uppercase tracking-widest text-text-secondary font-body"
                        >
                          {t('form.name.label')}
                        </label>
                        <input
                          id="name"
                          {...register('name')}
                          className={`min-h-[44px] w-full rounded border bg-surface-elevated px-4 py-3 text-text-primary placeholder:text-text-muted transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none ${errors.name ? 'border-red-500' : 'border-border'}`}
                          placeholder={t('form.name.placeholder')}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p role="alert" className="mt-1 text-xs text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-semibold uppercase tracking-widest text-text-secondary font-body"
                        >
                          {t('form.email.label')}
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={`min-h-[44px] w-full rounded border bg-surface-elevated px-4 py-3 text-text-primary placeholder:text-text-muted transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none ${errors.email ? 'border-red-500' : 'border-border'}`}
                          placeholder={t('form.email.placeholder')}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-[11px] font-semibold uppercase tracking-widest text-text-secondary font-body"
                      >
                        {t('form.subject.label')}
                        <span className="ml-2 font-normal lowercase tracking-normal text-text-muted italic">
                          {t('form.subject.helper')}
                        </span>
                      </label>
                      <input
                        id="subject"
                        {...register('subject')}
                        className={`min-h-[44px] w-full rounded border bg-surface-elevated px-4 py-3 text-text-primary placeholder:text-text-muted transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none ${errors.subject ? 'border-red-500' : 'border-border'}`}
                        placeholder={t('form.subject.placeholder')}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && (
                        <p role="alert" className="mt-1 text-xs text-red-500">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-[11px] font-semibold uppercase tracking-widest text-text-secondary font-body"
                      >
                        {t('form.message.label')}
                      </label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        className={`min-h-30 w-full resize-none rounded border bg-surface-elevated px-4 py-3 text-text-primary placeholder:text-text-muted transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none ${errors.message ? 'border-red-500' : 'border-border'}`}
                        placeholder={t('form.message.placeholder')}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p role="alert" className="mt-1 text-xs text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="group flex min-h-[44px] w-full items-center justify-center gap-2 bg-accent px-10 py-3 text-sm font-bold tracking-tight text-bg-primary transition-colors hover:bg-accent-hover focus-ring md:w-auto"
                        disabled={isSubmitting || status === 'sending'}
                        aria-busy={isSubmitting || status === 'sending'}
                      >
                        {status === 'sending' ? t('form.submit.sending') : t('form.submit.default')}
                        <PaperAirplaneIcon
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {status === 'success' && (
                      <p role="status" className="text-sm text-accent">
                        {t('status.success')}
                      </p>
                    )}
                    {status === 'error' && errorMessage && (
                      <p role="alert" className="text-sm text-red-500">
                        {t('status.error_prefix')} {errorMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-body">
                  <ClockIcon className="h-4 w-4" aria-hidden="true" />
                  {t('hero.responseTime')}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Expanded content section for SEO — crawler-accessible process description */}
        <section className="bg-surface py-24 mt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary font-display">
                {t('contentSection.heading')}
              </h2>
              <p className="text-base leading-relaxed text-text-secondary font-body">
                {t('contentSection.paragraph1')}
              </p>
              <p className="text-base leading-relaxed text-text-secondary font-body">
                {t('contentSection.paragraph2')}
              </p>
              <p className="text-base leading-relaxed text-text-secondary font-body">
                {t('contentSection.paragraph3')}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
