import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Clear active highlight near the very top hero
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      const offset = 160;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - offset;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          current = id;
          break;
        }
      }

      // If scrolled near page bottom, highlight last section
      if (
        !current &&
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80
      ) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
