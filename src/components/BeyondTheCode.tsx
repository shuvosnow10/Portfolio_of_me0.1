import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Compass } from 'lucide-react';
import { beyondTheCodeData, type BeyondInterestItem } from '../data/portfolio';

function BeyondCard({
  item,
  index,
}: {
  item: BeyondInterestItem;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/55 hover:shadow-xl"
    >
      {/* Editorial 4:3 Photography Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-secondary)]">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#11191C] to-[#1B6E7A]/20 p-6 text-center lab-grid-bg">
            <Compass className="h-7 w-7 text-[var(--accent-highlight)]" />
            <p className="font-display text-sm font-semibold text-[#F4F7F6]">
              {item.kicker}
            </p>
          </div>
        )}
      </div>

      {/* Minimal Editorial Copy */}
      <div className="p-6 sm:p-7 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-mono-tech font-semibold uppercase tracking-wider text-[var(--accent-ink)]">
            {item.kicker}
          </span>
          <span className="font-mono-tech text-[var(--text-secondary)]">
            {item.focusTag}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)]">
          {item.title}
        </h3>

        <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export function BeyondTheCode() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="beyond-the-code"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/45"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-6 space-y-3">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              07 · Personal Interests
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              {beyondTheCodeData.heading}
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {beyondTheCodeData.subtitle}
            </p>
          </div>
        </motion.div>

        {/* 2x2 Editorial Lifestyle Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {beyondTheCodeData.items.map((item, index) => (
            <BeyondCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
