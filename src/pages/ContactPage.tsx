import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { MetaTags } from '../components';
import { about } from '../data/about';
import { useTranslation } from 'react-i18next';

const pageVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ContactPage = (): React.JSX.Element => {
  const { t } = useTranslation('contact');

  const contactSchema = z.object({
    name: z.string().min(2, t('form.name.validation_min')),
    email: z.string().email(t('form.email.validation')),
    subject: z.string().min(4, t('form.subject.validation_min')),
    message: z.string().min(10, t('form.message.validation_min')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const getEndpoint = () => {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    const envEndpoint = meta.env?.VITE_CONTACT_FORM_ENDPOINT;
    const globalEndpoint = (globalThis as { __CONTACT_FORM_ENDPOINT__?: string })
      .__CONTACT_FORM_ENDPOINT__;
    return envEndpoint ?? globalEndpoint;
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

    const endpoint = getEndpoint();
    if (!endpoint) {
      setErrorMessage(t('errors.no_endpoint'));
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
      setErrorMessage(err instanceof Error ? err.message : t('errors.send_failed'));
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
      <motion.main
        role="main"
        className="pb-24 pt-24"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
            <motion.section className="lg:col-span-5 flex flex-col justify-between" variants={riseVariants}>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-high px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                    {t('hero.label')}
                  </span>
                </div>

                <h1
                  className="font-headline text-5xl font-bold leading-none tracking-tighter text-on-surface md:text-7xl"
                  aria-label={t('hero.titleAccessible')}
                >
                  <span className="block">{t('hero.titleLine1')}</span>
                  <span className="block">{t('hero.titleLine2')}</span>
                  <span className="block text-primary">{t('hero.titleAccent')}</span>
                </h1>

                <p className="max-w-[40ch] text-lg leading-relaxed text-on-surface-variant">
                  {t('hero.description')}
                </p>
              </div>

              <div className="mt-16 space-y-6">
                <div className="space-y-4 rounded-lg border border-outline-variant/10 bg-surface-container-low p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-container-lowest">
                      <EnvelopeIcon className="h-5 w-5 text-primary-fixed" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant">
                        {t('hero.emailLabel')}
                      </p>
                      <a
                        className="text-base font-medium text-on-surface"
                        href={`mailto:${about.email}`}
                      >
                        {about.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-container-lowest">
                      <MapPinIcon className="h-5 w-5 text-primary-fixed" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant">
                        {t('hero.locationLabel')}
                      </p>
                      <p className="text-base font-medium text-on-surface">{t('hero.locationValue')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section className="relative lg:col-span-7" variants={riseVariants}>
              <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-primary-fixed/5 blur-3xl" />

              <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm md:p-12">
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="font-label block text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant"
                      >
                        {t('form.name.label')}
                      </label>
                      <input
                        id="name"
                        {...register('name')}
                        className="min-h-[44px] w-full rounded border-none bg-surface-container-low px-4 py-3 text-on-surface placeholder:text-outline/50 transition-all focus:ring-0"
                        placeholder={t('form.name.placeholder')}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1 text-xs text-error">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="font-label block text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant"
                      >
                        {t('form.email.label')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="min-h-[44px] w-full rounded border-none bg-surface-container-low px-4 py-3 text-on-surface placeholder:text-outline/50 transition-all focus:ring-0"
                        placeholder={t('form.email.placeholder')}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1 text-xs text-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="font-label block text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant"
                    >
                      {t('form.subject.label')}
                      <span className="ml-2 font-normal lowercase tracking-normal text-outline italic">
                        {t('form.subject.helper')}
                      </span>
                    </label>
                    <input
                      id="subject"
                      {...register('subject')}
                      className="min-h-[44px] w-full rounded border-none bg-surface-container-low px-4 py-3 text-on-surface placeholder:text-outline/50 transition-all focus:ring-0"
                      placeholder={t('form.subject.placeholder')}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p role="alert" className="mt-1 text-xs text-error">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-label block text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant"
                    >
                      {t('form.message.label')}
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className="min-h-30 w-full resize-none rounded border-none bg-surface-container-low px-4 py-3 text-on-surface placeholder:text-outline/50 transition-all focus:ring-0"
                      placeholder={t('form.message.placeholder')}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1 text-xs text-error">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-primary px-10 py-3 text-sm font-bold tracking-tight text-on-primary transition-colors hover:bg-primary-fixed md:w-auto"
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
                    <p role="status" className="text-sm text-success">
                      {t('status.success')}
                    </p>
                  )}
                  {status === 'error' && errorMessage && (
                    <p role="alert" className="text-sm text-error">
                      {t('status.error_prefix')} {errorMessage}
                    </p>
                  )}
                </form>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="font-label flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant">
                  <ClockIcon className="h-4 w-4" aria-hidden="true" />
                  {t('hero.responseTime')}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.main>
    </>
  );
};
