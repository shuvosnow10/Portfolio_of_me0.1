import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { contactConfig, personalInfo, socialLinks } from '../data/portfolio';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'sent_emailjs' | 'opened_mailto' | 'error'
  >('idle');
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isEmailJsConfigured = Boolean(
    contactConfig.emailJs.serviceId &&
      contactConfig.emailJs.templateId &&
      contactConfig.emailJs.publicKey
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please write a short message (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    if (isEmailJsConfigured) {
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: contactConfig.emailJs.serviceId,
            template_id: contactConfig.emailJs.templateId,
            user_id: contactConfig.emailJs.publicKey,
            template_params: {
              from_name: name.trim(),
              reply_to: email.trim(),
              message: message.trim(),
              to_email: personalInfo.email,
            },
          }),
        });

        if (!res.ok) {
          throw new Error('Email service returned an error response.');
        }

        setStatus('sent_emailjs');
        setName('');
        setEmail('');
        setMessage('');
      } catch (err) {
        setStatus('error');
        setSubmitError(
          err instanceof Error
            ? err.message
            : 'Unable to send via EmailJS. Please email directly.'
        );
      }
      return;
    }

    // Honest mailto fallback when EmailJS credentials are not configured
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    );
    const mailtoHref = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoHref;
    setStatus('opened_mailto');
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3"
        >
          <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
            08 · Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
            {contactConfig.heading}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN: Friendly Intro + Direct Contact Cards */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {contactConfig.intro}
            </p>

            <div className="space-y-3">
              {/* Email Card with Copy Action */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5">
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-3.5 min-w-0 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)] shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-secondary)]">Email</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-highlight)] transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email address"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:text-[var(--accent-highlight)] hover:border-[var(--accent-highlight)]/50 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-[var(--accent-highlight)]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 transition-colors hover:border-[var(--accent-highlight)]/50 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)] shrink-0">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-secondary)]">LinkedIn</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-highlight)] transition-colors">
                    Md. Ratul Hassan Shuvo
                  </p>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 transition-colors hover:border-[var(--accent-highlight)]/50 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)] shrink-0">
                  <Github className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-secondary)]">GitHub</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-highlight)] transition-colors">
                    github.com
                  </p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-secondary)]">Location</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Validated Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-5 shadow-sm"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[var(--text-primary)]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-highlight)] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[var(--text-primary)]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-highlight)] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[var(--text-primary)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  placeholder="Tell me about your project, robotics collaboration, or internship opportunity..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  className="w-full resize-y rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-highlight)] focus:outline-none transition-colors"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Delivery Status Feedback */}
              {status === 'sent_emailjs' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-[var(--accent-highlight)]/40 bg-[var(--accent-primary)]/12 p-4 text-sm text-[var(--text-primary)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent-highlight)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message delivered</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Thanks for reaching out! Your message was sent directly to{' '}
                      {personalInfo.email}.
                    </p>
                  </div>
                </div>
              )}

              {status === 'opened_mailto' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-[var(--accent-highlight)]/40 bg-[var(--accent-primary)]/12 p-4 text-sm text-[var(--text-primary)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent-highlight)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Email draft prepared</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Your default mail app has been opened with a pre-filled draft
                      addressed to {personalInfo.email}. (Configure EmailJS keys in{' '}
                      <code className="font-mono-tech">src/data/portfolio.ts</code>{' '}
                      for direct one-click submission.)
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-400"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Could not send message</p>
                    <p className="text-xs mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="text-xs text-[var(--text-secondary)]">
                  {isEmailJsConfigured
                    ? 'Direct delivery active via EmailJS.'
                    : 'Opens your email client addressed to ratulhasan01715@gmail.com.'}
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 py-3.5 text-sm font-semibold text-[#F4F7F6] hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>
                        {isEmailJsConfigured ? 'Send Message' : 'Compose Email'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
