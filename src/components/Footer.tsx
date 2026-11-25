import { useReducedMotion } from 'motion/react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { navLinks, personalInfo, socialLinks } from '../data/portfolio';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 py-12 no-print">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="space-y-1.5">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleBackToTop();
              }}
              className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {personalInfo.logoText}
              <span className="text-[var(--accent-highlight)]">.</span>
            </a>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {personalInfo.fullName} · {personalInfo.university}
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-highlight)] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials & Back-to-top */}
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-highlight)] hover:border-[var(--accent-highlight)]/50 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-highlight)] hover:border-[var(--accent-highlight)]/50 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-highlight)]/60 hover:text-[var(--accent-highlight)] transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          <p>Built with ❤️ in Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}
