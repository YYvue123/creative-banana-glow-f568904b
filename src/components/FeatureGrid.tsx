import { featureLocales, locales } from '@/lib/locales';
import { motion } from 'framer-motion';
import { Plug, Layers, Download, Paintbrush } from 'lucide-react';

import featApi from '@/assets/feat-api.jpg';
import featModels from '@/assets/feat-models.jpg';
import featExport from '@/assets/feat-export.jpg';
import featStyle from '@/assets/feat-style.jpg';

const iconMap: Record<string, React.ElementType> = { Plug, Layers, Download, Paintbrush };

const MOCK_DATA = {
  rows: [
    { icon: 'Plug', nameKey: 'feat_api', descKey: 'feat_api_desc', image: featApi, alt: 'Nano Banana 2 API integration workflow dashboard' },
    { icon: 'Layers', nameKey: 'feat_multi', descKey: 'feat_multi_desc', image: featModels, alt: 'Nano Banana 2 multi-model AI image outputs' },
    { icon: 'Download', nameKey: 'feat_export', descKey: 'feat_export_desc', image: featExport, alt: 'Nano Banana 2 bulk image export interface' },
    { icon: 'Paintbrush', nameKey: 'feat_style', descKey: 'feat_style_desc', image: featStyle, alt: 'Nano Banana 2 style fine-tuning controls' },
  ],
};

export type FeatureGridState = 'loading' | 'success' | 'empty' | 'error';

interface FeatureGridProps {
  state?: FeatureGridState;
}

/** @slot Navigate to generation page */
const handleTryNow = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const FeatureGrid = ({ state = 'success' }: FeatureGridProps) => {
  if (state === 'loading') {
    return (
      <section className="container mx-auto space-y-12 sm:space-y-20 px-4 py-12 sm:py-20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:gap-16">
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted" />
              <div className="h-20 w-full animate-pulse rounded-lg bg-muted" />
            </div>
            <div className="flex-1">
              <div className="aspect-video w-full animate-pulse rounded-2xl sm:rounded-[2rem] bg-muted" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <p className="text-destructive">Failed to load features.</p>
      </section>
    );
  }

  if (state === 'empty') return null;

  return (
    <section className="container mx-auto space-y-12 sm:space-y-20 px-4 py-12 sm:py-20">
      {MOCK_DATA.rows.map((row, idx) => {
        const Icon = iconMap[row.icon];
        const reversed = idx % 2 === 1;

        const textBlock = (
          <motion.div
            key={`text-${idx}`}
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-1 flex-col justify-center"
          >
            {idx > 3 && (
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <h3 className="mb-3 font-display text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
              {featureLocales[row.nameKey]}
            </h3>
            <p className="mb-6 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
              {featureLocales[row.descKey]}
            </p>
            <div>
              <button
                onClick={handleTryNow}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:bg-primary/80 active:scale-95"
              >
                {locales.generateNow}
              </button>
            </div>
          </motion.div>
        );

        const imageBlock = (
          <motion.div
            key={`img-${idx}`}
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] bg-card p-2 sm:p-3 shadow-2xl">
              <img
                src={row.image}
                alt={row.alt}
                className="w-full rounded-xl sm:rounded-[1.5rem] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        );

        return (
          <div
            key={idx}
            className={`flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:gap-16 ${
              reversed ? 'md:flex-row-reverse' : ''
            }`}
          >
            {textBlock}
            {imageBlock}
          </div>
        );
      })}
    </section>
  );
};

export default FeatureGrid;
