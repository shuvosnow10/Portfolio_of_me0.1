import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Award, GraduationCap, Megaphone, Users } from 'lucide-react';
import { timelineData, type TimelineEntry } from '../data/portfolio';

function getEntryIcon(entry: TimelineEntry) {
  if (entry.type === 'Education') return GraduationCap;
  if (entry.id === 'robo-tech-valley') return Megaphone;
  if (entry.id === 'rsvu') return Award;
  return Users;
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/45"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Sticky Editorial Intro */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 lg:self-start"
          >
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              03 · Experience &amp; Education
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              Leadership &amp; academic journey.
            </h2>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              Alongside undergraduate studies in Computer Science and
              Engineering, I take active organizational and ambassadorial roles
              across campus robotics and entrepreneurship initiatives.
            </p>
            <p className="text-xs font-mono-tech text-[var(--text-secondary)] pt-2">
              Leadership · Coordination · Collaboration
            </p>
          </motion.div>

          {/* Right Vertical Animated Timeline */}
          <div ref={containerRef} className="lg:col-span-8 relative pl-8 sm:pl-11">
            <div
              aria-hidden="true"
              className="absolute left-3.5 sm:left-4 top-2 bottom-4 w-px bg-[var(--border-subtle)]"
            />

            <motion.div
              aria-hidden="true"
              style={
                shouldReduceMotion
                  ? { scaleY: 1 }
                  : { scaleY: lineScaleY, originY: 0 }
              }
              className="absolute left-3.5 sm:left-4 top-2 bottom-4 w-px bg-gradient-to-b from-[var(--accent-highlight)] via-[var(--accent-primary)] to-[var(--accent-highlight)]"
            />

            <div className="space-y-6">
              {timelineData.map((entry, index) => {
                const Icon = getEntryIcon(entry);
                return (
                  <motion.article
                    key={entry.id}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.08, 0.25),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 transition-colors hover:border-[var(--accent-primary)]/50"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -left-[2.65rem] sm:-left-[3.05rem] top-7 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--accent-highlight)]/60 bg-[var(--bg-primary)] text-[var(--accent-ink)] shadow-sm"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="font-mono-tech font-medium text-[var(--accent-ink)]">
                        {entry.type}
                      </span>
                      <span className="font-mono-tech">{entry.period}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                      {entry.role}
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-base font-medium text-[var(--text-primary)]/85">
                      {entry.organization}
                      {entry.location ? (
                        <span className="text-[var(--text-secondary)] font-normal">
                          {' '}
                          · {entry.location}
                        </span>
                      ) : null}
                    </p>

                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                      {entry.description}
                    </p>

                    <p className="mt-4 pt-3 border-t border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-secondary)]">
                      {entry.focusAreas.join(' · ')}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
