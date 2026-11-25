import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  projectCategories,
  projectsData,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  externalSelectedProject?: ProjectItem | null;
  onClearExternalProject?: () => void;
}

export function Projects({
  externalSelectedProject,
  onClearExternalProject,
}: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projectsData;
    return projectsData.filter((p) => p.filterCategory === activeCategory);
  }, [activeCategory]);

  const modalProject = externalSelectedProject || selectedProject;

  const handleCloseModal = () => {
    setSelectedProject(null);
    onClearExternalProject?.();
  };

  // Use 3 columns when viewing 3-card filtered sets (APPS or C) for zero orphan cards
  const gridColumnsClass =
    filteredProjects.length === 3
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter Bar */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[var(--accent-ink)] uppercase">
              02 · Featured Projects
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              Things I&apos;ve built.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Applications, robotics and embedded systems prototypes, research
              frameworks, and foundational C programs.
            </p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4"
          >
            {projectCategories.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[var(--accent-primary)] text-[#F4F7F6] shadow-sm'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/45'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Responsive Editorial Project Grid */}
        <div className={`mt-10 grid gap-6 ${gridColumnsClass}`}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Empty state safeguard */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 text-center">
            <p className="text-base font-medium text-[var(--text-primary)]">
              No projects found in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="mt-4 rounded-xl bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[#F4F7F6] cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal project={modalProject} onClose={handleCloseModal} />
    </section>
  );
}
