import { motion, useReducedMotion } from 'motion/react';
import { CalendarCheck, Compass, Handshake } from 'lucide-react';
import { volunteeringData } from '../data/portfolio';

function getPillarIcon(id: string) {
  if (id === 'university-volunteering') return CalendarCheck;
  if (id === 'external-volunteering') return Compass;
  return Handshake;
}

export function Volunteering() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="volunteering"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Visual connector linking from the Experience timeline above */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7 space-y-3">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              04 · Community &amp; Service
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              {volunteeringData.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {volunteeringData.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Refined 3-Column Editorial Volunteering Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {volunteeringData.pillars.map((pillar, index) => {
            const Icon = getPillarIcon(pillar.id);
            return (
              <motion.article
                key={pillar.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.08, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 transition-colors hover:border-[var(--accent-primary)]/55"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/14 text-[var(--accent-ink)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono-tech text-xs text-[var(--accent-ink)]">
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {pillar.description}
                  </p>
                </div>

                <p className="mt-6 pt-3.5 border-t border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-secondary)]">
                  {pillar.qualities.join(' · ')}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
