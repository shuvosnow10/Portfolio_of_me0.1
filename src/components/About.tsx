import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Quote } from 'lucide-react';
import { aboutData, personalInfo } from '../data/portfolio';

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    setDisplayValue(0);
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/45"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Section Label & Heading */}
          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              01 · About
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              {aboutData.heading}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {personalInfo.university} · {personalInfo.location}
            </p>
          </div>

          {/* Narrative + Personal Statement + Interests */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-[var(--text-secondary)]">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Clean Typographic Focus List */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                What Shapes My Work &amp; Life
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-[var(--text-primary)]">
                {aboutData.interests.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span>{item}</span>
                    {idx < aboutData.interests.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-[var(--accent-ink)]"
                      >
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Statement Card */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <Quote
                  aria-hidden="true"
                  className="h-5 w-5 text-[var(--accent-ink)] shrink-0 mt-0.5"
                />
                <p className="font-display text-base sm:text-lg font-medium leading-relaxed text-[var(--text-primary)]">
                  &ldquo;{aboutData.personalStatement}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Statistics Row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {aboutData.stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 transition-colors hover:border-[var(--accent-primary)]/50"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--accent-ink)]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
                {stat.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
