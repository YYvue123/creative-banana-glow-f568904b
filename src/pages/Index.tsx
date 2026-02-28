import { useState } from 'react';
import { Lang } from '@/lib/locales';
import LanguageSelector from '@/components/LanguageSelector';
import HeroSection from '@/components/HeroSection';
import MainExperience from '@/components/MainExperience';
import FeatureGrid from '@/components/FeatureGrid';
import FAQSection from '@/components/FAQSection';
import FooterSupport from '@/components/FooterSupport';

const Index = () => {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
        <span className="font-display text-lg font-bold text-foreground">
          Nano Banana 2
        </span>
        <LanguageSelector lang={lang} onChange={setLang} />
      </header>

      <HeroSection lang={lang} />
      <MainExperience lang={lang} />
      <FeatureGrid lang={lang} />
      <FAQSection lang={lang} />
      <FooterSupport lang={lang} />
    </div>
  );
};

export default Index;
