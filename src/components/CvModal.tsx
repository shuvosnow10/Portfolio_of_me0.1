import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Download, Printer, X } from 'lucide-react';
import {
  achievementsData,
  personalInfo,
  projectsData,
  skillGroups,
  timelineData,
} from '../data/portfolio';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

export function CvModal({ open, onClose }: CvModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const handleDownloadTextCv = () => {
    const content = [
      `${personalInfo.fullName} (${personalInfo.preferredName})`,
      `${personalInfo.professionalIdentity}`,
      `${personalInfo.universityFull} | ${personalInfo.email}`,
      '',
      'EDUCATION & LEADERSHIP',
      ...timelineData.map(
        (t) => `- ${t.role} — ${t.organization} (${t.period}): ${t.description}`
      ),
      '',
      'SELECTED PROJECTS',
      ...projectsData.map(
        (p) =>
          `- [${p.number}] ${p.title} (${p.categoryLabel} · ${p.status}): ${p.shortDescription}`
      ),
      '',
      'TECHNICAL SKILLS',
      ...skillGroups.map(
        (g) => `- ${g.title}: ${g.items.map((i) => i.name).join(', ')}`
      ),
      '',
      'ACHIEVEMENTS',
      `- ${achievementsData.primaryMilestone.role} — ${achievementsData.primaryMilestone.event}`,
      `  ${achievementsData.primaryMilestone.description}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Md_Ratul_Hassan_Shuvo_CV.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F12]/80 backdrop-blur-sm no-print"
          />

          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-6 py-4 no-print">
              <div>
                <p className="font-mono-tech text-xs text-[var(--accent-ink)]">
                  Curriculum Vitae
                </p>
                <h3
                  id="cv-modal-title"
                  className="font-display text-lg font-bold text-[var(--text-primary)]"
                >
                  {personalInfo.fullName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-primary)] px-3.5 py-2 text-xs font-semibold text-[#F4F7F6] hover:opacity-95 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTextCv}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-highlight)] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .TXT</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-highlight)] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Formatted CV Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-[var(--text-secondary)]">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h4 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {personalInfo.fullName}
                </h4>
                <p className="mt-1 font-medium text-[var(--accent-ink)]">
                  {personalInfo.professionalIdentity}
                </p>
                <p className="mt-1 text-xs">
                  {personalInfo.universityFull} · {personalInfo.email}
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Education &amp; Leadership
                </h5>
                <div className="space-y-2.5">
                  {timelineData.map((item) => (
                    <div key={item.id}>
                      <div className="flex flex-wrap justify-between gap-2 font-semibold text-[var(--text-primary)]">
                        <span>
                          {item.role} — {item.organization}
                        </span>
                        <span className="font-mono-tech text-xs font-normal text-[var(--text-secondary)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Projects &amp; Research
                </h5>
                <div className="space-y-2">
                  {projectsData.map((p) => (
                    <div key={p.id}>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {p.number}. {p.title}{' '}
                        <span className="font-normal text-xs text-[var(--accent-highlight)]">
                          ({p.categoryLabel} · {p.status})
                        </span>
                      </p>
                      <p className="text-xs">{p.shortDescription}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Skills
                </h5>
                <div className="space-y-1 text-xs">
                  {skillGroups.map((g) => (
                    <p key={g.id}>
                      <strong className="text-[var(--text-primary)]">
                        {g.title}:
                      </strong>{' '}
                      {g.items.map((i) => i.name).join(', ')}
                    </p>
                  ))}
                </div>
              </div>

              <p className="pt-2 border-t border-[var(--border-subtle)] text-[11px] no-print">
                Tip: Add your static PDF path to{' '}
                <code className="font-mono-tech text-[var(--text-primary)]">
                  personalInfo.cvUrl
                </code>{' '}
                in{' '}
                <code className="font-mono-tech text-[var(--text-primary)]">
                  src/data/portfolio.ts
                </code>{' '}
                for direct PDF download.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
