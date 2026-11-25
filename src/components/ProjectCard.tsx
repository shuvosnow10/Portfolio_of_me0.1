import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Cpu,
  ExternalLink,
  FlaskConical,
  Github,
  Smartphone,
  Terminal,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

function ProjectVisualFallback({ project }: { project: ProjectItem }) {
  const Icon =
    project.filterCategory === 'ROBOTICS'
      ? Cpu
      : project.filterCategory === 'APPS'
        ? Smartphone
        : project.filterCategory === 'RESEARCH'
          ? FlaskConical
          : Terminal;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#11191C] via-[#131D20] to-[#1B6E7A]/25 p-6 text-center lab-grid-bg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#5EEAD4]/30 bg-[#0B0F12]/70 text-[#5EEAD4]">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-mono-tech text-xs text-[#5EEAD4]">{project.number}</p>
        <p className="mt-0.5 font-display text-sm font-semibold text-[#F4F7F6]">
          {project.title}
        </p>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const renderVisual = () => {
    if (project.terminalPreview) {
      return (
        <div className="flex h-full w-full flex-col justify-between bg-[#0B0F12] p-5 text-[#F4F7F6] border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A4B3B2]">
              <Terminal className="h-3.5 w-3.5 text-[#5EEAD4]" />
              <span>{project.terminalPreview.filename}</span>
            </div>
            <span className="font-mono-tech text-[11px] text-[#5EEAD4]">C</span>
          </div>
          <pre className="my-auto overflow-x-auto py-2 font-mono-tech text-[11.5px] leading-relaxed text-[#A4B3B2]">
            <code>
              {project.terminalPreview.lines.map((line, i) => (
                <span key={i} className="block whitespace-pre">
                  <span className="mr-3 select-none text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#F4F7F6]/90">{line}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      );
    }

    if (project.imageUrl && !imgError) {
      return (
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      );
    }

    return <ProjectVisualFallback project={project} />;
  };

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/55 hover:shadow-xl"
    >
      <div>
        {/* Consistent 4:3 Visual Container across all projects */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-secondary)]">
          {renderVisual()}
        </div>

        <div className="p-6 space-y-3">
          {/* Clean Unboxed Editorial Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span className="font-mono-tech font-semibold text-[var(--accent-ink)]">
              {project.number}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[var(--text-primary)]">
              {project.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h3>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 space-y-4">
        <p className="font-mono-tech text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-3">
          {project.technologies.join(' · ')}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                title="Open GitHub repository"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-ink)] transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(project)}
                aria-label={`${project.title} GitHub link details`}
                title="Repository URL configurable in portfolio.ts"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 text-[var(--text-secondary)]/65 hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <Github className="h-4 w-4" />
              </button>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
                title="Open live demo"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-ink)] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(project)}
                aria-label={`${project.title} overview`}
                title="Inspect project details"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 text-[var(--text-secondary)]/65 hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-primary)]/12 px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-primary)] hover:text-[#F4F7F6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
