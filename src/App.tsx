import { useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Volunteering } from './components/Volunteering';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { BeyondTheCode } from './components/BeyondTheCode';
import { CreativeCultural } from './components/CreativeCultural';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import type { ProjectItem } from './data/portfolio';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(
    () => [
      'about',
      'projects',
      'experience',
      'volunteering',
      'skills',
      'achievements',
      'beyond-the-code',
      'contact',
    ],
    []
  );
  const activeSection = useActiveSection(sectionIds);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [achievementProject, setAchievementProject] = useState<ProjectItem | null>(
    null
  );

  // Map sub-sections cleanly to top-bar anchor highlights
  const highlightedNavSection =
    activeSection === 'volunteering' ? 'experience' : activeSection;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] lab-grid-bg">
        {/* Subtle texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 lab-grain"
        />

        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#F4F7F6]"
        >
          Skip to main content
        </a>

        {/* Sticky Navigation */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={highlightedNavSection}
          onOpenCv={() => setCvModalOpen(true)}
        />

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          {/* Hero */}
          <Hero />

          {/* About Me */}
          <About />

          {/* Featured Projects */}
          <Projects
            externalSelectedProject={achievementProject}
            onClearExternalProject={() => setAchievementProject(null)}
          />

          {/* Experience & Education */}
          <Timeline />

          {/* Volunteering & Community Involvement */}
          <Volunteering />

          {/* Technical Skills */}
          <Skills />

          {/* Achievements */}
          <Achievements onOpenProject={setAchievementProject} />

          {/* Beyond the Code — Personal Interests */}
          <BeyondTheCode />

          {/* Creative & Cultural Activities */}
          <CreativeCultural />

          {/* Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Built-in CV Preview / Print / Download Modal */}
        <CvModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
      </div>
    </MotionConfig>
  );
}
