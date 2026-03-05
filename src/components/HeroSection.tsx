import { locales } from '@/lib/locales';
import { motion } from 'framer-motion';

export type HeroState = 'loading' | 'success' | 'empty' | 'error';

interface HeroSectionProps {
  state?: HeroState;
}

const HeroSection = ({ state = 'success' }: HeroSectionProps) => {
  if (state === 'loading') {
    return (
      <section className="text-center" style={{ paddingBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}>
        <div className="mx-auto h-10 sm:h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
        <div className="mx-auto mt-3 sm:mt-4 h-5 sm:h-6 w-2/3 sm:w-1/2 animate-pulse rounded-lg bg-muted" />
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="text-center py-6 sm:py-8">
        <p className="text-destructive">Failed to load hero content.</p>
      </section>
    );
  }

  if (state === 'empty') return null;

  return (
    <section className="text-center" style={{ paddingBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {locales.heroTitle}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto max-w-2xl font-body text-sm font-light text-muted-foreground sm:text-base lg:text-lg"
        style={{ marginTop: 'clamp(0.5rem, 1vh, 1.25rem)' }}
      >
        {locales.heroSubtitle}
      </motion.h2>
    </section>
  );
};

export default HeroSection;
