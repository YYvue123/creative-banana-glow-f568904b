import { useState } from 'react';
import { Lang } from '@/lib/locales';
import LanguageSelector from '@/components/LanguageSelector';
import HeroSection from '@/components/HeroSection';
import { ExperienceProvider, ConfigPanel, ScenarioShowcase } from '@/components/MainExperience';
import FeatureGrid from '@/components/FeatureGrid';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';


const Index = () => {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
        <button
          onClick={() => window.location.reload()}
          className="font-display text-lg font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          Nano Banana 2
        </button>
        <LanguageSelector lang={lang} onChange={setLang} />
      </header>

      <ExperienceProvider lang={lang}>
        <div className="container mx-auto px-4 pt-20 md:pt-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left: Sticky Config Panel — aligned with H1 */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-20">
              <ConfigPanel />
            </div>

            {/* Right: Hero title + Scenario showcase */}
            <div className="w-full lg:w-[65%] flex flex-col" style={{ gap: 'clamp(1rem, 2vh, 2rem)' }}>
              <HeroSection lang={lang} />
              <ScenarioShowcase />
            </div>
          </div>
        </div>
      </ExperienceProvider>

      <FeatureGrid lang={lang} />
      <HowItWorks lang={lang} />
      <Testimonials lang={lang} />
      <FAQSection lang={lang} />
      
    </div>
  );
};

export default Index;
