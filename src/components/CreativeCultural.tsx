import { motion, useReducedMotion } from 'motion/react';
import { Clapperboard, ExternalLink, Play } from 'lucide-react';
import { creativeActivitiesData } from '../data/portfolio';

export function CreativeCultural() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="creative-activities"
      className="relative py-16 sm:py-20 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              Creative &amp; Cultural
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              {creativeActivitiesData.heading}
            </h2>
          </div>

          <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm transition-colors hover:border-[var(--accent-primary)]/50">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--accent-highlight)]/30 bg-[var(--accent-primary)]/14 text-[var(--accent-ink)] shrink-0 mt-0.5">
                  <Clapperboard className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="font-mono-tech font-medium text-[var(--accent-ink)]">
                      {creativeActivitiesData.featured.role}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{creativeActivitiesData.featured.context}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {creativeActivitiesData.featured.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    {creativeActivitiesData.featured.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={creativeActivitiesData.featured.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[#F4F7F6] shadow-sm hover:opacity-95 active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>{creativeActivitiesData.featured.ctaLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-85" />
                </a>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
