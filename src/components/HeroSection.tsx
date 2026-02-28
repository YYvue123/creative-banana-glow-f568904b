import { Lang, locales } from '@/lib/locales';
import { motion } from 'framer-motion';

const HeroSection = ({ lang }: { lang: Lang }) => (
  <section className="text-left" style={{ paddingBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}>
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
    >
      {locales.heroTitle[lang]}
    </motion.h1>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="mx-auto max-w-2xl font-body text-base font-light text-muted-foreground sm:text-lg" style={{ marginTop: 'clamp(0.5rem, 1vh, 1.25rem)' }}
    >
      {locales.heroSubtitle[lang]}
    </motion.h2>
  </section>
);

export default HeroSection;
