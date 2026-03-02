import { useState } from 'react';
import { Lang } from '@/lib/locales';
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
      <ExperienceProvider lang={lang}>
        <div className="container mx-auto px-4 pt-8 md:pt-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full lg:w-[35%] lg:sticky lg:top-8">
              <ConfigPanel />
            </div>
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
