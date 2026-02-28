import { Lang, locales } from '@/lib/locales';
import { motion } from 'framer-motion';

/* ── MOCK DATA ── */
const MOCK_DATA = {
  title: (lang: Lang) => locales.heroTitle[lang],
  subtitle: (lang: Lang) => locales.heroSubtitle[lang],
};

/* ── State Machine ── */
export type HeroState = 'loading' | 'success' | 'empty' | 'error';

interface HeroSectionProps {
  lang: Lang;
  state?: HeroState;
}

const HeroSection = ({ lang, state = 'success' }: HeroSectionProps) => {
  if (state === 'loading') {
    return (
      <section className="text-center" style={{ paddingBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}>
        <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
        <div className="mx-auto mt-4 h-6 w-1/2 animate-pulse rounded-lg bg-muted" />
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="text-center py-8">
        <p className="text-destructive">Failed to load hero content.</p>
      </section>
    );
  }

  if (state === 'empty') {
    return null;
  }

  return (
    <section className="text-center" style={{ paddingBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {MOCK_DATA.title(lang)}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto max-w-2xl font-body text-base font-light text-muted-foreground sm:text-lg"
        style={{ marginTop: 'clamp(0.5rem, 1vh, 1.25rem)' }}
      >
        {MOCK_DATA.subtitle(lang)}
      </motion.h2>
    </section>
  );
};

export default HeroSection;
