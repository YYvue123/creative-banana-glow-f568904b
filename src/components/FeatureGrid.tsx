import { Lang, featureLocales, locales } from '@/lib/locales';
import { motion } from 'framer-motion';
import { Plug, Layers, Download, Paintbrush } from 'lucide-react';

import featApi from '@/assets/feat-api.jpg';
import featModels from '@/assets/feat-models.jpg';
import featExport from '@/assets/feat-export.jpg';
import featStyle from '@/assets/feat-style.jpg';

const iconMap: Record<string, React.ElementType> = { Plug, Layers, Download, Paintbrush };

const rows = [
  { icon: 'Plug', nameKey: 'feat_api', descKey: 'feat_api_desc', image: featApi, alt: 'Nano Banana 2 API integration workflow dashboard' },
  { icon: 'Layers', nameKey: 'feat_multi', descKey: 'feat_multi_desc', image: featModels, alt: 'Nano Banana 2 multi-model AI image outputs' },
  { icon: 'Download', nameKey: 'feat_export', descKey: 'feat_export_desc', image: featExport, alt: 'Nano Banana 2 bulk image export interface' },
  { icon: 'Paintbrush', nameKey: 'feat_style', descKey: 'feat_style_desc', image: featStyle, alt: 'Nano Banana 2 style fine-tuning controls' },
];

const FeatureGrid = ({ lang }: { lang: Lang }) => (
  <section className="container mx-auto space-y-20 px-4 py-20">
    {rows.map((row, idx) => {
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
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Icon className="h-5 w-5 text-primary-deep" />
          </div>
          <h3 className="mb-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {featureLocales[row.nameKey][lang]}
          </h3>
          <p className="mb-6 max-w-md leading-relaxed text-muted-foreground">
            {featureLocales[row.descKey][lang]}
          </p>
          <div>
            <button className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80">
              {locales.generateNow[lang]}
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
          <div className="overflow-hidden rounded-[2rem] bg-card p-3 shadow-2xl">
            <img
              src={row.image}
              alt={row.alt}
              className="w-full rounded-[1.5rem] object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      );

      return (
        <div
          key={idx}
          className={`flex flex-col items-center gap-10 md:flex-row md:gap-16 ${
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

export default FeatureGrid;
