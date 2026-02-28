import { useState } from 'react';
import { Lang, locales, casePrompts } from '@/lib/locales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

import case1 from '@/assets/case-1.jpg';
import case2 from '@/assets/case-2.jpg';
import case3 from '@/assets/case-3.jpg';
import case4 from '@/assets/case-4.jpg';
import case5 from '@/assets/case-5.jpg';

const caseImages = [case1, case2, case3, case4, case5];
const caseAlts = [
  'AI portrait with sunset light',
  'Japanese zen garden watercolor',
  'Cyberpunk cityscape neon night',
  'Kawaii cartoon cat chef cooking',
  'Mountain landscape lake reflection',
];

const resolutions = ['512×512', '768×768', '1024×1024', '1024×1536', '1536×1024'];

const MainExperience = ({ lang }: { lang: Lang }) => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [refImage, setRefImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState(resolutions[2]);

  const handleCaseClick = (idx: number) => {
    setSelectedCase(idx);
    setRefImage(caseImages[idx]);
    setPrompt(casePrompts[lang][idx]);
  };

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Config Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm lg:w-[35%]"
        >
          {/* Resolution */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{locales.resolution[lang]}</label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="w-full border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolutions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference Image */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{locales.referenceImage[lang]}</label>
            <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary">
              {refImage ? (
                <img src={refImage} alt="Reference image preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">{locales.uploadOrSelect[lang]}</span>
                </div>
              )}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{locales.prompt[lang]}</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none border-border bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Describe the image you want to create..."
            />
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkles className="mr-2 h-4 w-4" />
            {locales.generate[lang]}
          </Button>
        </motion.div>

        {/* Right: Case Gallery */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[65%]"
        >
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">{locales.caseGallery[lang]}</h3>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4" style={{ scrollBehavior: 'smooth' }}>
            {caseImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleCaseClick(idx)}
                className={`flex-none snap-center overflow-hidden rounded-xl transition-all duration-200 ${
                  selectedCase === idx
                    ? 'ring-2 ring-primary shadow-md'
                    : 'ring-1 ring-border hover:ring-primary/50'
                }`}
                style={{ width: '260px' }}
              >
                <img
                  src={img}
                  alt={`Nano Banana 2 AI generated example: ${caseAlts[idx]}`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MainExperience;
