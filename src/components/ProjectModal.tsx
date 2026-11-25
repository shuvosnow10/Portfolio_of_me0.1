import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, ExternalLink, Github, Info, Terminal, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F12]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl"
          >
            {/* Header Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] px-6 py-5">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="font-mono-tech font-semibold text-[var(--accent-ink)]">
                    Project {project.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {project.status}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]"
                >
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent-highlight)] transition-colors shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* Visual Preview */}
              {project.terminalPreview ? (
                <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0B0F12] p-5 text-[#F4F7F6]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono-tech text-[#A4B3B2]">
                    <span className="inline-flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[#5EEAD4]" />
                      {project.terminalPreview.filename}
                    </span>
                    <span className="text-[#5EEAD4]">C Source Overview</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto font-mono-tech text-xs sm:text-sm leading-relaxed">
                    <code>
                      {project.terminalPreview.lines.map((line, idx) => (
                        <span key={idx} className="block whitespace-pre">
                          <span className="mr-4 select-none text-white/30">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span>{line}</span>
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              ) : (
                project.imageUrl &&
                !imgError && (
                  <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] aspect-[16/10]">
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )
              )}

              {/* Role & Overview */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-ink)]">
                  Role — {project.role}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {project.fullDescription}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-3">
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Key Highlights
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 p-3 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent-ink)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Technologies &amp; Concepts
                </h4>
                <p className="font-mono-tech text-sm text-[var(--text-secondary)]">
                  {project.technologies.join(' · ')}
                </p>
              </div>

              {/* Honest Link Status Notice when URLs are not yet supplied */}
              {(!project.githubUrl || !project.demoUrl) && (
                <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 p-4 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <Info className="h-4 w-4 text-[var(--accent-highlight)] shrink-0 mt-0.5" />
                  <p>
                    Repository and deployment URLs are configurable per project in{' '}
                    <code className="font-mono-tech text-[var(--text-primary)]">
                      src/data/portfolio.ts
                    </code>
                    . Only verified links are shown to avoid placeholder or fabricated demos.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-6 py-4 bg-[var(--bg-secondary)]/50">
              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-highlight)] transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] px-4 py-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    <Github className="h-4 w-4" />
                    <span>Repository Link Pending</span>
                  </span>
                )}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-2 text-xs sm:text-sm font-semibold text-[#F4F7F6] hover:opacity-95 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Live Demo</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] px-4 py-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    <ExternalLink className="h-4 w-4" />
                    <span>{project.status}</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-highlight)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
