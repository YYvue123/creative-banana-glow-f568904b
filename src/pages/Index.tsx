import { useState } from 'react';
import { Lang } from '@/lib/locales';
import HeroSection from '@/components/HeroSection';
import { ExperienceProvider, ConfigPanel, ScenarioShowcase } from '@/components/MainExperience';
import FeatureGrid from '@/components/FeatureGrid';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';


const Index = () => {
  const [lang, setLang] = useState<Lang>('zh');

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background">
      <ExperienceProvider lang={lang}>
        {/* Fixed left panel - full viewport height */}
        <div className="hidden lg:block fixed left-0 top-0 h-[100dvh] z-10" style={{ width: '35%', maxWidth: '480px' }}>
          <div className="h-full px-4 py-6">
            <ConfigPanel />
          </div>
        </div>

        {/* Right scrollable content */}
        <div className="lg:ml-[35%] lg:max-w-[calc(100%-480px)]" style={{ marginLeft: 'min(35%, 480px)' }}>
          <div className="container mx-auto px-4 pt-6 sm:pt-8 md:pt-12">
            {/* Mobile: show ConfigPanel inline */}
            <div className="lg:hidden mb-6">
              <ConfigPanel />
            </div>
            <div className="flex flex-col" style={{ gap: 'clamp(1rem, 2vh, 2rem)' }}>
              <HeroSection lang={lang} />
              <ScenarioShowcase />
            </div>
          </div>

          <FeatureGrid lang={lang} />
          <HowItWorks lang={lang} />
          <Testimonials lang={lang} />
          <FAQSection lang={lang} />
        </div>
      </ExperienceProvider>
    </div>
  );
};

export default Index;
