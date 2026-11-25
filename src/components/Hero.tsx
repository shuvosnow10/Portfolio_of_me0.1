import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Linkedin, MapPin, UserRound } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState(personalInfo.animatedRoles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoLoadError, setPhotoLoadError] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(personalInfo.animatedRoles.join(' / '));
      return;
    }

    const currentWord = personalInfo.animatedRoles[roleIndex];
    let timeoutId: number;

    if (!isDeleting && typedText === currentWord) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personalInfo.animatedRoles.length);
    } else {
      const delta = isDeleting ? 45 : 75;
      timeoutId = window.setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentWord.slice(0, typedText.length - 1)
            : currentWord.slice(0, typedText.length + 1)
        );
      }, delta);
    }

    return () => window.clearTimeout(timeoutId);
  }, [typedText, isDeleting, roleIndex, shouldReduceMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const hasCustomPhoto = Boolean(personalInfo.profileImageUrl) && !photoLoadError;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      {/* Restrained ambient teal atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-8%] h-[420px] w-[420px] rounded-full bg-[var(--accent-primary)]/12 blur-[120px] dark:bg-[var(--accent-primary)]/16"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT COLUMN: Editorial Typographic Composition */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Kicker & Availability */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--accent-ink)] uppercase">
                {personalInfo.heroKicker}
              </span>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-3.5 w-px bg-[var(--border-subtle)]"
              />
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--accent-highlight)]"
                />
                <span>{personalInfo.availabilityText}</span>
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-[var(--text-primary)] text-balance">
              Building{' '}
              <span className="text-[var(--accent-highlight)]">robots</span> and{' '}
              <span className="text-[var(--accent-highlight)]">apps</span> that
              solve real problems.
            </h1>

            {/* Name & Rotating Role */}
            <div className="space-y-1.5 pt-1">
              <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                {personalInfo.fullName}
              </p>
              <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-[var(--text-secondary)]">
                <span className="font-mono-tech text-[var(--accent-ink)]">
                  {typedText}
                </span>
                {!shouldReduceMotion && (
                  <span
                    aria-hidden="true"
                    className="inline-block h-4 w-[2px] animate-pulse bg-[var(--accent-highlight)]"
                  />
                )}
                <span className="sr-only">
                  {personalInfo.animatedRoles.join(', ')}
                </span>
              </div>
            </div>

            {/* Concise Introduction */}
            <p className="max-w-xl text-base sm:text-[17px] leading-relaxed text-[var(--text-secondary)]">
              {personalInfo.heroIntro}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--accent-primary)] px-6 py-3.5 text-sm font-semibold text-[#F4F7F6] shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-ink)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Connect</span>
              </button>
            </div>

            {/* Social Links & Institution */}
            <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-[var(--border-subtle)] max-w-xl">
              <div className="flex items-center gap-2.5">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Md. Ratul Hassan Shuvo on GitHub"
                  title="GitHub Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-ink)] transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Md. Ratul Hassan Shuvo on LinkedIn"
                  title="LinkedIn Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-ink)] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent-ink)] shrink-0" />
                <span>{personalInfo.universityFull}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Clean Editorial Portrait Frame (No decorative team labels or glowing clutter) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[380px]">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  {hasCustomPhoto ? (
                    <img
                      src={personalInfo.profileImageUrl!}
                      alt={personalInfo.profileImageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoLoadError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    /* Clean Replaceable Portrait Frame (Never generates a fake person) */
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center lab-grid-bg">
                      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--accent-primary)]/40 bg-[var(--bg-card)] shadow-sm">
                        <UserRound className="h-9 w-9 text-[var(--accent-ink)]" />
                      </div>
                      <p className="font-display text-base font-semibold text-[var(--text-primary)]">
                        {personalInfo.fullName}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {personalInfo.university} · {personalInfo.location}
                      </p>
                      <p className="mt-4 max-w-[230px] text-[11px] leading-relaxed text-[var(--text-secondary)]/85">
                        Replaceable portrait frame — add your photograph path to{' '}
                        <code className="font-mono-tech text-[var(--accent-ink)]">
                          profileImageUrl
                        </code>{' '}
                        in <code className="font-mono-tech">portfolio.ts</code>.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
