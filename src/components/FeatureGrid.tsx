import { useState } from 'react';
import { Lang, featureCards, featureLocales } from '@/lib/locales';
import { locales } from '@/lib/locales';
import { motion } from 'framer-motion';
import { Plug, Layers, Download, Paintbrush, Shield, Zap, Globe, Settings } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Plug, Layers, Download, Paintbrush, Shield, Zap, Globe, Settings,
};

const FeatureGrid = ({ lang }: { lang: Lang }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Title row */}
      <div className="mb-10 flex items-center gap-4">
        <h2 className="shrink-0 font-display text-2xl font-bold text-foreground">
          {locales.topics[lang]}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card, idx) => {
          const Icon = iconMap[card.icon];
          const isActive = idx === activeIdx;
          return (
            <motion.div
              key={card.nameKey}
              onMouseEnter={() => setActiveIdx(idx)}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`cursor-pointer rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 ${
                isActive
                  ? 'border-primary brand-glow'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <Icon className="h-5 w-5 text-primary-deep" />
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  card.status === 'New'
                    ? 'bg-primary/20 text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {card.status}
                </span>
              </div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">
                {featureLocales[card.nameKey][lang]}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {featureLocales[card.descKey][lang]}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureGrid;
