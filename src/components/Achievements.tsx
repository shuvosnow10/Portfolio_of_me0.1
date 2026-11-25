import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Presentation } from 'lucide-react';
import { achievementsData, projectsData, type ProjectItem } from '../data/portfolio';

interface AchievementsProps {
  onOpenProject: (project: ProjectItem) => void;
}

export function Achievements({ onOpenProject }: AchievementsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { heading, primaryMilestone } = achievementsData;

  const handleInspectConcept = (projectId: string) => {
    const match = projectsData.find((p) => p.id === projectId);
    if (match) {
      onOpenProject(match);
    }
  };

  return (
    <section
      id="achievements"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/45"
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
            06 · Achievements
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
            {heading}
          </h2>
        </motion.div>

        {/* Editorial Achievement Card */}
        <motion.article
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Milestone Header */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--accent-highlight)]/30 bg-[var(--accent-primary)]/15 text-[var(--accent-ink)]">
                <Presentation className="h-6 w-6" />
              </div>

              <div className="space-y-2">
                <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[var(--accent-ink)]">
                  {primaryMilestone.role}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
                  {primaryMilestone.event}
                </h3>
              </div>

              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                {primaryMilestone.description}
              </p>
            </div>

            {/* Presented Engineering Concepts */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Presented Engineering Concepts
              </p>

              <div className="space-y-3">
                {primaryMilestone.presentedConcepts.map((concept, idx) => (
                  <button
                    key={concept.projectId}
                    type="button"
                    onClick={() => handleInspectConcept(concept.projectId)}
                    className="group flex w-full items-start justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 p-5 text-left transition-all hover:border-[var(--accent-highlight)]/60 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--accent-ink)]">
                        <span>Concept 0{idx + 1}</span>
                      </div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-ink)] transition-colors">
                        {concept.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                        {concept.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-highlight)] shrink-0 mt-1 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
