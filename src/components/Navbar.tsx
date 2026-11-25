import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolio';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
  onOpenCv: () => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  activeSection,
  onOpenCv,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const handleCvAction = () => {
    setMobileMenuOpen(false);
    if (personalInfo.cvUrl) {
      const a = document.createElement('a');
      a.href = personalInfo.cvUrl;
      a.download = `${personalInfo.preferredName}_CV.pdf`;
      a.click();
    } else {
      onOpenCv();
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 no-print ${
          scrolled
            ? 'bg-[var(--surface-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            }}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:rounded-md"
            aria-label="Md. Ratul Hassan Shuvo — Back to top"
          >
            {personalInfo.logoText}
            <span className="text-[var(--accent-ink)]">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[var(--accent-ink)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent-highlight)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-[var(--accent-ink)]" />
              ) : (
                <Moon className="h-4 w-4 text-[var(--accent-primary)]" />
              )}
            </button>

            <button
              type="button"
              onClick={handleCvAction}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#F4F7F6] hover:opacity-95 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download CV</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 text-[var(--text-primary)] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/95 backdrop-blur-xl px-4 py-6 md:hidden shadow-xl no-print"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="text-xs font-mono-tech text-[var(--accent-highlight)]">
                        Active
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={handleCvAction}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-3 text-sm font-semibold text-[#F4F7F6] cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
