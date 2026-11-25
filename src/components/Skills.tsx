import { motion, useReducedMotion } from 'motion/react';
import {
  Bluetooth,
  Braces,
  Code2,
  Cog,
  Compass,
  Cpu,
  Film,
  GitBranch,
  Handshake,
  Image as ImageIcon,
  Kanban,
  Layers,
  Lightbulb,
  Microchip,
  Mic,
  Radar,
  Smartphone,
  Terminal,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { skillGroups } from '../data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  terminal: Terminal,
  cpu: Cpu,
  smartphone: Smartphone,
  braces: Braces,
  'git-branch': GitBranch,
  'code-2': Code2,
  layers: Layers,
  wrench: Wrench,
  microchip: Microchip,
  radar: Radar,
  cog: Cog,
  bluetooth: Bluetooth,
  compass: Compass,
  users: Users,
  mic: Mic,
  kanban: Kanban,
  lightbulb: Lightbulb,
  handshake: Handshake,
  film: Film,
  image: ImageIcon,
};

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 border-t border-[var(--border-subtle)]"
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
            05 · Technical Skills
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
            My technical toolkit.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Languages, hardware platforms, developer environments, and human
            skills I rely on when taking ideas from prototype to working build.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.45,
                delay: Math.min(groupIndex * 0.06, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 ${
                group.id === 'professional' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {group.title}
                </h3>
                <span className="font-mono-tech text-xs text-[var(--accent-highlight)]">
                  0{groupIndex + 1}
                </span>
              </div>

              <div
                className={`mt-5 grid gap-3 ${
                  group.id === 'professional'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {group.items.map((item) => {
                  const Icon = iconMap[item.iconKey] || Terminal;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 px-3.5 py-3 transition-colors hover:border-[var(--accent-highlight)]/45"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)]/15 text-[var(--accent-highlight)] shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
